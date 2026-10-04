import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Scale } from 'lucide-react';
import { CoffeeProduct, GrindType } from '../types/coffee';

interface ProductModalProps {
  product: CoffeeProduct | null;
  onClose: () => void;
  onAddToCart: (product: CoffeeProduct, grind?: GrindType, weight?: number, quantity?: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedGrind, setSelectedGrind] = useState<GrindType>('whole_bean');
  const [selectedWeight, setSelectedWeight] = useState<number>(250);
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const isBean = product.category === 'beans';

  // Calculate price based on weight
  const getCalculatedPrice = () => {
    if (!isBean || selectedWeight === 250) return product.price;
    if (selectedWeight === 500) return Math.round(product.price * 1.9);
    if (selectedWeight === 1000) return Math.round(product.price * 3.6);
    return product.price;
  };

  const handleAdd = () => {
    onAddToCart(product, isBean ? selectedGrind : undefined, isBean ? selectedWeight : undefined, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#1C1916] border border-[#38322C] rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#141210]/80 text-[#9C8F80] hover:text-[#EDE8E1] hover:bg-[#25211D] transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Specifications */}
          <div className="relative aspect-[4/3] md:aspect-auto h-64 md:h-full bg-[#141210]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.scaScore && (
              <div className="absolute top-4 left-4 bg-[#141210]/90 backdrop-blur-sm border border-[#38322C] px-3 py-1 rounded text-xs font-mono font-semibold text-[#C28448]">
                SCA {product.scaScore} Nitelikli Skor
              </div>
            )}
          </div>

          {/* Details & Customization (Contiguous Purchase Module PDP) */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Origin / Category metadata */}
              <div className="text-xs uppercase tracking-wider text-[#C28448] font-semibold mb-2">
                {product.origin || 'Kavruk Artisan Bar'}
              </div>

              <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-[#EDE8E1] mb-3">
                {product.name}
              </h2>

              <p className="text-xs md:text-sm text-[#9C8F80] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Technical breakdown if coffee bean */}
              {isBean && (
                <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-[#2A241F] mb-4">
                  {product.process && (
                    <div>
                      <span className="text-[#9C8F80]">İşlem: </span>
                      <span className="text-[#EDE8E1] font-medium">{product.process}</span>
                    </div>
                  )}
                  {product.altitude && (
                    <div>
                      <span className="text-[#9C8F80]">Rakım: </span>
                      <span className="text-[#EDE8E1] font-medium">{product.altitude}</span>
                    </div>
                  )}
                  {product.roastLevel && (
                    <div>
                      <span className="text-[#9C8F80]">Kavrum: </span>
                      <span className="text-[#EDE8E1] font-medium">{product.roastLevel}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#9C8F80]">Tür: </span>
                    <span className="text-[#EDE8E1] font-medium">%100 Arabica</span>
                  </div>
                </div>
              )}

              {/* Tasting Notes */}
              <div className="mb-4">
                <span className="text-xs font-medium text-[#9C8F80] block mb-1.5">Tadım Notları</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded bg-[#25211D] border border-[#38322C] text-[#C4B9AA]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grind Selector for Beans */}
              {isBean && (
                <div className="space-y-2 mb-4">
                  <span className="text-xs font-medium text-[#EDE8E1] block">
                    Öğütüm Derecesi Seçimi:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'whole_bean', label: 'Çekirdek (Öğütülmemiş)' },
                      { id: 'v60', label: 'V60 / Filtre Kahve' },
                      { id: 'espresso', label: 'Espresso / Moka Pot' },
                      { id: 'turkish', label: 'Türk Kahvesi (Pudra)' },
                      { id: 'french_press', label: 'French Press & Cold Drip' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGrind(g.id as GrindType)}
                        className={`text-left text-xs p-2 rounded-lg border transition-all cursor-pointer ${
                          selectedGrind === g.id
                            ? 'border-[#C28448] bg-[#C28448]/15 text-[#EDE8E1]'
                            : 'border-[#2A241F] bg-[#141210] text-[#9C8F80] hover:border-[#4A4036]'
                        }`}
                      >
                        <span className="block truncate font-medium">{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Weight Selector for Beans */}
              {isBean && product.weights && (
                <div className="space-y-2 mb-4">
                  <span className="text-xs font-medium text-[#EDE8E1] block">
                    Paket Gramajı:
                  </span>
                  <div className="flex gap-2">
                    {product.weights.map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setSelectedWeight(w)}
                        className={`flex-1 py-1.5 px-3 text-xs rounded-lg border transition-all cursor-pointer font-mono ${
                          selectedWeight === w
                            ? 'border-[#C28448] bg-[#C28448]/15 text-[#EDE8E1]'
                            : 'border-[#2A241F] bg-[#141210] text-[#9C8F80] hover:border-[#4A4036]'
                        }`}
                      >
                        {w >= 1000 ? `${w / 1000} KG` : `${w} G`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-4 border-t border-[#2A241F] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#9C8F80] block">Toplam Tutar</span>
                  <span className="font-mono text-2xl font-bold text-[#EDE8E1] tabular-nums">
                    {getCalculatedPrice() * quantity} ₺
                  </span>
                </div>

                {/* Quantity stepper */}
                <div className="flex items-center border border-[#38322C] rounded-lg bg-[#141210] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm text-[#9C8F80] hover:text-[#EDE8E1] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-mono text-sm text-[#EDE8E1] font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm text-[#9C8F80] hover:text-[#EDE8E1] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sepete Ekle ({getCalculatedPrice() * quantity} ₺)</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
