import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Button } from './Button';
import { Star, Sparkles, MoveRight, ArrowRight } from 'lucide-react';

const FloatingElement = ({ delay, children, className, style }: any) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    className={`absolute ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

const Marquee = () => (
  <div className="absolute top-20 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none z-0">
    <motion.div
      className="whitespace-nowrap text-[6rem] md:text-[12rem] font-black font-serif text-amber-950 leading-none"
      animate={{ x: ["0%", "-100%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      WAFFLE MANIA • TASTE THE AESTHETIC • SWEET CRUNCH • BELGIAN GOLD • WAFFLE MANIA •
    </motion.div>
  </div>
);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Adjusted parallax values to prevent clipping
  const y1 = useTransform(scrollY, [0, 500], [0, 50]); 
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Image moves up faster (parallax depth)
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  }

  const WAFFLE_IMG = "https://images.unsplash.com/photo-1568051243851-f9b136146e97?q=80&w=1000&auto=format&fit=crop";
  const STRAWBERRY_IMG = "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=400&auto=format&fit=crop";
  const BLUEBERRY_IMG = "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=400&auto=format&fit=crop";

  return (
    <section className="relative min-h-[100vh] md:min-h-[110vh] flex items-center pt-24 md:pt-20 overflow-hidden bg-[#FFF9F0] perspective-[1000px]">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
        <Marquee />
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-multiply"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
        />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-12 items-center relative z-10">
            
            {/* Text Content */}
            <motion.div 
                style={{ y: y1, opacity: opacityText }}
                className="order-2 lg:order-1 space-y-6 md:space-y-8 pb-16 lg:pb-0 text-center lg:text-left"
            >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-100 shadow-sm text-amber-800 text-xs font-bold tracking-widest uppercase"
                >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Redefining Breakfast</span>
                </motion.div>

                <div className="relative">
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-black text-amber-950 leading-[0.9] md:leading-[0.85] tracking-tight">
                        <motion.span 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="block"
                        >
                            PURE
                        </motion.span>
                        <motion.span 
                             initial={{ y: 100, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                             className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 italic lg:pr-4"
                        >
                            GOLDEN
                        </motion.span>
                        <motion.span 
                             initial={{ y: 100, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                             className="block"
                        >
                            BLISS.
                        </motion.span>
                    </h1>
                    
                    {/* Decorative underlining squiggle - Hidden on mobile for cleaner look */}
                    <motion.svg 
                        className="hidden md:block absolute -bottom-8 left-0 w-64 h-8 text-amber-400"
                        viewBox="0 0 200 20"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5 }}
                    >
                        <path d="M5 10 Q 50 20, 95 10 T 185 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </motion.svg>
                </div>

                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-lg md:text-xl text-amber-900/60 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
                >
                    Experience the crunch that echoes. Handcrafted Belgian waffles meeting hyper-realistic aesthetics.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
                >
                    <Button className="h-14 px-10 text-lg shadow-amber-900/20 shadow-2xl hover:scale-105 transition-transform w-full sm:w-auto">
                        Order Now
                    </Button>
                    <a href="#customizer" className="group flex items-center justify-center gap-2 text-amber-900 font-bold px-6 py-4 rounded-full hover:bg-amber-100/50 transition-colors w-full sm:w-auto">
                        Customize
                        <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </motion.div>

            {/* Interactive 3D Visual */}
            <motion.div 
                style={{ y: y2 }}
                className="order-1 lg:order-2 flex justify-center perspective-[1200px] mt-8 lg:mt-0"
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div 
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative w-[280px] sm:w-[350px] md:w-[500px] aspect-square"
                >
                    {/* Main Waffle Plate */}
                    <motion.div 
                        className="absolute inset-0 rounded-full shadow-[0_30px_60px_-15px_rgba(146,64,14,0.4)]"
                        style={{ transform: "translateZ(50px)" }}
                    >
                        <img 
                            src={WAFFLE_IMG} 
                            alt="Hero Waffle" 
                            className="w-full h-full object-cover rounded-full border-[6px] border-white"
                        />
                         {/* Shine overlay */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/30 pointer-events-none" />
                    </motion.div>

                    {/* Floating Strawberry */}
                    <FloatingElement delay={0} className="top-0 right-0 md:right-10 w-16 h-16 md:w-24 md:h-24 z-20" style={{ transform: "translateZ(100px)" }}>
                         <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/80">
                            <img src={STRAWBERRY_IMG} className="w-full h-full object-cover scale-125" alt="Strawberry" />
                         </div>
                    </FloatingElement>

                    {/* Floating Blueberry */}
                    <FloatingElement delay={2} className="bottom-10 left-0 w-14 h-14 md:w-20 md:h-20 z-20" style={{ transform: "translateZ(80px)" }}>
                         <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/80">
                            <img src={BLUEBERRY_IMG} className="w-full h-full object-cover scale-150" alt="Blueberry" />
                         </div>
                    </FloatingElement>

                    {/* Floating Card */}
                     <motion.div 
                        className="absolute bottom-[-10%] right-[-5%] bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-white z-30 flex items-center gap-3"
                        style={{ transform: "translateZ(120px)" }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-600 fill-amber-600" />
                        </div>
                        <div>
                            <div className="text-[10px] md:text-xs font-bold text-amber-900/50 uppercase">Rating</div>
                            <div className="text-sm md:text-lg font-bold text-amber-900 leading-none">5.0 Stars</div>
                        </div>
                     </motion.div>

                </motion.div>
            </motion.div>

        </div>
    </section>
  );
};