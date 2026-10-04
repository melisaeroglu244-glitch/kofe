import React, { useState } from 'react';
import { X, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/coffee';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 450;
  
  // Calculate item unit price
  const getItemPrice = (item: CartItem) => {
    const base = item.product.price;
    if (item.weight === 500) return Math.round(base * 1.9);
    if (item.weight === 1000) return Math.round(base * 3.6);
    return base;
  };

  const subtotal = items.reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 || isFreeShipping ? 0 : 45;
  const total = subtotal + shippingCost;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const getGrindLabel = (grind?: string) => {
    switch (grind) {
      case 'whole_bean': return 'Çekirdek';
      case 'v60': return 'V60 / Filtre';
      case 'espresso': return 'Espresso';
      case 'turkish': return 'Türk Kahvesi';
      case 'french_press': return 'French Press';
      default: return null;
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `KVR-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrder);
    setCheckoutStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1C1916] border-l border-[#38322C] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#2A241F] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C28448]" />
              <h2 className="font-serif-display text-xl font-bold text-[#EDE8E1]">
                {checkoutStep === 'cart' && `Sepetim (${items.reduce((s, i) => s + i.quantity, 0)})`}
                {checkoutStep === 'checkout' && 'Teslimat & Ödeme'}
                {checkoutStep === 'success' && 'Sipariş Alındı'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#9C8F80] hover:text-[#EDE8E1] hover:bg-[#25211D] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart View */}
          {checkoutStep === 'cart' && (
            <>
              {/* Free Shipping Meter */}
              {items.length > 0 && (
                <div className="px-5 py-3 bg-[#141210] border-b border-[#2A241F] text-xs">
                  {isFreeShipping ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                      <Truck className="w-4 h-4" />
                      <span>Tebrikler! Ücretsiz Kargo Kazandınız.</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-[#9C8F80] mb-1.5">
                        <span>Ücretsiz kargo için <strong className="text-[#EDE8E1] font-mono">{remainingForFreeShipping} ₺</strong> daha ekleyin</span>
                      </div>
                      <div className="w-full bg-[#25211D] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#C28448] h-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#9C8F80] py-12">
                    <ShoppingBag className="w-12 h-12 stroke-[1.2] mb-3 text-[#4A4036]" />
                    <p className="text-sm font-medium text-[#EDE8E1] mb-1">Sepetiniz şu anda boş</p>
                    <p className="text-xs text-[#9C8F80] max-w-xs mb-6">
                      Haftalık taze kavrulan mikro-lot kahvelerimizi keşfetmeye hemen başlayın.
                    </p>
                    <a
                      href="#menu"
                      onClick={onClose}
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
                    >
                      Kahveleri İncele
                    </a>
                  </div>
                ) : (
                  items.map((item) => {
                    const unitPrice = getItemPrice(item);
                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-[#141210] border border-[#2A241F] rounded-xl"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-lg object-cover shrink-0 bg-[#1C1916]"
                        />

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-serif-display text-sm font-semibold text-[#EDE8E1] truncate">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-[#695D51] hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Details: Grind & Weight */}
                            <div className="text-[11px] text-[#9C8F80] space-x-2 mt-0.5">
                              {item.grind && <span>{getGrindLabel(item.grind)}</span>}
                              {item.weight && <span>· {item.weight}g</span>}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#38322C] rounded-md bg-[#1C1916]">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="px-2 py-0.5 text-xs text-[#9C8F80] hover:text-[#EDE8E1] cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 font-mono text-xs text-[#EDE8E1]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="px-2 py-0.5 text-xs text-[#9C8F80] hover:text-[#EDE8E1] cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-mono text-sm font-semibold text-[#EDE8E1] tabular-nums">
                              {unitPrice * item.quantity} ₺
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Subtotal & Checkout Trigger */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[#2A241F] bg-[#141210] space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#9C8F80]">
                      <span>Ara Toplam</span>
                      <span className="font-mono text-[#EDE8E1] tabular-nums">{subtotal} ₺</span>
                    </div>
                    <div className="flex justify-between text-[#9C8F80]">
                      <span>Kargo</span>
                      <span className="font-mono text-[#EDE8E1] tabular-nums">
                        {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost} ₺`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#EDE8E1] pt-2 border-t border-[#2A241F]">
                      <span>Toplam Tutar</span>
                      <span className="font-mono text-lg text-[#C28448] tabular-nums">{total} ₺</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Siparişi Tamamla</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Checkout Form View */}
          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between p-5 overflow-y-auto">
              <div className="space-y-4">
                <div className="text-xs text-[#9C8F80] pb-2 border-b border-[#2A241F]">
                  Siparişinizin taze kavrulup hazırlanması için lütfen teslimat bilgilerinizi doldurun.
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#EDE8E1] mb-1">Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Örn: Melisa Eroğlu"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#EDE8E1] mb-1">Telefon Numarası *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#EDE8E1] mb-1">Teslimat Adresi *</label>
                  <textarea
                    required
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Mahalle, Cadde, Bina No, Daire, İlçe/Şehir"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#141210] border border-[#38322C] text-[#EDE8E1] focus:outline-none focus:border-[#C28448]"
                  />
                </div>

                {/* Payment Option */}
                <div>
                  <label className="block text-xs font-medium text-[#EDE8E1] mb-2">Ödeme Seçeneği</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 text-xs text-left rounded-lg border cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#C28448] bg-[#C28448]/15 text-[#EDE8E1]'
                          : 'border-[#2A241F] bg-[#141210] text-[#9C8F80]'
                      }`}
                    >
                      <span className="font-semibold block text-[#EDE8E1]">Kredi / Banka Kartı</span>
                      <span className="text-[10px] text-[#9C8F80]">3D Güvenli Ödeme</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 text-xs text-left rounded-lg border cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-[#C28448] bg-[#C28448]/15 text-[#EDE8E1]'
                          : 'border-[#2A241F] bg-[#141210] text-[#9C8F80]'
                      }`}
                    >
                      <span className="font-semibold block text-[#EDE8E1]">Kapıda Ödeme</span>
                      <span className="text-[10px] text-[#9C8F80]">Nakit veya POS</span>
                    </button>
                  </div>
                </div>

                {/* Trust guarantee badge */}
                <div className="flex items-center gap-2 p-3 bg-[#141210] border border-[#2A241F] rounded-lg text-[11px] text-[#9C8F80]">
                  <ShieldCheck className="w-4 h-4 text-[#C28448] shrink-0" />
                  <span>256-bit SSL korumalı şifreli işlem ve taze kavrum garantisi.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A241F] space-y-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Siparişi Onayla ({total} ₺)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full py-2 text-xs text-[#9C8F80] hover:text-[#EDE8E1] transition-colors cursor-pointer"
                >
                  Sepete Geri Dön
                </button>
              </div>
            </form>
          )}

          {/* Success Receipt View */}
          {checkoutStep === 'success' && (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#C28448] font-semibold">Tebrikler</span>
                <h3 className="font-serif-display text-2xl font-bold text-[#EDE8E1] mt-1">
                  Siparişiniz Alındı!
                </h3>
                <p className="font-mono text-xs text-[#C28448] mt-1">Sipariş Kodu: {orderNumber}</p>
              </div>

              <div className="w-full bg-[#141210] border border-[#2A241F] rounded-xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between text-[#9C8F80]">
                  <span>Alıcı:</span>
                  <span className="text-[#EDE8E1] font-medium">{customerName || 'Değerli Müşterimiz'}</span>
                </div>
                <div className="flex justify-between text-[#9C8F80]">
                  <span>Ödeme Türü:</span>
                  <span className="text-[#EDE8E1] font-medium">
                    {paymentMethod === 'card' ? 'Kredi Kartı (Onaylandı)' : 'Kapıda Ödeme'}
                  </span>
                </div>
                <div className="flex justify-between text-[#9C8F80]">
                  <span>Toplam Ödenen:</span>
                  <span className="font-mono font-bold text-[#EDE8E1]">{total} ₺</span>
                </div>
                <div className="pt-2 border-t border-[#2A241F] text-[11px] text-[#9C8F80]">
                  Kahveleriniz haftalık kavrum takvimine göre taze çekilerek en geç 24 saat içinde kargoya verilecektir.
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#141210] bg-[#C28448] hover:bg-[#E3A86E] rounded-lg transition-colors cursor-pointer"
              >
                Alışverişe Devam Et
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
