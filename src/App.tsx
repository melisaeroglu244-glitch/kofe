import React, { useState, useEffect } from 'react';
import { CoffeeProduct, CartItem, GrindType } from './types/coffee';
import { COFFEE_PRODUCTS } from './data/coffeeData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuCatalog } from './components/MenuCatalog';
import { BrewLab } from './components/BrewLab';
import { RoasteryStory } from './components/RoasteryStory';
import { BranchesSection } from './components/BranchesSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { FlavorProfilerModal } from './components/FlavorProfilerModal';
import { ReservationModal } from './components/ReservationModal';
import { Check, X, Flame } from 'lucide-react';

export default function App() {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kavruk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal & Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isProfilerOpen, setIsProfilerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | null>(null);

  // Top banner dismissible state
  const [showTopBanner, setShowTopBanner] = useState(true);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('kavruk_cart', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (
    product: CoffeeProduct,
    grind?: GrindType,
    weight?: number,
    quantity = 1
  ) => {
    const isBean = product.category === 'beans';
    const effectiveGrind = isBean ? (grind || 'whole_bean') : undefined;
    const effectiveWeight = isBean ? (weight || 250) : undefined;
    const cartItemId = `${product.id}-${effectiveGrind || 'none'}-${effectiveWeight || 'standard'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          grind: effectiveGrind,
          weight: effectiveWeight,
        },
      ];
    });

    showToast(`${product.name} sepete eklendi`);
  };

  const handleQuickAdd = (product: CoffeeProduct) => {
    if (product.category === 'beans') {
      // For beans, open modal so user can choose grind & weight
      setSelectedProduct(product);
    } else {
      handleAddToCart(product, undefined, undefined, 1);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#141210] text-[#EDE8E1] flex flex-col font-sans">
      
      {/* Slim Dismissible Top Notification Banner (Section 2.C: max 1 banner <= 40px) */}
      {showTopBanner && (
        <div className="bg-[#1C1916] border-b border-[#2A241F] py-2 px-4 text-center text-xs text-[#C4B9AA] flex items-center justify-between z-50">
          <div className="flex-1 flex items-center justify-center gap-2">
            <Flame className="w-3.5 h-3.5 text-[#C28448]" />
            <span>
              <strong>Taze Kavrum Günü:</strong> Salı & Perşembe kavrumları hazırlandı. 450 ₺ üzeri kargo ücretsiz!
            </span>
          </div>
          <button
            onClick={() => setShowTopBanner(false)}
            aria-label="Bildirimi kapat"
            className="text-[#9C8F80] hover:text-[#EDE8E1] transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenProfiler={() => setIsProfilerOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          onOpenProfiler={() => setIsProfilerOpen(true)}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* Menu & Roastery Catalog */}
        <MenuCatalog
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
          onOpenProfiler={() => setIsProfilerOpen(true)}
        />

        {/* Interactive Brew Lab & Live Extraction Timer */}
        <BrewLab />

        {/* Roastery Philosophy & Bean Origin Story */}
        <RoasteryStory />

        {/* Istanbul Branches & Table Reservation Spot */}
        <BranchesSection onOpenReservation={() => setIsReservationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Detail & Customization Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Flavor Profiler Modal */}
      <FlavorProfilerModal
        isOpen={isProfilerOpen}
        onClose={() => setIsProfilerOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Floating Add to Cart Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#1C1916] border border-[#C28448] text-xs text-[#EDE8E1] shadow-2xl shadow-black/80 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#C28448] text-[#141210] flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-3 font-semibold text-[#C28448] hover:underline cursor-pointer"
          >
            Sepeti Gör
          </button>
        </div>
      )}

    </div>
  );
}
