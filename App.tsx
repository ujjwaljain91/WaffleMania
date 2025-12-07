
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Specials } from './components/Specials';
import { Customizer } from './components/Customizer';
import { Vibes } from './components/Vibes';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';

function App() {
  return (
    <CartProvider>
      <main className="min-h-screen w-full selection:bg-amber-200 selection:text-amber-900">
        <Navbar />
        <Hero />
        <Specials />
        <Customizer />
        <Vibes />
        <Testimonials />
        <Footer />
        
        {/* Overlays */}
        <Cart />
        <Checkout />
      </main>
    </CartProvider>
  );
}

export default App;
