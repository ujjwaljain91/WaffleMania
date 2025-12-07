import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WAFFLE_BASES, TOPPINGS } from '../constants';
import { Button } from './Button';
import { Sparkles, RotateCcw, Plus, ChefHat, Loader2, Bookmark, Save, Trash2, CornerDownLeft, ShoppingBag, Wand2, X } from 'lucide-react';
import { generateWaffleDescription, generateWaffleFromMood } from '../services/geminiService';
import { useCart } from '../context/CartContext';
import { SavedWaffle } from '../types';

export const Customizer: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState(WAFFLE_BASES[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [aiDescription, setAiDescription] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Saving functionality state
  const [viewMode, setViewMode] = useState<'create' | 'saved'>('create');
  const [savedWaffles, setSavedWaffles] = useState<SavedWaffle[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  
  // Sommelier State
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [moodInput, setMoodInput] = useState("");
  const [isSommelierThinking, setIsSommelierThinking] = useState(false);

  const { addToCart } = useCart();

  // Load saved waffles on mount
  useEffect(() => {
    const saved = localStorage.getItem('waffle_mania_saved');
    if (saved) {
      try {
        setSavedWaffles(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved waffles");
      }
    }
  }, []);

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    const toppingNames = TOPPINGS
      .filter(t => selectedToppings.includes(t.id))
      .map(t => t.name);
    
    const desc = await generateWaffleDescription(selectedBase.name, toppingNames);
    setAiDescription(desc);
    setIsGenerating(false);
  };

  const handleSommelierCurate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moodInput.trim()) return;

    setIsSommelierThinking(true);
    const result = await generateWaffleFromMood(moodInput);
    
    if (result) {
      // Find and set base
      const matchedBase = WAFFLE_BASES.find(b => b.id === result.baseId);
      if (matchedBase) setSelectedBase(matchedBase);

      // Set toppings
      // Filter out any invalid IDs returned by AI just in case
      const validToppings = result.toppingIds.filter(id => TOPPINGS.some(t => t.id === id));
      setSelectedToppings(validToppings);

      // Set reason as description
      setAiDescription(result.reason);
      
      // Close sommelier input but keep mode open to see result
      setIsSommelierOpen(false);
      setMoodInput("");
    }
    setIsSommelierThinking(false);
  };

  const calculateTotal = () => {
    const toppingsCost = TOPPINGS
      .filter(t => selectedToppings.includes(t.id))
      .reduce((acc, curr) => acc + curr.price, 0);
    return (selectedBase.price + toppingsCost);
  };

  const handleAddToCart = () => {
    const toppingNames = TOPPINGS
      .filter(t => selectedToppings.includes(t.id))
      .map(t => t.name)
      .join(', ');
    
    addToCart({
      name: `Custom ${selectedBase.name}`,
      description: toppingNames ? `With ${toppingNames}` : 'Plain custom creation',
      price: calculateTotal(),
      image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop", 
      type: 'custom'
    });
  };

  // Save logic
  const handleSaveWaffle = () => {
    const newWaffle: SavedWaffle = {
      id: Date.now().toString(),
      name: `Custom ${selectedBase.name}`,
      baseId: selectedBase.id,
      toppingIds: selectedToppings,
      date: Date.now(),
      aiDescription: aiDescription
    };
    
    const updated = [newWaffle, ...savedWaffles];
    setSavedWaffles(updated);
    localStorage.setItem('waffle_mania_saved', JSON.stringify(updated));
    
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDeleteWaffle = (id: string) => {
    const updated = savedWaffles.filter(w => w.id !== id);
    setSavedWaffles(updated);
    localStorage.setItem('waffle_mania_saved', JSON.stringify(updated));
  };

  const handleLoadWaffle = (waffle: SavedWaffle) => {
    const base = WAFFLE_BASES.find(b => b.id === waffle.baseId);
    if (base) setSelectedBase(base);
    setSelectedToppings(waffle.toppingIds);
    if (waffle.aiDescription) setAiDescription(waffle.aiDescription);
    else setAiDescription("");
    
    setViewMode('create');
  };

  const handleAddSavedToCart = (waffle: SavedWaffle) => {
     const base = WAFFLE_BASES.find(b => b.id === waffle.baseId);
     if (!base) return;
     
     const toppings = TOPPINGS.filter(t => waffle.toppingIds.includes(t.id));
     const toppingsCost = toppings.reduce((acc, curr) => acc + curr.price, 0);
     const total = base.price + toppingsCost;
     const toppingNames = toppings.map(t => t.name).join(', ');

     addToCart({
        name: waffle.name,
        description: toppingNames ? `With ${toppingNames}` : 'Plain custom creation',
        price: total,
        image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop",
        type: 'custom'
     });
  };

  // Assets
  const BASE_WAFFLE_IMG = "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop"; 
  const PLATE_IMG = "https://images.unsplash.com/photo-1585414457780-3f6366799791?q=80&w=800&auto=format&fit=crop";

  // Natural distribution slots for toppings
  const toppingSlots = useMemo(() => {
    const slots = [];
    for(let i=0; i<3; i++) {
       const angle = (i * 120) + Math.random() * 30;
       slots.push({ r: 12, angle, scale: 0.85 + Math.random() * 0.15, rot: Math.random() * 360 });
    }
    for(let i=0; i<5; i++) {
       const angle = (i * 72) + 15;
       slots.push({ r: 28, angle, scale: 0.9 + Math.random() * 0.2, rot: Math.random() * 360 });
    }
    for(let i=0; i<6; i++) {
       const angle = (i * 60) + 30;
       slots.push({ r: 42, angle, scale: 0.95 + Math.random() * 0.25, rot: Math.random() * 360 });
    }
    return slots;
  }, []);

  return (
    <section id="customizer" className="py-20 md:py-32 relative overflow-hidden bg-[#FAF7F2]">
      {/* Ambient Background Texture */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
           style={{ backgroundImage: `radial-gradient(#E5E5E5 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />
      
      {/* Soft colored light blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-100/40 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-100/50 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          
          {/* Left Panel: The Menu / Controls (Order 2 on Mobile to stay below Visual) */}
          <div className="w-full lg:w-5/12 space-y-8 lg:space-y-12 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start justify-between"
            >
              <div>
                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-2 block">The Atelier</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-950 mb-4">
                  {viewMode === 'create' ? 'Design Your Palette' : 'Your Collections'}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-amber-900/60 text-base md:text-lg font-light leading-relaxed">
                    {viewMode === 'create' 
                      ? 'Select your canvas and adorn it.' 
                      : 'Revisit your masterpieces.'}
                  </p>
                  
                  {viewMode === 'create' && (
                    <button 
                      onClick={() => setIsSommelierOpen(!isSommelierOpen)}
                      className="ml-0 sm:ml-2 w-fit px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium border border-purple-200 hover:bg-purple-200 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Wand2 className="w-3 h-3" />
                      <span>AI Sommelier</span>
                    </button>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => setViewMode(viewMode === 'create' ? 'saved' : 'create')}
                className="p-3 rounded-full bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 transition-all shadow-sm group shrink-0"
                title={viewMode === 'create' ? 'View Saved Collections' : 'Back to Designer'}
              >
                {viewMode === 'create' ? (
                  <Bookmark className="w-6 h-6 group-hover:fill-amber-100" />
                ) : (
                  <CornerDownLeft className="w-6 h-6" />
                )}
              </button>
            </motion.div>

            {/* Sommelier Input Panel */}
            <AnimatePresence>
              {isSommelierOpen && viewMode === 'create' && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
                  exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                  className="overflow-hidden w-full"
                >
                  <form onSubmit={handleSommelierCurate} className="bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-purple-100 shadow-lg relative">
                    <button 
                      type="button" 
                      onClick={() => setIsSommelierOpen(false)}
                      className="absolute top-2 right-2 p-2 text-purple-900/30 hover:text-purple-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <h3 className="font-serif font-bold text-purple-900 text-lg">The Mood Matcher</h3>
                    </div>
                    <p className="text-sm text-purple-900/60 mb-4">Tell us how you're feeling, or describe the perfect vibe. We'll curate the rest.</p>
                    <div className="flex flex-col gap-3">
                      <input 
                        type="text" 
                        value={moodInput}
                        onChange={(e) => setMoodInput(e.target.value)}
                        placeholder="e.g. It's a rainy Sunday and I need comfort..."
                        className="w-full bg-white border border-purple-200 rounded-xl px-4 py-3 text-base text-purple-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        disabled={isSommelierThinking || !moodInput.trim()}
                        className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
                      >
                        {isSommelierThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Curate'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {viewMode === 'create' ? (
                <motion.div
                  key="create-mode"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 lg:space-y-12"
                >
                  {/* 1. The Canvas (Base) */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-amber-900/10 pb-2">
                      <h3 className="font-serif text-2xl text-amber-900 italic">01. The Canvas</h3>
                      <span className="text-xs font-bold text-amber-900/40 uppercase tracking-wider">Select Base</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {WAFFLE_BASES.map(base => (
                        <motion.button
                          key={base.id}
                          onClick={() => setSelectedBase(base)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative group p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                            selectedBase.id === base.id 
                              ? 'border-amber-600 bg-white shadow-xl shadow-amber-900/5' 
                              : 'border-transparent bg-white/50 hover:bg-white hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-full shadow-inner ${base.color} ring-4 ring-white`} />
                            {selectedBase.id === base.id && (
                              <motion.div layoutId="base-check" className="bg-amber-600 text-white p-1 rounded-full">
                                <Plus className="w-3 h-3" />
                              </motion.div>
                            )}
                          </div>
                          <div className="relative z-10">
                              <div className="font-serif font-bold text-amber-900 text-lg">{base.name}</div>
                              <div className="text-amber-600 font-medium mt-1">${base.price}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* 2. The Accents (Toppings) */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-amber-900/10 pb-2">
                      <h3 className="font-serif text-2xl text-amber-900 italic">02. The Accents</h3>
                      <span className="text-xs font-bold text-amber-900/40 uppercase tracking-wider">Add Toppings</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {TOPPINGS.map(topping => {
                        const isSelected = selectedToppings.includes(topping.id);
                        return (
                          <button
                            key={topping.id}
                            onClick={() => toggleTopping(topping.id)}
                            className={`relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center text-center gap-3 group ${
                              isSelected 
                                ? 'border-amber-600 bg-white shadow-lg ring-1 ring-amber-600/20' 
                                : 'border-transparent bg-white/40 hover:bg-white hover:shadow-md'
                            }`}
                          >
                            <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
                              <img 
                                  src={topping.image} 
                                  alt={topping.name} 
                                  className={`w-full h-full object-cover rounded-full shadow-sm transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`} 
                              />
                              {isSelected && (
                                  <motion.div 
                                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 bg-amber-600 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                                  >
                                      <Plus className="w-3 h-3 text-white" />
                                  </motion.div>
                              )}
                            </div>
                            <div>
                              <div className="text-xs md:text-sm font-medium text-amber-900 leading-tight">{topping.name}</div>
                              <div className="text-[10px] md:text-xs text-amber-600 mt-1">+${topping.price}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="bg-white p-6 rounded-2xl shadow-xl shadow-amber-900/5 border border-amber-100 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
                        <div className="w-full sm:w-auto">
                            <span className="text-sm text-amber-900/50 font-medium uppercase tracking-wider">Estimated Total</span>
                            <div className="text-4xl font-serif font-bold text-amber-900 mt-1">${calculateTotal().toFixed(2)}</div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button 
                              onClick={() => {
                                  setSelectedBase(WAFFLE_BASES[0]);
                                  setSelectedToppings([]);
                                  setAiDescription("");
                              }}
                              className="p-3 rounded-full border border-amber-200 text-amber-600 hover:bg-amber-50 transition-colors"
                              title="Reset Creation"
                          >
                              <RotateCcw className="w-5 h-5" />
                          </button>
                          <button 
                              onClick={handleSaveWaffle}
                              className={`p-3 rounded-full border transition-all duration-300 flex items-center gap-2 ${justSaved ? 'bg-green-50 border-green-200 text-green-700' : 'border-amber-200 text-amber-600 hover:bg-amber-50'}`}
                              title="Save to Collections"
                          >
                              {justSaved ? <span className="text-sm font-bold px-1">Saved!</span> : <Save className="w-5 h-5" />}
                          </button>
                          <Button className="px-8 w-full sm:w-auto" onClick={handleAddToCart}>Add to Order</Button>
                        </div>
                    </div>
                    
                    {/* AI Section (Manual Gen) */}
                    <div className="relative">
                        <button 
                          onClick={handleAiGenerate}
                          disabled={isGenerating}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 text-amber-900/80 hover:shadow-md transition-all text-sm font-medium group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isGenerating ? (
                              <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
                          ) : (
                              <Sparkles className="w-4 h-4 text-amber-600 group-hover:animate-pulse" />
                          )}
                          {isGenerating ? "Consulting Chef..." : (aiDescription ? "Ask Chef for another opinion" : "Ask AI Chef for a description")}
                        </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="saved-mode"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {savedWaffles.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-amber-200 rounded-2xl text-amber-900/40">
                      <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="font-serif text-xl">No collections yet.</p>
                      <p className="text-sm mt-2">Start designing to save your favorites.</p>
                      <button 
                        onClick={() => setViewMode('create')}
                        className="mt-6 text-amber-700 underline hover:text-amber-900"
                      >
                        Create a Waffle
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {savedWaffles.map((waffle) => (
                        <motion.div 
                          key={waffle.id}
                          layout
                          className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all group"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-serif font-bold text-amber-900 text-lg">{waffle.name}</h4>
                                <span className="text-xs text-amber-900/40 font-medium">
                                  {new Date(waffle.date).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => handleDeleteWaffle(waffle.id)}
                                  className="p-2 text-red-400 hover:bg-red-50 rounded-full hover:text-red-600 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-amber-800/70 leading-relaxed">
                              {waffle.toppingIds.length > 0 
                                ? `Topped with ${waffle.toppingIds.map(tid => TOPPINGS.find(t => t.id === tid)?.name).join(', ')}`
                                : 'Classic Base only'
                              }
                            </p>
                          </div>

                          <div className="flex gap-3 pt-3 border-t border-amber-50">
                            <button 
                              onClick={() => handleLoadWaffle(waffle)}
                              className="flex-1 py-2 rounded-lg border border-amber-200 text-amber-800 text-sm font-medium hover:bg-amber-50 transition-colors"
                            >
                              Edit Design
                            </button>
                            <button 
                              onClick={() => handleAddSavedToCart(waffle)}
                              className="flex-1 py-2 rounded-lg bg-amber-900 text-amber-50 text-sm font-medium hover:bg-amber-800 transition-colors flex items-center justify-center gap-2"
                            >
                              <ShoppingBag className="w-3 h-3" /> Order
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Panel: The Stage (Visual Preview) - Order 1 on mobile to show first */}
          <div className="w-full lg:w-7/12 sticky top-24 min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center order-1 lg:order-2">
             
             {/* AI Chef Note Card (Floating) */}
             <AnimatePresence>
                {aiDescription && (
                   <motion.div
                      initial={{ opacity: 0, y: -20, rotate: -2 }}
                      animate={{ opacity: 1, y: 0, rotate: -2 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-0 right-0 z-30 w-64 bg-[#fffdf5] p-6 shadow-xl rounded-sm border border-stone-200 rotate-2 transform origin-bottom-left hidden md:block"
                      style={{ fontFamily: '"Indie Flower", cursive' }} 
                   >
                      <div className="flex items-center gap-2 mb-3 border-b border-stone-100 pb-2">
                          <ChefHat className="w-5 h-5 text-amber-800" />
                          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Chef's Note</span>
                      </div>
                      <p className="font-serif text-amber-900 text-lg italic leading-snug">
                         "{aiDescription}"
                      </p>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* The Plate Stage - Responsive Container */}
             <div className="relative w-full max-w-[350px] md:max-w-[550px] aspect-square flex items-center justify-center">
                
                {/* Spotlight on floor */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[10%] bg-black/20 blur-3xl rounded-full" />

                {/* Plate */}
                <motion.div 
                    className="relative w-full h-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Plate Image */}
                    <div className="absolute inset-0 rounded-full bg-white shadow-2xl overflow-hidden border-4 border-white">
                        <img src={PLATE_IMG} alt="Ceramic Plate" className="w-full h-full object-cover opacity-90" />
                        {/* Inner shadow for depth */}
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] rounded-full pointer-events-none"></div>
                    </div>

                    {/* Waffle Composition */}
                    <div className="absolute inset-[16%] rounded-full overflow-hidden shadow-xl">
                        {/* Base Waffle */}
                        <motion.div
                            key={selectedBase.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full relative"
                        >
                             <img 
                                src={BASE_WAFFLE_IMG} 
                                alt="Waffle Base" 
                                className="w-full h-full object-cover scale-110"
                                style={{ filter: selectedBase.filter }}
                            />
                            {/* Tint Overlay */}
                            {selectedBase.blendColor && selectedBase.blendColor !== 'transparent' && (
                                <div 
                                    className="absolute inset-0 mix-blend-multiply opacity-60"
                                    style={{ backgroundColor: selectedBase.blendColor }}
                                />
                            )}
                            {/* Texture Restore Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay pointer-events-none"></div>
                        </motion.div>

                        {/* Toppings Layer */}
                        <AnimatePresence>
                            {selectedToppings.map((tId, idx) => {
                                const topping = TOPPINGS.find(t => t.id === tId);
                                if (!topping) return null;
                                const isSyrup = topping.type === 'syrup';

                                return (
                                    <React.Fragment key={tId}>
                                        {isSyrup ? (
                                            /* Liquid Toppings */
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 0.8, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.8 }}
                                                className="absolute inset-0 pointer-events-none mix-blend-multiply z-20"
                                            >
                                                 {/* We use a mask to keep syrup on the waffle */}
                                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                                    <img 
                                                        src={topping.image} 
                                                        className="w-full h-full object-cover scale-150 blur-[1px] opacity-90" 
                                                        alt=""
                                                    />
                                                </div>
                                            </motion.div>
                                        ) : (
                                            /* Solid Toppings */
                                            <div className="absolute inset-0 z-30 pointer-events-none">
                                                {toppingSlots.map((slot, i) => {
                                                    // Unique jitter for this topping layer
                                                    const layerOffset = idx * 23; 
                                                    const finalAngle = slot.angle + layerOffset;
                                                    const rad = (finalAngle * Math.PI) / 180;
                                                    const x = 50 + Math.cos(rad) * slot.r;
                                                    const y = 50 + Math.sin(rad) * slot.r;

                                                    return (
                                                        <motion.div
                                                            key={`${tId}-${i}`}
                                                            initial={{ opacity: 0, y: -40, rotate: Math.random() * 90 }}
                                                            animate={{ opacity: 1, y: 0, rotate: slot.rot + layerOffset }}
                                                            exit={{ opacity: 0, scale: 0 }}
                                                            transition={{ 
                                                                type: "spring",
                                                                damping: 12,
                                                                stiffness: 200,
                                                                delay: i * 0.03 + (idx * 0.1) 
                                                            }}
                                                            className="absolute w-14 h-14 rounded-full shadow-lg origin-center"
                                                            style={{ 
                                                                left: `${x}%`, 
                                                                top: `${y}%`,
                                                                marginLeft: '-1.75rem', 
                                                                marginTop: '-1.75rem',
                                                            }}
                                                        >
                                                            <img src={topping.image} className="w-full h-full object-cover rounded-full" alt="" />
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Highlights / Reflections on top */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full pointer-events-none mix-blend-overlay z-40" />
                </motion.div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};