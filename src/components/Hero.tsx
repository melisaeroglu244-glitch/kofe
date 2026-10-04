import React from 'react';
import { ArrowRight, Sparkles, Award, Flame, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenProfiler: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProfiler, onOpenReservation }) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#2A241F]">
      {/* Background Photography with High Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_artisan_coffee_1791115438916.jpg"
          alt="Kavruk Roastery Artisan Coffee Bar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 duration-1000 ease-out"
        />
        {/* Measured Scrim for Media Overlays (Section 1.F) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-[#141210]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#141210]/40 to-[#141210]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Subtle unboxed metadata kicker (No pill enclosures) */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C28448] font-semibold mb-6">
          <span>Mikro-Lot Seçkiler</span>
          <span aria-hidden="true" className="text-[#695D51]">·</span>
          <span>İstanbul Roastery</span>
          <span aria-hidden="true" className="text-[#695D51]">·</span>
          <span>Haftalık Taze Kavrum</span>
        </div>

        {/* Display Headline with balanced wrapping */}
        <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#EDE8E1] max-w-4xl text-balance leading-[1.08] mb-6">
          Her Yudumda Toprağın ve Ustalığın İmzası
        </h1>

        {/* Lead Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-[#C4B9AA] leading-relaxed mb-10 text-balance font-normal">
          Etiyopya&apos;nın 2.000 metre rakımlı sisli vadilerinden Kolombiya&apos;nın dik yamaçlarına.
          Özenle seçilmiş tek kökenli çekirdekleri çevre dostu Loring kavurucumuzda profillendiriyor,
          en saf aromalarıyla fincanınıza taşıyoruz.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <a
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-all shadow-lg shadow-[#C28448]/20 cursor-pointer whitespace-nowrap"
          >
            <span>Menüyü & Çekirdekleri Gör</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenProfiler}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#EDE8E1] bg-[#1C1916]/80 hover:bg-[#25211D] border border-[#3D352D] hover:border-[#C28448] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#C28448]" />
            <span>Damak Tadı Rehberi</span>
          </button>
        </div>

        {/* Claim-to-Proof Adjacency Row (Section 1.H) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#2A241F]/80 max-w-3xl w-full">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-[#C28448] mb-1">
              <Award className="w-4 h-4" />
              <span className="font-mono text-sm font-bold text-[#EDE8E1]">SCA 86+ Puan</span>
            </div>
            <p className="text-xs text-[#9C8F80]">Dünya Nitelikli Kahve Birliği sertifikalı mikro-lot çekirdekler</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-[#C28448] mb-1">
              <Flame className="w-4 h-4" />
              <span className="font-mono text-sm font-bold text-[#EDE8E1]">Haftalık Kavrum</span>
            </div>
            <p className="text-xs text-[#9C8F80]">Paket üzerinde net kavrum tarihi, maksimum tazelik ve degassing</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-[#C28448] mb-1">
              <MapPin className="w-4 h-4" />
              <span className="font-mono text-sm font-bold text-[#EDE8E1]">3 İstanbul Şubesi</span>
            </div>
            <p className="text-xs text-[#9C8F80]">Moda, Galata ve Nişantaşı&apos;nda artisan kafe deneyimi</p>
          </div>
        </div>

      </div>
    </section>
  );
};
