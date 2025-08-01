import React, { useState } from 'react';
import {
  beerAndSpiritsMenu,
  coldBeveragesAndCocktailsMenu,
  wineMenuCaliforniaAustraliaChampagne,
  internationalWineMenu,
  pizzaMenu,
  nigerianMenu,
  grillHouseMenu,
  indoChineseIndianCurriesMenu,
  chineseMenu,
} from '../../data/menuData';

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

const renderSection = (section) => (
  <div key={section.section || section.name} className="mb-10">
    <h3 className="text-2xl font-bold text-primary-500 mb-4">{section.section || section.name}</h3>
    <div className="space-y-4">
      {(section.items || [section]).map((item, idx) => (
        <div key={item.name + idx} className="bg-white/80 rounded-xl p-4 shadow border border-neutral-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <span className="font-semibold text-lg text-neutral-900">{item.name}</span>
            {item.description && (
              <p className="text-sm text-neutral-600 mt-1">{item.description}</p>
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
  const query = search.trim().toLowerCase();

  // Helper to filter items by search
  const filterSection = (section) => {
    const items = (section.items || [section]).filter(item => {
      const name = item.name?.toLowerCase() || '';
      const desc = item.description?.toLowerCase() || '';
      return name.includes(query) || desc.includes(query);
    });
    return { ...section, items };
  };

  // Helper to render a section with highlighting
  const renderSection = (section) => {
    if (!section.items?.length) return null;
    return (
      <div key={section.section || section.name} className="mb-10">
        <h3 className="text-2xl font-bold text-primary-500 mb-4">{section.section || section.name}</h3>
        <div className="space-y-4">
          {section.items.map((item, idx) => (
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
  };

  // Filter all menu data
  const filteredMenus = [
    { title: 'Beer & Spirits', data: beerAndSpiritsMenu.map(filterSection) },
    { title: 'Bar & Cocktails', data: coldBeveragesAndCocktailsMenu.map(filterSection) },
    { title: 'Wine (California, Australia & Champagne)', data: wineMenuCaliforniaAustraliaChampagne.map(filterSection) },
    { title: 'International Wine', data: internationalWineMenu.map(filterSection) },
    { title: 'Pizza', data: pizzaMenu.filter(item => item.name.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query)) },
    { title: 'Nigerian Menu', data: nigerianMenu.map(filterSection) },
    { title: 'Grill House', data: grillHouseMenu.map(filterSection) },
    { title: 'Indo-Chinese & Indian Curries', data: indoChineseIndianCurriesMenu.map(filterSection) },
    { title: 'Chinese Menu', data: chineseMenu.map(filterSection) },
  ];

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