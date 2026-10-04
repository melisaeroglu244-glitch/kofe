import React from 'react';
import { MapPin, Clock, Phone, Check, ExternalLink, Calendar } from 'lucide-react';
import { BRANCHES } from '../data/coffeeData';

interface BranchesSectionProps {
  onOpenReservation: () => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="branches" className="py-24 bg-[#181512] border-b border-[#2A241F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C28448] font-semibold mb-3">
            <span>Kavruk Mekanları</span>
            <span aria-hidden="true" className="text-[#695D51]">·</span>
            <span>İstanbul</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#EDE8E1] tracking-tight mb-4">
            Kahve Tutkusunu Mekanlarımızda Deneyimleyin
          </h2>
          <p className="text-sm text-[#9C8F80]">
            Şehrin ilham verici semtlerinde; taze kavrum kokuları, huzurlu çalışma alanları ve usta ellerden çıkan demlemeler.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className="bg-[#1C1916] border border-[#2A241F] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#4A4036] transition-colors text-left"
            >
              <div>
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-[#C28448] font-semibold">
                    {b.district}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Açık</span>
                  </div>
                </div>

                <h3 className="font-serif-display text-2xl font-bold text-[#EDE8E1] mb-4">
                  {b.name}
                </h3>

                {/* Info List */}
                <div className="space-y-3 text-xs text-[#9C8F80] mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C28448] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{b.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#C28448] shrink-0" />
                    <span className="font-mono text-[#EDE8E1]">{b.phone}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#C28448] shrink-0 mt-0.5" />
                    <div>
                      <div>Hafta İçi: <span className="text-[#EDE8E1] font-mono">{b.weekdayHours}</span></div>
                      <div>Hafta Sonu: <span className="text-[#EDE8E1] font-mono">{b.weekendHours}</span></div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-4 border-t border-[#2A241F] mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-[#695D51] font-semibold block">
                    Mekan Özellikleri:
                  </span>
                  <div className="space-y-1.5">
                    {b.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#C4B9AA]">
                        <Check className="w-3.5 h-3.5 text-[#C28448] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#2A241F] space-y-2">
                <button
                  onClick={onOpenReservation}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Bu Şubede Masa Ayırt</span>
                </button>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-semibold text-[#9C8F80] hover:text-[#EDE8E1] transition-colors"
                >
                  <span>Haritada Göster</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
