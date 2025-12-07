import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Star, Quote, ArrowRight } from 'lucide-react';

const ReviewCard = ({ item, index }: { item: typeof TESTIMONIALS[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="relative bg-white p-10 rounded-[2.5rem] shadow-xl shadow-amber-900/5 border border-amber-100 group h-full flex flex-col overflow-hidden"
    >
      {/* Decorative Background Quote Icon */}
      <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
        <Quote className="w-32 h-32 text-amber-900 fill-amber-900" />
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: (index * 0.1) + (i * 0.1), duration: 0.4 }}
          >
            <Star 
              className={`w-5 h-5 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`} 
            />
          </motion.div>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-2xl font-serif text-amber-950 leading-relaxed italic mb-10 relative z-10 font-light">
        "{item.text}"
      </p>

      {/* Author Info */}
      <div className="mt-auto flex items-center gap-4 border-t border-amber-50 pt-6">
         <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 to-orange-100 p-[2px] shadow-md">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
               {/* Simulating avatar images based on name for demo purposes, or falling back to initials */}
               <span className="font-serif font-bold text-xl text-amber-800">
                 {item.name.charAt(0)}
               </span>
            </div>
         </div>
         <div>
            <div className="font-bold text-amber-900 text-lg font-serif tracking-tight">{item.name}</div>
            <div className="text-xs text-amber-600/70 font-bold uppercase tracking-widest flex items-center gap-1">
               {item.role}
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yBlob = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="reviews" ref={ref} className="py-32 bg-[#FFF8F0] relative overflow-hidden">
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-multiply"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
      />

      {/* Floating Ambient Blobs */}
      <motion.div 
        style={{ y: yBlob }}
        className="absolute top-20 left-10 w-96 h-96 bg-orange-200/30 rounded-full blur-[100px] pointer-events-none" 
      />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="h-[1px] w-12 bg-amber-900/30"></div>
               <span className="text-amber-900/50 font-bold uppercase tracking-widest text-sm">Social Proof</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-amber-950 leading-none">
              The Talk <br/>
              <span className="italic font-light text-amber-700 ml-16">of the</span> Town.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm"
          >
             <div className="text-right">
                <div className="text-3xl font-bold text-amber-900 font-serif">4.9</div>
                <div className="text-xs text-amber-900/50 uppercase tracking-wider font-medium">Average Rating</div>
             </div>
             <div className="h-10 w-[1px] bg-amber-900/10"></div>
             <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                ))}
             </div>
          </motion.div>
        </div>
        
        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {TESTIMONIALS.map((item, index) => (
             <div key={item.id} className={index === 1 ? 'md:mt-16' : ''}> 
               {/* Stagger the middle column visually with margin */}
               <ReviewCard item={item} index={index} />
             </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
           <button className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-950 text-amber-50 rounded-full hover:bg-amber-900 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/20">
              <span className="font-medium tracking-wide">Read all 1,240+ Reviews</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </motion.div>

      </div>
    </section>
  );
};