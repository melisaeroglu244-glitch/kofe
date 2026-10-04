import React from 'react';
import { Flame, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';

export const RoasteryStory: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-[#141210] border-b border-[#2A241F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C28448] font-semibold mb-3">
            <span>Kavrum Felsefemiz</span>
            <span aria-hidden="true" className="text-[#695D51]">·</span>
            <span>2018&apos;den Beri İstanbul</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#EDE8E1] tracking-tight mb-6 text-balance">
            Tavizsiz Kalite, Saygılı Tarım ve İleri Düzey Kavrum Bilimi
          </h2>
          <p className="text-sm sm:text-base text-[#9C8F80] leading-relaxed">
            Bizim için kahve yalnızca sabah uyanmak için tüketilen bir içecek değil; ardında yüzlerce yıllık çiftçi emeği,
            toprak kimyası ve hassas termodinamik dengeler barındıran bir zanaattir. Her çekirdeğin genetik aromatik potansiyelini
            yakmadan, en berrak haliyle ortaya çıkarıyoruz.
          </p>
        </div>

        {/* 2-Column Asymmetric Story Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Visual Pair (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#1C1916] border border-[#2A241F]">
                <img
                  src="/src/assets/images/coffee_beans_ethiopia_1791115453076.jpg"
                  alt="Özel Kavrulmuş Tek Kökenli Kahve Çekirdekleri"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-[#1C1916] border border-[#2A241F] rounded-xl text-left">
                <span className="font-mono text-xs font-semibold text-[#C28448]">Mikro-Lot Seçkisi</span>
                <p className="text-xs text-[#9C8F80] mt-1">Yalnızca 85+ tadım puanına sahip hasatları ithal ediyoruz.</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 bg-[#1C1916] border border-[#2A241F] rounded-xl text-left">
                <span className="font-mono text-xs font-semibold text-[#C28448]">Sıfır Karbon Kavrum</span>
                <p className="text-xs text-[#9C8F80] mt-1">Kapalı devre hava sirkülasyonlu Loring makinelerimizle %80 daha az gaz salınımı.</p>
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#1C1916] border border-[#2A241F]">
                <img
                  src="/src/assets/images/pour_over_v60_craft_1791115466266.jpg"
                  alt="Hassas V60 Manuel Demleme Deneyimi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Narrative Pillar Points (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-6 bg-[#1C1916] border border-[#2A241F] rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#25211D] text-[#C28448]">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#EDE8E1]">
                  Doğrudan Çiftçiden Ticaret (Direct Trade)
                </h3>
              </div>
              <p className="text-xs text-[#9C8F80] leading-relaxed pl-12">
                Aracıları devreden çıkararak Etiyopya, Kolombiya ve Guatemala&apos;daki mikro çiftliklerle doğrudan çalışıyor; adil fiyat politikasıyla yerel üreticileri destekliyoruz.
              </p>
            </div>

            <div className="p-6 bg-[#1C1916] border border-[#2A241F] rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#25211D] text-[#C28448]">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#EDE8E1]">
                  Omni-Roast ve Hassas Isı Eğrileri
                </h3>
              </div>
              <p className="text-xs text-[#9C8F80] leading-relaxed pl-12">
                Her partinin nem, yoğunluk ve ortam sıcaklığını dijital sensörlerle takip ederek saniyede 10 kez sıcaklık eğrisini (RoR) optimize ediyoruz.
              </p>
            </div>

            <div className="p-6 bg-[#1C1916] border border-[#2A241F] rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#25211D] text-[#C28448]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#EDE8E1]">
                  Sertifikalı SCA Baristaları
                </h3>
              </div>
              <p className="text-xs text-[#9C8F80] leading-relaxed pl-12">
                Tüm kafelerimizde suyun TDS mineral oranından öğütücü bıçaklarının mikron kalibrasyonuna kadar her detay günlük olarak test edilir.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
