import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SPECIALS } from '../constants';
import { Plus, Twitter, Instagram } from 'lucide-react';
import { SpecialItem } from '../types';
import { useCart } from '../context/CartContext';

const SpecialCard: React.FC<{ item: SpecialItem, index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(item.image);
  
  // Update image if prop changes
  useEffect(() => {
    setImgSrc(item.image);
  }, [item.image]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax movement
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleAddToCart = () => {
    // Convert price string "$12.50" to number 12.50
    const priceNumber = parseFloat(item.price.replace('$', ''));
    
    addToCart({
      name: item.title,
      description: item.description,
      price: priceNumber,
      image: item.image,
      type: 'special'
    });
  };

  const handleShare = (platform: 'twitter' | 'instagram') => {
    const text = `Check out the ${item.title} at Waffle Mania! 🧇✨`;
    const url = window.location.href;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else {
      window.open('https://instagram.com', '_blank');
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: "0px 20px 40px rgba(180, 83, 9, 0.15)"
      }}
      className="glass-panel rounded-3xl p-4 flex flex-col relative group cursor-pointer transition-all duration-300 h-full"
    >
      <div className="relative h-64 mb-6 overflow-hidden rounded-2xl isolate bg-amber-100">
        {/* Parallax Wrapper */}
        <motion.div 
          style={{ y, scale: 1.25 }} 
          className="w-full h-full absolute inset-0"
        >
          <img 
            src={imgSrc}
            alt={item.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Social Share Buttons */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
             <button 
                onClick={(e) => { e.stopPropagation(); handleShare('twitter'); }}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-amber-900 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100 hover:bg-amber-900 hover:text-white shadow-sm"
                title="Share on Twitter"
             >
               <Twitter className="w-4 h-4" />
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); handleShare('instagram'); }}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-amber-900 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-200 hover:bg-amber-900 hover:text-white shadow-sm"
                title="Share on Instagram"
             >
               <Instagram className="w-4 h-4" />
             </button>
        </div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-900 z-20 shadow-sm border border-white/50">
          {item.calories} cal
        </div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-amber-900 mb-2 font-serif">{item.title}</h3>
        <p className="text-amber-800/60 text-sm mb-6 leading-relaxed">{item.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-amber-100/50">
          <span className="text-2xl font-serif font-bold text-amber-900">{item.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="w-10 h-10 rounded-full bg-amber-900 text-white flex items-center justify-center hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/20 group-hover:scale-110 duration-300"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Specials: React.FC = () => {
  return (
    <section id="specials" className="py-24 relative bg-amber-50/50">
       {/* Decorative Background Blobs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-amber-950 mb-4 font-serif"
          >
            Curated Specials
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-amber-800/60 max-w-2xl mx-auto text-lg"
          >
            Hand-picked combinations by our master waffle artisans.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SPECIALS.map((item, index) => (
            <SpecialCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};