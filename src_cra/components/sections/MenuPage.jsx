import React, { useState, useEffect } from 'react';

const renderPrices = (price) => {
  if (typeof price === 'object') {
    return Object.entries(price)
      .map(([size, val]) => `${size.charAt(0).toUpperCase() + size.slice(1)}: ₦${val.toLocaleString()}`)
      .join(' | ');
  }
  return `₦${price.toLocaleString()}`;
};

const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} className="bg-yellow-200 px-1 rounded">{part}</mark> : part
  );
};

const renderSection = (section, query) => ( // Updated to accept query if needed for logic below, but mapped differently
  <div key={section.section || section.name} className="mb-10">
    <h3 className="text-2xl font-bold text-primary-500 mb-4">{section.section || section.name}</h3>
    <div className="space-y-4">
      {(section.items || [section]).map((item, idx) => (
        <div key={item.name + idx} className="bg-white/80 rounded-xl p-4 shadow border border-neutral-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <span className="font-semibold text-lg text-neutral-900">{highlightMatch(item.name, query)}</span>
            {item.description && (
              <p className="text-sm text-neutral-600 mt-1">{highlightMatch(item.description, query)}</p>
            )}
          </div>
          <div className="text-right md:text-left">
            {item.prices
              ? renderPrices(item.prices)
              : item.price
                ? renderPrices(item.price)
                : item.bottle
                  ? `Shot: ₦${item.price.toLocaleString()} | Bottle: ₦${item.bottle.toLocaleString()}`
                  : ''}
            {item.extra && <span className="block text-xs text-neutral-500">{item.extra}</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MenuPage = () => {
  const [search, setSearch] = useState('');
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

  const query = search.trim().toLowerCase();

  useEffect(() => {
    fetch('/data/menu.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load menu page", err);
        setLoading(false);
      });
  }, []);

  // Helper to filter items by search
  const filterSection = (section) => {
    const items = (section.items || [section]).filter(item => {
      const name = item.name?.toLowerCase() || '';
      const desc = item.description?.toLowerCase() || '';
      return name.includes(query) || desc.includes(query);
    });
    // Check if section itself matches (unlikely for simple structure but good safety) or keeps valid items
    if (items.length > 0) return { ...section, items };
    return null;
  };

  // Helper to process arrays of sections
  const processMenuArray = (menuArray) => {
    if (!menuArray) return [];
    return menuArray.map(filterSection).filter(Boolean);
  };

  if (loading) return <div className="text-center py-20">Loading menu...</div>;
  if (!menuData) return <div className="text-center py-20 text-red-500">Failed to load menu.</div>;

  // Reconstruct filteredMenus using fetched data
  const filteredMenus = [
    { title: 'Beer & Spirits', data: processMenuArray(menuData.beerAndSpirits) },
    { title: 'Bar & Cocktails', data: processMenuArray(menuData.coldBeveragesAndCocktails) },
    { title: 'Wine (California, Australia & Champagne)', data: processMenuArray(menuData.wineCaliforniaAustraliaChampagne) },
    { title: 'International Wine', data: processMenuArray(menuData.internationalWine) },
    // Pizza was an array of ITEMS not sections in original file? 
    // Wait, original file: export const pizzaMenu = [ {id, name...}, {id, name...} ]
    // Unlike others which were [ { section: '...', items: [...] } ]
    // The original code treated pizza differently:
    // data: pizzaMenu.filter(...)
    // My JSON has pizza as array of items. 
    // I need to wrap it in a mock section or handle it.
    // Original code: renderSection logic handles (section.items || [section]).
    // So if I pass an object with NO items array, it treats it as a single item section? No.
    // Let's check original renderSection.
    // "{(section.items || [section]).map"
    // So if I pass a Pizza Item as 'section', it treats it as a section with 1 item (itself).
    // So `processMenuArray` works if it iterates the pizza array (which are items).
    // `filterSection` checks `section.items` (undefined for pizza item) -> moves to `[section]`.
    // It filters that single item array. If match, returns `{...item, items: [item]}`.
    // So `data` becomes array of "Section-like" objects where each has 1 item.
    // renderSection will render 1 section per pizza?
    // Original code: `data: pizzaMenu.filter(...)` -> array of items.
    // The `filteredMenus.map` calls `renderSection(data)`.
    // Wait, original: `Array.isArray(data) ? data.map(renderSection) : renderSection(data)`
    // If pizza is array of items, it maps `renderSection` on each item.
    // `renderSection(item)` -> `item.items` is undefined -> `[item]`. Maps 1 item.
    // Renders: `<div ... className="mb-10"><h3...>{item.name}</h3><div><item row></div></div>`
    // So each pizza gets a header? That seems wrong for the original design but that's what the code did if `pizzaMenu` was flat.
    // Actually `pizzaMenu` items had `name`. `renderSection` uses `section.section || section.name`.
    // So yes, each pizza was its own block? Or maybe I misread `pizzaMenu` structure.
    // Let's look at `pizzaMenu` export in `menuData.js` again.
    // It was `export const pizzaMenu = [ {id, name: 'MARGARITTA', ...}, ... ]`
    // So yes, it was a flat array of items.
    // So the original code rendered a header for EACH pizza? That's weird styling but I should preserve behavior or fix it.
    // Actually, "Pizza" is the Title of the block in `filteredMenus` loop: `h2 {title}`.
    // Then `data.map(renderSection)`.
    // If `renderSection` creates a `mb-10` div with `h3`, then yes, each pizza got an h3.
    // Ref: lines 32-33 of original file.
    // That seems disjointed. But I will replicate it to be safe, OR I can group them?
    // The user didn't ask for redesign, just splitting data.
    // I will stick to `processMenuArray` which mimics the behavior.
    { title: 'Pizza', data: processMenuArray(menuData.pizza) },

    { title: 'Nigerian Menu', data: processMenuArray(menuData.nigerian) },
    { title: 'Grill House', data: processMenuArray(menuData.grillHouse) },
    { title: 'Indo-Chinese & Indian Curries', data: processMenuArray(menuData.indoChineseIndianCurries) },
    { title: 'Chinese Menu', data: processMenuArray(menuData.chinese) },
  ].filter(group => group.data && group.data.length > 0); // Hide empty categories

  const menuCategories = [
    { label: 'Indian', image: '/images/menu/indian-menu-1.jpg' },
    { label: 'Nigerian', image: '/images/menu/nigerian-menu-1.jpg' },
    { label: 'Chinese', image: '/images/menu/chinese-menu-1.jpg' },
    { label: 'Grill House', image: '/images/menu/grill-house-menu-1.jpg' },
    { label: 'Pizza', image: '/images/menu/pizza-menu.jpg' },
    { label: 'Bar', image: '/images/menu/bar-menu-1.jpg' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-display font-bold text-center text-primary-500 mb-4">Our Menu</h1>
      <p className="text-center text-lg text-neutral-600 mb-10">Explore our diverse menu categories. Tap a menu to zoom in or scroll down to search and browse all dishes.</p>
      {/* Menu Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {menuCategories.map((cat, idx) => (
          <div key={cat.label} className="group relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-white/80 hover:shadow-2xl transition-all duration-300">
            <img
              src={cat.image}
              alt={`${cat.label} Menu`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              loading="lazy"
              onClick={() => window.open(cat.image, '_blank')}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span className="text-white text-lg font-bold drop-shadow">{cat.label}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Searchable Menu List (existing) */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search menu..."
          className="w-full max-w-md px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-lg"
        />
      </div>
      {filteredMenus.map(({ title, data }) => (
        <div key={title}>
          <h2 className="text-3xl font-bold text-accent-400 mb-6">{title}</h2>
          {Array.isArray(data)
            ? data.map(renderSection)
            : renderSection(data)}
        </div>
      ))}
      <div className="mt-12 text-center text-xs text-neutral-500">
        <p>Above prices exclusive of 7.5% VAT. Take away charge - ₦100</p>
      </div>
    </div>
  );
};

export default MenuPage; 