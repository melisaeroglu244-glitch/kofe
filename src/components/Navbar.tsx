import React, { useState } from 'react';
import { ShoppingBag, Coffee, Menu, X, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenProfiler: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenProfiler,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#141210]/90 backdrop-blur-md border-b border-[#2A241F] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element Brand Zone */}
          <a href="#" className="flex items-center gap-2 group focus-visible:outline-none">
            <span className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#EDE8E1] group-hover:text-[#C28448] transition-colors">
              KAVRUK
            </span>
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#9C8F80] border-l border-[#38322C] pl-2">
              Roasters
            </span>
          </a>

          {/* Zone 2: 4-6 Clean navigation links (single line, text with hover underlines) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#C4B9AA]">
            <a href="#menu" className="hover:text-[#EDE8E1] transition-colors hover:underline underline-offset-8 decoration-[#C28448]">
              Menü
            </a>
            <a href="#beans" className="hover:text-[#EDE8E1] transition-colors hover:underline underline-offset-8 decoration-[#C28448]">
              Nitelikli Çekirdekler
            </a>
            <button
              onClick={onOpenProfiler}
              className="flex items-center gap-1.5 hover:text-[#EDE8E1] transition-colors hover:underline underline-offset-8 decoration-[#C28448] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C28448]" />
              <span>Kahveni Bul Testi</span>
            </button>
            <a href="#brew-lab" className="hover:text-[#EDE8E1] transition-colors hover:underline underline-offset-8 decoration-[#C28448]">
              Demleme Rehberi
            </a>
            <a href="#story" className="hover:text-[#EDE8E1] transition-colors hover:underline underline-offset-8 decoration-[#C28448]">
              Kavrum Hikayemiz
            </a>
            <a href="#branches" className="hover:text-[#EDE8E1] transition-colors hover:underline underline-offset-8 decoration-[#C28448]">
              Şubeler
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#EDE8E1] bg-[#25211D] border border-[#3D352D] rounded-lg hover:border-[#C28448] hover:text-[#C28448] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C28448]" />
              <span>Masa Ayırt</span>
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Alışveriş Sepeti"
              className="relative p-2.5 rounded-lg bg-[#25211D] border border-[#3D352D] text-[#EDE8E1] hover:text-[#C28448] hover:border-[#C28448] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C28448] text-white text-[11px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-[#25211D] border border-[#3D352D] text-[#EDE8E1] lg:hidden hover:text-[#C28448] transition-colors cursor-pointer"
              aria-label="Menüyü aç/kapat"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile slide drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#2A241F] py-4 space-y-3 bg-[#181512]">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#EDE8E1] hover:text-[#C28448] rounded-md"
            >
              Menü
            </a>
            <a
              href="#beans"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#EDE8E1] hover:text-[#C28448] rounded-md"
            >
              Nitelikli Çekirdekler
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfiler();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-base font-medium text-[#C28448] hover:text-[#EDE8E1] rounded-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Damak Tadı Testi (Kahveni Bul)</span>
            </button>
            <a
              href="#brew-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#EDE8E1] hover:text-[#C28448] rounded-md"
            >
              Demleme Rehberi & Hesaplayıcı
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#EDE8E1] hover:text-[#C28448] rounded-md"
            >
              Kavrum Hikayemiz
            </a>
            <a
              href="#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#EDE8E1] hover:text-[#C28448] rounded-md"
            >
              Şubeler & Çalışma Saatleri
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] rounded-lg hover:bg-[#E3A86E] transition-colors cursor-pointer"
              >
                Masa Rezervasyonu Yap
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
