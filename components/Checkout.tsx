import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2, CreditCard, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

export const Checkout: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const total = (cartTotal * 1.08).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    // Reset state after exit animation
    setTimeout(() => setStep('form'), 500);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-amber-950/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-[#FFFBF5] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
          >
            {step === 'form' ? (
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900">Checkout</h2>
                    <p className="text-amber-800/60 text-sm">Complete your delicious order</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-amber-100 text-amber-900/40 hover:text-amber-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Amount Display */}
                  <div className="bg-amber-100/50 p-4 rounded-xl border border-amber-200/50 flex justify-between items-center">
                    <span className="text-amber-900 font-medium">Total Amount</span>
                    <span className="text-2xl font-serif font-bold text-amber-900">${total}</span>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-amber-900/50 mb-1">Full Name</label>
                      <input required type="text" placeholder="Jane Doe" className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    
                    <div>
                       <label className="block text-xs font-bold uppercase tracking-wider text-amber-900/50 mb-1">Card Number</label>
                       <div className="relative">
                          <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-900 pl-11 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-amber-900/50 mb-1">Expiry</label>
                        <input required type="text" placeholder="MM/YY" className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-amber-900/50 mb-1">CVC</label>
                        <input required type="text" placeholder="123" className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-4" 
                    disabled={isProcessing}
                    isLoading={isProcessing}
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay $${total}`}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-12 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
                >
                  <Check className="w-12 h-12 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">Order Confirmed!</h2>
                <p className="text-amber-800/60 mb-8 leading-relaxed">
                  Your order has been placed successfully. Our chefs are already heating up the irons.
                </p>
                <Button onClick={handleClose} className="min-w-[200px]">
                  Return to Home
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};