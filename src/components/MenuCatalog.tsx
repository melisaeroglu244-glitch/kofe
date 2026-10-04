import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CoffeeCategory, CoffeeProduct } from '../types/coffee';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { ProductCard } from './ProductCard';

interface MenuCatalogProps {
  onSelectProduct: (product: CoffeeProduct) => void;
  onQuickAdd: (product: CoffeeProduct) => void;
  onOpenProfiler: () => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  onSelectProduct,
  onQuickAdd,
  onOpenProfiler,
}) => {
  const [activeCategory, setActiveCategory] = useState<CoffeeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CoffeeCategory; label: string }[] = [
    { id: 'all', label: 'Tüm Menü' },
    { id: 'beans', label: 'Taze Çekirdekler' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'filter', label: 'Manuel & Filtre' },
    { id: 'cold', label: 'Soğuk & Cold Brew' },
    { id: 'bakery', label: 'Fırından Lezzetler' },
  ];

  const filteredProducts = useMemo(() => {
    return COFFEE_PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tastingNotes.some((note) => note.toLowerCase().includes(q)) ||
        (item.origin && item.origin.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#141210] border-b border-[#2A241F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C28448] font-semibold mb-3">
              <span>Artisan Kafe & Roastery</span>
              <span aria-hidden="true" className="text-[#695D51]">·</span>
              <span>Menü Seçkisi</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#EDE8E1] tracking-tight">
              Özenle Hazırlanan Lezzetler
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenProfiler}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#C28448] bg-[#1C1916] border border-[#38322C] hover:border-[#C28448] rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Damak Tadı Testi</span>
            </button>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-10 pb-6 border-b border-[#2A241F]">
          
          {/* Category Tabs (Segmented control buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1C1916] border border-[#2A241F] rounded-xl overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#C28448] text-[#141210] shadow-sm'
                    : 'text-[#9C8F80] hover:text-[#EDE8E1]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#695D51]" />
            <input
              type="text"
              placeholder="Kahve, aroma veya tat ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#1C1916] border border-[#2A241F] text-[#EDE8E1] placeholder-[#695D51] focus:outline-none focus:border-[#C28448]"
            />
          </div>

        </div>

        {/* Count Metadata (Clean unboxed text) */}
        <div className="flex items-center justify-between text-xs text-[#9C8F80] mb-8">
          <div>
            <span>Listelenen Ürün: </span>
            <strong className="font-mono text-[#EDE8E1] tabular-nums">{filteredProducts.length}</strong>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#C28448] hover:underline cursor-pointer"
            >
              Aramayı Temizle
            </button>
          )}
        </div>

        {/* Product Cards Grid (3 cols desktop, 2 tablet, 1 mobile) */}
        {filteredProducts.length > 0 ? (
          <div id="beans" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#1C1916] border border-[#2A241F] rounded-2xl p-8">
            <p className="text-sm font-medium text-[#EDE8E1] mb-2">Aramanıza uygun ürün bulunamadı</p>
            <p className="text-xs text-[#9C8F80] mb-6">
              Farklı bir arama terimi deneyebilir veya kategorileri sıfırlayabilirsiniz.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
            >
              Tüm Menüyü Göster
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
