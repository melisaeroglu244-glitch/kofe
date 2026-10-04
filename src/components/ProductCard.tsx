import React, { useState } from 'react';
import { Plus, Coffee } from 'lucide-react';
import { CoffeeProduct } from '../types/coffee';

interface ProductCardProps {
  product: CoffeeProduct;
  onSelect: (product: CoffeeProduct) => void;
  onQuickAdd: (product: CoffeeProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-[#1C1916] border border-[#2A241F] rounded-xl overflow-hidden hover:border-[#4A4036] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left"
    >
      {/* Product Image Lead (65-75% visual weight) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141210]">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#201C18] text-[#9C8F80]">
            <Coffee className="w-10 h-10 mb-2 text-[#C28448]" />
            <span className="text-xs uppercase tracking-wider font-mono">Kavruk Roastery</span>
          </div>
        )}

        {/* Subtle SCA Score kicker if applicable */}
        {product.scaScore && (
          <div className="absolute top-3 left-3 bg-[#141210]/90 backdrop-blur-sm border border-[#38322C] px-2.5 py-1 rounded text-[11px] font-mono font-semibold text-[#C28448]">
            SCA {product.scaScore}
          </div>
        )}

        {/* Quick Add overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          aria-label={`${product.name} sepete ekle`}
          className="absolute bottom-3 right-3 p-2.5 rounded-lg bg-[#C28448] text-[#141210] hover:bg-[#E3A86E] transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed metadata with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-[#9C8F80] mb-2 uppercase tracking-wider">
            {product.origin ? (
              <>
                <span className="truncate">{product.origin}</span>
                {product.process && (
                  <>
                    <span aria-hidden="true" className="text-[#4A4036]">·</span>
                    <span className="truncate">{product.process}</span>
                  </>
                )}
              </>
            ) : (
              <span>Artisan Kafe Menüsü</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-serif-display text-lg font-semibold text-[#EDE8E1] group-hover:text-[#C28448] transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#9C8F80] line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Tasting notes as quiet unboxed text */}
          <div className="flex items-center gap-1 text-[11px] text-[#C4B9AA] truncate mb-4">
            <span className="text-[#C28448]">Notalar:</span>
            <span>{product.tastingNotes.slice(0, 3).join(' · ')}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#2A241F] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9C8F80] mr-1">Fiyat</span>
            <span className="font-mono text-base font-bold text-[#EDE8E1] tabular-nums">
              {product.price} ₺
            </span>
          </div>

          <span className="text-xs font-medium text-[#C28448] group-hover:underline underline-offset-4">
            {product.category === 'beans' ? 'Öğütüm Seç' : 'İncele'}
          </span>
        </div>
      </div>
    </div>
  );
};
