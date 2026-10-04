import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#100E0C] border-t border-[#2A241F] text-[#9C8F80] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand & Bio (4 cols) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <span className="font-serif-display text-2xl font-bold tracking-tight text-[#EDE8E1] block">
              KAVRUK ROASTERS
            </span>
            <p className="text-xs text-[#9C8F80] leading-relaxed max-w-sm">
              İstanbul merkezli nitelikli kahve kavurucusu. Doğrudan mikro üreticilerden temin edilen tek kökenli yeşil çekirdekler, hassas kavrum profilleri ve zanaatkar demleme kültürü.
            </p>
            <div className="flex items-center gap-4 text-[#EDE8E1] pt-2">
              <span className="text-[11px] text-[#695D51]">Bizi Takip Edin:</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C28448] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C28448] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="md:col-span-2 space-y-3 text-left">
            <span className="text-xs uppercase tracking-wider text-[#EDE8E1] font-semibold block">
              Menü & Sipariş
            </span>
            <ul className="space-y-2 text-xs">
              <li><a href="#menu" className="hover:text-[#EDE8E1] transition-colors">Tüm İçecekler</a></li>
              <li><a href="#beans" className="hover:text-[#EDE8E1] transition-colors">Taze Çekirdekler</a></li>
              <li><a href="#brew-lab" className="hover:text-[#EDE8E1] transition-colors">Demleme Oranları</a></li>
              <li><a href="#branches" className="hover:text-[#EDE8E1] transition-colors">Şubelerimiz</a></li>
            </ul>
          </div>

          {/* Roasting Schedule (2 cols) */}
          <div className="md:col-span-2 space-y-3 text-left">
            <span className="text-xs uppercase tracking-wider text-[#EDE8E1] font-semibold block">
              Kavrum Takvimi
            </span>
            <div className="space-y-2 text-xs text-[#9C8F80]">
              <div>
                <span className="text-[#EDE8E1] font-medium block">Salı & Perşembe</span>
                <span>Filtre & Omni Kavrum</span>
              </div>
              <div className="pt-1">
                <span className="text-[#EDE8E1] font-medium block">Cumartesi</span>
                <span>Espresso & Türk Kahvesi</span>
              </div>
            </div>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-left">
            <span className="text-xs uppercase tracking-wider text-[#EDE8E1] font-semibold block">
              Haftalık Taze Kavrum Bülteni
            </span>
            <p className="text-xs text-[#9C8F80]">
              Yeni gelen mikro-lot hasatlar, sınırlı sayıdaki çekirdekler ve barista atölyelerinden ilk siz haberdar olun.
            </p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#1C1916] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
                >
                  Kayıt Ol
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400 p-2.5 bg-emerald-950/30 border border-emerald-800/30 rounded-lg">
                <Check className="w-4 h-4" />
                <span>Bültenimize hoş geldiniz! İlk siparişinizde %10 indirim kodunuz iletildi.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Clean Unboxed Meta */}
        <div className="pt-8 border-t border-[#2A241F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#695D51]">
          <div>
            © {new Date().getFullYear()} Kavruk Coffee Roasters Ltd. Şti. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-3">
            <span>SCA Türkiye Üyesi</span>
            <span aria-hidden="true">·</span>
            <span>%100 Organik İzlenebilirlik</span>
            <span aria-hidden="true">·</span>
            <span>İstanbul, Türkiye</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
