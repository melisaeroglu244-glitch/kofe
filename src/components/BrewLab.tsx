import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Clock, Sliders, Volume2 } from 'lucide-react';
import { BREW_GUIDES } from '../data/coffeeData';

export const BrewLab: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('v60');
  const [coffeeGrams, setCoffeeGrams] = useState<number>(15);
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const guide = BREW_GUIDES.find((g) => g.id === selectedGuideId) || BREW_GUIDES[0];
  const waterGrams = Math.round(coffeeGrams * guide.ratio);

  // When changing guide, reset coffee grams to guide default
  const handleSelectGuide = (id: string) => {
    setSelectedGuideId(id);
    const target = BREW_GUIDES.find((g) => g.id === id);
    if (target) {
      setCoffeeGrams(target.defaultCoffee);
    }
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  // Web Audio subtle chime
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const toggleTimer = () => {
    if (!timerRunning) {
      playChime();
    }
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="brew-lab" className="py-24 bg-[#141210] border-b border-[#2A241F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C28448] font-semibold mb-3">
            <span>Demleme Laboratuvarı</span>
            <span aria-hidden="true" className="text-[#695D51]">·</span>
            <span>Kusursuz Oranlar</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#EDE8E1] tracking-tight mb-4 text-balance">
            Evinde Usta Bir Barista Gibi Demle
          </h2>
          <p className="text-sm text-[#9C8F80] text-balance">
            Kullandığınız kahve miktarını ayarlayın; su sıcaklığı, öğütüm kalınlığı, oran ve adım adım döküş zamanlayıcısını anlık hesaplayalım.
          </p>
        </div>

        {/* Device Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#1C1916] border border-[#2A241F] rounded-xl max-w-xl mx-auto mb-12">
          {BREW_GUIDES.map((g) => (
            <button
              key={g.id}
              onClick={() => handleSelectGuide(g.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedGuideId === g.id
                  ? 'bg-[#C28448] text-[#141210]'
                  : 'text-[#9C8F80] hover:text-[#EDE8E1]'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls & Metrics (7 cols) */}
          <div className="lg:col-span-7 bg-[#1C1916] border border-[#2A241F] rounded-2xl p-6 sm:p-8 space-y-8">
            
            {/* Gram Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#9C8F80] font-semibold">
                  Kahve Gramajı
                </span>
                <span className="font-mono text-2xl font-bold text-[#C28448] tabular-nums">
                  {coffeeGrams} g
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="45"
                step="1"
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                className="w-full h-2 bg-[#2A241F] rounded-lg appearance-none cursor-pointer accent-[#C28448]"
              />
              <div className="flex justify-between text-[11px] text-[#695D51] mt-1 font-mono">
                <span>8 g (1 Fincan)</span>
                <span>25 g (Ortalama)</span>
                <span>45 g (Paylaşımlık)</span>
              </div>
            </div>

            {/* Calculated Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#141210] border border-[#2A241F] rounded-xl text-left">
                <div className="flex items-center gap-1.5 text-xs text-[#9C8F80] mb-1">
                  <Droplets className="w-3.5 h-3.5 text-[#C28448]" />
                  <span>Gereken Su</span>
                </div>
                <div className="font-mono text-lg font-bold text-[#EDE8E1] tabular-nums">
                  {waterGrams} ml
                </div>
                <div className="text-[10px] text-[#695D51] mt-0.5">Oran 1:{guide.ratio}</div>
              </div>

              <div className="p-4 bg-[#141210] border border-[#2A241F] rounded-xl text-left">
                <div className="flex items-center gap-1.5 text-xs text-[#9C8F80] mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#C28448]" />
                  <span>Su Sıcaklığı</span>
                </div>
                <div className="font-mono text-lg font-bold text-[#EDE8E1]">
                  {guide.waterTemp}
                </div>
                <div className="text-[10px] text-[#695D51] mt-0.5">Demleme suyu</div>
              </div>

              <div className="p-4 bg-[#141210] border border-[#2A241F] rounded-xl text-left">
                <div className="flex items-center gap-1.5 text-xs text-[#9C8F80] mb-1">
                  <Sliders className="w-3.5 h-3.5 text-[#C28448]" />
                  <span>Öğütüm</span>
                </div>
                <div className="text-xs font-semibold text-[#EDE8E1] truncate">
                  {guide.grindText.split('(')[0]}
                </div>
                <div className="text-[10px] text-[#695D51] mt-0.5 truncate">{guide.grindText}</div>
              </div>

              <div className="p-4 bg-[#141210] border border-[#2A241F] rounded-xl text-left">
                <div className="flex items-center gap-1.5 text-xs text-[#9C8F80] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#C28448]" />
                  <span>Hedef Süre</span>
                </div>
                <div className="font-mono text-lg font-bold text-[#EDE8E1]">
                  {guide.totalTime}
                </div>
                <div className="text-[10px] text-[#695D51] mt-0.5">Toplam ekstraksiyon</div>
              </div>
            </div>

            {/* Step-by-Step Instruction Timeline */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#9C8F80] font-semibold block mb-2">
                Adım Adım Demleme Aşamaları:
              </span>
              {guide.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3 bg-[#141210] border border-[#2A241F] rounded-xl text-left"
                >
                  <div className="font-mono text-xs font-bold text-[#C28448] bg-[#25211D] px-2.5 py-1 rounded shrink-0">
                    {step.time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#EDE8E1] leading-relaxed">{step.action}</p>
                  </div>
                  <div className="font-mono text-xs font-semibold text-[#9C8F80] shrink-0">
                    {step.waterTotal}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Interactive Live Timer (5 cols) */}
          <div className="lg:col-span-5 bg-[#1C1916] border border-[#2A241F] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between text-center min-h-[420px]">
            
            <div className="w-full flex items-center justify-between text-xs text-[#9C8F80] mb-4">
              <span className="uppercase tracking-widest font-semibold text-[#C28448]">Canlı Barista Saati</span>
              <div className="flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-[#695D51]" />
                <span className="text-[10px]">Sesli İpuçları</span>
              </div>
            </div>

            {/* Circular Timer Display */}
            <div className="relative my-6 flex flex-col items-center justify-center w-52 h-52 rounded-full border-4 border-[#2A241F] bg-[#141210] shadow-inner">
              <span className="font-mono text-5xl font-bold tracking-tight text-[#EDE8E1] tabular-nums">
                {formatTimer(timerSeconds)}
              </span>
              <span className="text-xs text-[#C28448] font-mono mt-1">
                {timerRunning ? 'Demleniyor...' : timerSeconds > 0 ? 'Duraklatıldı' : 'Başlamaya Hazır'}
              </span>
            </div>

            {/* Timer Actions */}
            <div className="w-full space-y-3">
              <div className="flex gap-3 justify-center">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                    timerRunning
                      ? 'bg-amber-600/30 border border-amber-500 text-amber-300'
                      : 'bg-[#C28448] text-[#141210] hover:bg-[#E3A86E]'
                  }`}
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{timerRunning ? 'Durdur' : 'Sayacı Başlat'}</span>
                </button>

                <button
                  onClick={resetTimer}
                  className="p-3 rounded-lg border border-[#38322C] text-[#9C8F80] hover:text-[#EDE8E1] hover:bg-[#25211D] transition-colors cursor-pointer"
                  aria-label="Sıfırla"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-[#695D51]">
                Demleme başladığında su akış hızınızı adım tablosuyla senkronize tutun.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
