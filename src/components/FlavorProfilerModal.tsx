import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';
import { CoffeeProduct, GrindType } from '../types/coffee';
import { COFFEE_PRODUCTS } from '../data/coffeeData';

interface FlavorProfilerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: CoffeeProduct, grind: GrindType, weight: number) => void;
}

export const FlavorProfilerModal: React.FC<FlavorProfilerModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [method, setMethod] = useState<string>('filter');
  const [flavor, setFlavor] = useState<string>('floral');
  const [body, setBody] = useState<string>('bright');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Matching logic
  const getMatchedProduct = (): CoffeeProduct => {
    if (method === 'turkish') {
      return COFFEE_PRODUCTS.find((p) => p.id === 'kavruk-turkish-coffee') || COFFEE_PRODUCTS[0];
    }
    if (flavor === 'floral' || body === 'bright') {
      return COFFEE_PRODUCTS.find((p) => p.id === 'ethiopia-kochere') || COFFEE_PRODUCTS[0];
    }
    if (flavor === 'fruity') {
      return COFFEE_PRODUCTS.find((p) => p.id === 'colombia-el-mirador') || COFFEE_PRODUCTS[1];
    }
    if (method === 'espresso' || flavor === 'chocolate') {
      return COFFEE_PRODUCTS.find((p) => p.id === 'house-espresso-blend') || COFFEE_PRODUCTS[2];
    }
    return COFFEE_PRODUCTS.find((p) => p.id === 'guatemala-antigua') || COFFEE_PRODUCTS[0];
  };

  const matched = getMatchedProduct();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1C1916] border border-[#38322C] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#9C8F80] hover:text-[#EDE8E1] hover:bg-[#25211D] transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C28448] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Adım {step} / 3 · Damak Zevki Algoritması</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#EDE8E1]">
                Sana En Uygun Kahveyi Keşfedelim
              </h2>
              <p className="text-sm text-[#9C8F80] mt-1">
                Damak profilinize ve demleme rutininize en uygun kavrumu belirliyoruz.
              </p>
            </div>

            {/* Step 1: Brew Method */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-[#EDE8E1]">
                  1. Kahvenizi en çok hangi yöntemle hazırlarsınız?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'filter', title: 'Filtre Kahve & V60', desc: 'Manuel demleme, berrak fincan' },
                    { id: 'espresso', title: 'Espresso & Sütlü', desc: 'Latte, Flat White, Moka Pot' },
                    { id: 'cold', title: 'Soğuk / Cold Brew', desc: 'Buzlu, ferahlatıcı, uzun demleme' },
                    { id: 'turkish', title: 'Geleneksel Türk Kahvesi', desc: 'Cezvede köpüklü, kadifemsi' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setMethod(item.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        method === item.id
                          ? 'border-[#C28448] bg-[#C28448]/10 text-[#EDE8E1]'
                          : 'border-[#2A241F] bg-[#141210] text-[#C4B9AA] hover:border-[#4A4036]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-[#EDE8E1]">{item.title}</span>
                        {method === item.id && <Check className="w-4 h-4 text-[#C28448]" />}
                      </div>
                      <span className="text-xs text-[#9C8F80]">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Flavor Notes */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-[#EDE8E1]">
                  2. Fincanda hangi aromatik nüanslar sizi heyecanlandırır?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'floral', title: 'Çiçeksi & Yasemin & Limon', desc: 'Hafif gövde, taze narenciye ve bergamot' },
                    { id: 'fruity', title: 'Kırmızı Meyveler & Erik', desc: 'Tatlı, şurubumsu ve canlı asidite' },
                    { id: 'chocolate', title: 'Çikolata & Karamel & Fındık', desc: 'Dengeli tatlılık, düşük asidite' },
                    { id: 'spicy', title: 'Koyu Kakao & Baharat & Bal', desc: 'Geleneksel yoğunluk, kremamsı bitiş' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFlavor(item.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        flavor === item.id
                          ? 'border-[#C28448] bg-[#C28448]/10 text-[#EDE8E1]'
                          : 'border-[#2A241F] bg-[#141210] text-[#C4B9AA] hover:border-[#4A4036]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-[#EDE8E1]">{item.title}</span>
                        {flavor === item.id && <Check className="w-4 h-4 text-[#C28448]" />}
                      </div>
                      <span className="text-xs text-[#9C8F80]">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Body & Acidity */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-[#EDE8E1]">
                  3. Asidite ve gövde dengesi tercihiniz:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'bright', title: 'Canlı & Parlak', desc: 'Meyvemsi ekşilik, çok hafif gövde' },
                    { id: 'balanced', title: 'Dengeli & Yumuşak', desc: 'Her damak tadına uygun uyum' },
                    { id: 'heavy', title: 'Yoğun & Dolgun', desc: 'Ağır gövde, uzun süren bitter çikolata tadı' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setBody(item.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        body === item.id
                          ? 'border-[#C28448] bg-[#C28448]/10 text-[#EDE8E1]'
                          : 'border-[#2A241F] bg-[#141210] text-[#C4B9AA] hover:border-[#4A4036]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-[#EDE8E1]">{item.title}</span>
                        {body === item.id && <Check className="w-4 h-4 text-[#C28448]" />}
                      </div>
                      <span className="text-xs text-[#9C8F80]">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#2A241F]">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#9C8F80] hover:text-[#EDE8E1] transition-colors cursor-pointer"
                >
                  Geri
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
              >
                <span>{step === 3 ? 'Eşleşmeyi Göster' : 'Devam Et'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Result View */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C28448] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>%98 Damak Uyumu Eşleşmesi</span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-[#9C8F80] hover:text-[#EDE8E1] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Testi Baştan Al</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center bg-[#141210] border border-[#2A241F] rounded-xl p-5 mb-6">
              <div className="w-full md:w-44 h-44 rounded-lg overflow-hidden shrink-0 bg-[#1C1916]">
                <img
                  src={matched.image}
                  alt={matched.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 flex-1 text-left">
                {matched.scaScore && (
                  <span className="text-xs font-mono font-semibold text-[#C28448]">
                    SCA {matched.scaScore} Puan
                  </span>
                )}
                <h3 className="font-serif-display text-2xl font-bold text-[#EDE8E1]">
                  {matched.name}
                </h3>
                <p className="text-xs text-[#9C8F80] leading-relaxed">
                  {matched.description}
                </p>

                {/* Tasting notes */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matched.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded bg-[#25211D] border border-[#38322C] text-[#C4B9AA]"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-xl font-bold text-[#EDE8E1]">
                    {matched.price} ₺ <span className="text-xs font-normal text-[#9C8F80]">/ 250g</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const defaultGrind: GrindType = method === 'turkish' ? 'turkish' : method === 'espresso' ? 'espresso' : 'v60';
                  onAddToCart(matched, defaultGrind, 250);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Bu Çekirdeği Sepete Ekle</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-6 text-sm font-semibold uppercase tracking-wider text-[#EDE8E1] bg-[#25211D] border border-[#38322C] hover:border-[#C28448] rounded-lg transition-colors cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
