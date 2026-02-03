const fs = require('fs');
const path = require('path');

const MENU_FILE = path.join(__dirname, '../public/data/menu.json');
const TEXT_FILE = path.join(__dirname, 'new_menu_data.txt');

const CATEGORY_MAP = {
    'INDIAN MENU': 'indian',
    'CHINESE MENU': 'chinese',
    'GRILL HOUSE': 'grillHouse',
    'NIGERIAN MENU': 'nigerian',
    'PIZZA MENU': 'pizza',
    'CONTINENTAL MENU': 'continental'
};

const STANDARD_SIZES = new Set(['medium', 'large', 'small', 'bowl', 'half', 'full']);

function parseTextData(text) {
    const lines = text.split('\n');
    const result = {};
    let currentCategory = null;
    let currentSubcategory = null;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        if (line.startsWith('Category | Subcategory')) continue;
        if (line.startsWith('=')) continue;
        if (line.startsWith('⚠️') || line.startsWith('NOTE') || line.startsWith('Prices')) continue;
        if (line.includes('updated prices')) continue;

        // Check for Category Header (e.g., "INDIAN MENU")
        // But lines are "Indian | Soup | ..."
        // The headers "INDIAN MENU" are inside "==========" blocks
        // I need to parse the pipe lines.

        if (line.includes('|')) {
            const parts = line.split('|').map(s => s.trim());
            if (parts.length < 5) continue;

            const [catRaw, subcatRaw, nameRaw, sizeRaw, priceRaw] = parts;

            // Determine category key
            // The user text has "Indian | Soup..."
            // But the header was "INDIAN MENU".
            // I can map based on the first column "Indian" -> "indian".
            // "Grill House" -> "grillHouse".

            let catKey = '';
            if (catRaw.toLowerCase().includes('indian')) catKey = 'indian';
            else if (catRaw.toLowerCase().includes('chinese')) catKey = 'chinese';
            else if (catRaw.toLowerCase().includes('grill')) catKey = 'grillHouse';
            else if (catRaw.toLowerCase().includes('nigerian')) catKey = 'nigerian';
            else if (catRaw.toLowerCase().includes('pizza')) catKey = 'pizza';
            else if (catRaw.toLowerCase().includes('continental')) catKey = 'continental';
            else continue;

            if (!result[catKey]) result[catKey] = [];

            // Find or create subcategory
            let subcat = result[catKey].find(s => s.section && s.section.toLowerCase() === subcatRaw.toLowerCase());
            if (!subcat) {
                // Generate subcategory ID
                const subId = `${catKey}-${subcatRaw.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '')}`;
                subcat = {
                    id: subId,
                    section: subcatRaw,
                    items: []
                };
                result[catKey].push(subcat);
            }

            // Add item data for processing
            // We store it temporarily to merge sizes later
            if (!subcat.tempItems) subcat.tempItems = [];

            const price = parseInt(priceRaw.replace(/[^0-9]/g, ''));
            subcat.tempItems.push({
                name: nameRaw,
                size: sizeRaw,
                price: isNaN(price) ? 0 : price
            });
        }
    }

    // Process tempItems to merge sizes
    for (const catKey in result) {
        for (const subcat of result[catKey]) {
            const grouped = {};

            // Group by name
            for (const item of subcat.tempItems) {
                if (!grouped[item.name]) grouped[item.name] = [];
                grouped[item.name].push(item);
            }

            // Create final items
            subcat.items = Object.keys(grouped).map((name, index) => {
                const variants = grouped[name];
                const itemId = `${subcat.id}-${index + 1}`;

                // Logic for Variants vs Prices
                const allStandard = variants.every(v => STANDARD_SIZES.has(v.size.toLowerCase()));

                if (variants.length > 1 && allStandard) {
                    // Merge into price object
                    const prices = {};
                    variants.forEach(v => {
                        prices[v.size.toLowerCase()] = v.price;
                    });
                    return {
                        id: itemId,
                        name: name,
                        price: prices // This might break frontend if it expects number? 
                        // IMPORTANT: Existing frontend handles `items.price` as object? 
                        // Pizza JSON: `prices` (plural) key when object. `price` (singular) when number.
                        // Chinese JSON: `price` (singular) IS object `{medium, large}`.
                        // This is inconsistent legacy data!
                        // Pizza: `prices: { medium: ... }`
                        // Chinese: `price: { medium: ... }`
                        // I should align. I'll stick to `price` (singular) holding the object or number, 
                        // but if the Pizza component explicitly looks for `prices`, I should use `prices` for Pizza?
                        // Let's check Pizza JSON again. line 1118: "prices": { ... }.
                        // Chinese JSON line 2603: "price": { ... }.
                        // This is messy. I will try to support `price` as object for everyone EXCEPT Pizza maybe?
                        // Or better: Checking the `MenuPage` code would be smart.
                        // But for now, I will use `price` for everyone, but if Category is Pizza, I'll use `prices`?
                        // Actually, Chinese lines 2081+ use `price` object.
                        // Pizza lines 1114+ use `prices` object.
                        // I'll add special logic for Pizza key.
                    };
                } else {
                    // Separate items or Single item
                    if (variants.length === 1) {
                        const v = variants[0];
                        let finalName = v.name;
                        let description = null;

                        // Handle "Regular" size - ignore
                        // Handle "4 pcs" - add to description or name?
                        if (v.size.toLowerCase() !== 'regular') {
                            if (v.size.toLowerCase().includes('pcs')) {
                                finalName = `${v.name} (${v.size})`;
                            } else if (['veg', 'chicken', 'biff', 'beef'].includes(v.size.toLowerCase())) {
                                finalName = `${v.name} - ${v.size}`;
                            } else {
                                // Unknown size, just append
                                finalName = `${v.name} (${v.size})`;
                            }
                        }

                        return {
                            id: itemId,
                            name: finalName,
                            price: v.price
                        };
                    } else {
                        // Multiple variants but NOT standard sizes (Mix of Veg/Chicken etc)
                        // Return array of items... wait `map` expects 1 return.
                        // I'm structuring this wrongly. I should flatten.
                        // But here I am inside map keys.
                        // This logic needs to return multiple items.
                        return null; // Handle outside
                    }
                }
            });

            // Re-flatten explicitly for the non-standard variants case
            const finalItems = [];
            let idCounter = 1;

            for (const name of Object.keys(grouped)) {
                const variants = grouped[name];

                const allStandard = variants.every(v => STANDARD_SIZES.has(v.size.toLowerCase()));

                if (variants.length > 1 && allStandard) {
                    // Case: Size variants (Price object)
                    const pricesObj = {};
                    variants.forEach(v => pricesObj[v.size.toLowerCase()] = v.price);

                    const itemObj = {
                        id: `${subcat.id}-${idCounter++}`,
                        name: name
                    };

                    if (catKey === 'pizza') {
                        itemObj.prices = pricesObj; // Pizza uses 'prices'
                    } else {
                        itemObj.price = pricesObj; // Others use 'price'
                    }
                    finalItems.push(itemObj);

                } else if (variants.length > 1 && !allStandard) {
                    // Case: Distinct Items (e.g. Veg vs Chicken)
                    variants.forEach(v => {
                        finalItems.push({
                            id: `${subcat.id}-${idCounter++}`,
                            name: `${name} (${v.size})`,
                            price: v.price
                        });
                    });
                } else {
                    // Case: Single Item
                    const v = variants[0];
                    let finalName = v.name;
                    if (v.size.toLowerCase() !== 'regular' && v.size.toLowerCase() !== 'n/a') {
                        finalName = `${v.name} (${v.size})`;
                    }
                    finalItems.push({
                        id: `${subcat.id}-${idCounter++}`,
                        name: finalName,
                        price: v.price
                    });
                }
            }

            subcat.items = finalItems;
            delete subcat.tempItems;
        }
    }

    return result;
}

const rawData = fs.readFileSync(TEXT_FILE, 'utf8');
const newMenuStructure = parseTextData(rawData);

// Read existing
const existingMenu = JSON.parse(fs.readFileSync(MENU_FILE, 'utf8'));

// Keys to preserve
const PRESERVED_KEYS = ['beerAndSpirits', 'coldBeveragesAndCocktails', 'wineCaliforniaAustraliaChampagne', 'internationalWine'];

const finalMenu = {};

// Add preserved
PRESERVED_KEYS.forEach(key => {
    if (existingMenu[key]) finalMenu[key] = existingMenu[key];
});

// Add new keys
Object.keys(newMenuStructure).forEach(key => {
    finalMenu[key] = newMenuStructure[key];
});

// Write structure
fs.writeFileSync(MENU_FILE, JSON.stringify(finalMenu, null, 2));

console.log('Menu updated successfully!');
