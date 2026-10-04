import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { BRANCHES } from '../data/coffeeData';
import { Reservation } from '../types/coffee';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [branch, setBranch] = useState(BRANCHES[0].name);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('14:00');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'indoor' | 'terrace' | 'brew_bar'>('terrace');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resId = `KVR-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newReservation: Reservation = {
      id: resId,
      branch,
      date,
      time,
      guests,
      name,
      phone,
      email,
      seatingArea,
      notes,
      createdAt: new Date().toLocaleDateString('tr-TR'),
    };
    setConfirmedReservation(newReservation);
  };

  const handleResetAndClose = () => {
    setConfirmedReservation(null);
    onClose();
  };

  const timeSlots = ['09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '20:00', '21:30'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#1C1916] border border-[#38322C] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 my-8">
        
        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#9C8F80] hover:text-[#EDE8E1] hover:bg-[#25211D] transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedReservation ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C28448] font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Masa Rezervasyonu</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#EDE8E1]">
                Kavruk Kafe&apos;de Yerinizi Ayırtın
              </h2>
              <p className="text-xs text-[#9C8F80] mt-1">
                Kahve tadımı, huzurlu çalışma saatleri veya keyifli buluşmalarınız için anında masa konfirmasyonu.
              </p>
            </div>

            {/* Branch selector */}
            <div>
              <label className="block text-xs font-semibold text-[#EDE8E1] mb-2">Şube Seçimi</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBranch(b.name)}
                    className={`p-3 text-left rounded-xl border text-xs transition-colors cursor-pointer ${
                      branch === b.name
                        ? 'border-[#C28448] bg-[#C28448]/15 text-[#EDE8E1]'
                        : 'border-[#2A241F] bg-[#141210] text-[#9C8F80] hover:border-[#4A4036]'
                    }`}
                  >
                    <span className="font-semibold block truncate text-[#EDE8E1]">{b.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-[#9C8F80] block truncate">{b.district}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date, Time & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">Tarih</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">Kişi Sayısı</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num} className="bg-[#141210] text-[#EDE8E1]">
                      {num} Kişi
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">Saat Dilimi</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#141210] text-[#EDE8E1]">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating Area Preference */}
            <div>
              <label className="block text-xs font-semibold text-[#EDE8E1] mb-2">Alan Tercihi</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'terrace', label: 'Açık Teras / Bahçe' },
                  { id: 'indoor', label: 'İç Mekan & Çalışma' },
                  { id: 'brew_bar', label: 'Brew Bar (Barista Önü)' },
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSeatingArea(area.id as 'indoor' | 'terrace' | 'brew_bar')}
                    className={`py-2 px-3 text-center text-xs rounded-lg border transition-colors cursor-pointer ${
                      seatingArea === area.id
                        ? 'border-[#C28448] bg-[#C28448]/15 text-[#EDE8E1] font-semibold'
                        : 'border-[#2A241F] bg-[#141210] text-[#9C8F80]'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  placeholder="Adınız ve Soyadınız"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">Telefon Numarası *</label>
                <input
                  type="tel"
                  required
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">Özel İstek veya Not</label>
              <input
                type="text"
                placeholder="Örn: Priz yakınında sessiz masa tercihi"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer shadow-lg shadow-[#C28448]/20"
            >
              Rezervasyonu Onayla
            </button>
          </form>
        ) : (
          /* Confirmation Ticket Card */
          <div className="text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#C28448] font-semibold">
                Rezervasyon Başarılı
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#EDE8E1] mt-1">
                Masanız Sizi Bekliyor
              </h3>
              <p className="text-xs text-[#9C8F80] mt-1">
                Konfirmasyon detaylarınız SMS ve e-posta ile iletilmiştir.
              </p>
            </div>

            {/* Elegant Ticket Slip */}
            <div className="bg-[#141210] border border-[#2A241F] rounded-xl p-5 text-left space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-center pb-3 border-b border-[#2A241F]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9C8F80]">Rezervasyon No</span>
                  <div className="font-mono text-base font-bold text-[#C28448]">{confirmedReservation.id}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#9C8F80]">Misafir</span>
                  <div className="font-semibold text-xs text-[#EDE8E1]">{confirmedReservation.name}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#9C8F80] block text-[11px]">Şube:</span>
                  <span className="text-[#EDE8E1] font-medium">{confirmedReservation.branch}</span>
                </div>
                <div>
                  <span className="text-[#9C8F80] block text-[11px]">Tarih & Saat:</span>
                  <span className="text-[#EDE8E1] font-medium">{confirmedReservation.date} · {confirmedReservation.time}</span>
                </div>
                <div>
                  <span className="text-[#9C8F80] block text-[11px]">Kişi & Alan:</span>
                  <span className="text-[#EDE8E1] font-medium">
                    {confirmedReservation.guests} Kişi · {confirmedReservation.seatingArea === 'terrace' ? 'Açık Teras' : confirmedReservation.seatingArea === 'brew_bar' ? 'Brew Bar' : 'İç Mekan'}
                  </span>
                </div>
                <div>
                  <span className="text-[#9C8F80] block text-[11px]">İletişim:</span>
                  <span className="text-[#EDE8E1] font-medium">{confirmedReservation.phone}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
            >
              Tamam
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
