
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

export const Cart: React.FC = () => {
  const { items, removeFromCart, cartTotal, isCartOpen, setIsCartOpen, setIsCheckoutOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FFFbf5] shadow-2xl z-[70] flex flex-col border-l border-amber-900/5"
          >
            {/* Header */}
            <div className="p-6 border-b border-amber-900/10 flex items-center justify-between bg-white/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-amber-900" />
                <h2 className="text-2xl font-serif font-bold text-amber-900">Your Order</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-amber-100 text-amber-900/60 hover:text-amber-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag className="w-16 h-16 text-amber-900/20" />
                  <p className="text-amber-900 font-serif text-xl">Your cart is empty</p>
                  <p className="text-sm text-amber-800/60">Time to add some deliciousness.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    key={item.id}
                    className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-amber-900/5"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-amber-50 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif font-bold text-amber-900 leading-tight">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-amber-900/30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-amber-800/60 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-amber-700 font-bold text-sm mt-2">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-amber-900/10 space-y-4">
                <div className="space-y-2 text-sm text-amber-900/60">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (8%)</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dashed border-amber-900/20">
                  <span className="font-serif font-bold text-xl text-amber-900">Total</span>
                  <span className="font-serif font-bold text-2xl text-amber-900">
                    ${(cartTotal * 1.08).toFixed(2)}
                  </span>
                </div>
                <Button 
                  className="w-full mt-4 group"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
