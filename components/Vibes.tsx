import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Music, Play, Pause, Volume2, Sparkles, Wind } from 'lucide-react';

export const Vibes: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Scroll effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  
  // Audio Control
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Set volume to a pleasant background level
        audioRef.current.volume = 0.4; 
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Animation Variants
  const flickerVariants: Variants = {
    animate: {
      opacity: [0.1, 0.15, 0.08, 0.18, 0.12],
      scale: [1, 1.02, 0.98, 1.01, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const steamParticles = Array.from({ length: 6 });

  return (
    <section id="vibes" ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#1a1614] text-amber-50">
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" 
      />

      {/* 1. Background Image with Parallax & Blur */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div 
            style={{ scale: 1.1, y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]) }} 
            className="w-full h-full"
        >
            <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1920&auto=format&fit=crop" 
            alt="Cozy Cafe Background" 
            className="w-full h-full object-cover filter blur-sm"
            />
        </motion.div>
      </div>
      
      {/* 2. Warm Lighting Overlay (Flickering Lamp Effect) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614] via-[#1a1614]/80 to-transparent" />
      <motion.div 
        variants={flickerVariants}
        animate="animate"
        className="absolute inset-0 bg-gradient-radial from-orange-500/15 via-transparent to-transparent pointer-events-none mix-blend-screen"
      />

      {/* 3. Floating Dust Motes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bg-amber-100/20 rounded-full blur-[1px]"
                style={{
                    width: Math.random() * 4 + 2 + 'px',
                    height: Math.random() * 4 + 2 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                }}
                animate={{
                    y: [0, -150],
                    opacity: [0, 0.6, 0],
                    x: Math.random() * 60 - 30,
                }}
                transition={{
                    duration: Math.random() * 15 + 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5
                }}
            />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Column: Text & Music Player */}
          <motion.div style={{ y }} className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/50 border border-amber-800/50 text-amber-200 text-sm font-medium mb-6 backdrop-blur-md shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Immersive Experience</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-amber-50 font-serif tracking-tight">
              Cafe <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">Ambience</span>
            </h2>
            
            <p className="text-lg text-stone-300 leading-relaxed mb-10 max-w-xl">
              Close your eyes and imagine the warmth. The clinking of porcelain, the rich aroma of roasted beans, and the soft hum of conversation. We've captured that feeling here.
            </p>

            {/* Interactive Music Player Card */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-md hover:bg-white/10 transition-colors duration-300 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPlaying ? 'bg-amber-500 text-amber-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-white/10 text-white'} transition-all duration-500`}>
                            <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
                        </div>
                        <div>
                            <div className="text-amber-100 font-medium text-lg">Late Night Lo-Fi</div>
                            <div className="text-sm text-amber-400/60">Original Waffle Mix</div>
                        </div>
                    </div>
                    
                    {/* Dynamic Equalizer Bars */}
                    <div className="flex items-end gap-1 h-8">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 bg-amber-400 rounded-full"
                                animate={{
                                    height: isPlaying ? [8, 24, 12, 30, 10] : 4,
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: i * 0.15,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={togglePlay}
                        className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
                    >
                        {isPlaying ? (
                            <> <Pause className="w-5 h-5" /> Pause Vibes </>
                        ) : (
                            <> <Play className="w-5 h-5 fill-current" /> Play Vibes </>
                        )}
                    </button>
                    
                    <div className="flex items-center gap-2 text-white/40 px-2">
                        <Volume2 className="w-5 h-5" />
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Right Column: Visuals (Coffee Cup & Steam) */}
          <div className="lg:w-1/2 relative flex justify-center mt-12 lg:mt-0">
             {/* Glowing "Coaster" */}
             <div className="absolute bottom-0 w-64 h-20 bg-amber-500/20 blur-[60px] rounded-full" />

             {/* Cup Container */}
             <motion.div 
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="relative w-full max-w-sm md:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform rotate-2 transition-all duration-700"
             >
                {/* Image */}
                <img 
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-90 scale-110"
                    alt="Latte Art"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

                {/* Floating Text */}
                <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-2 block">Daily Brew</span>
                    <p className="font-serif italic text-3xl text-white/90 leading-none">"The coziest corner <br/> in town."</p>
                </div>
             </motion.div>
             
             {/* Enhanced Steam Particles - Positioned above the cup */}
             <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-40 h-80 pointer-events-none z-20 mix-blend-screen">
                 {steamParticles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0 left-1/2 w-20 h-20 bg-white/40 rounded-full blur-3xl"
                        style={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            y: [-20, -180 - (Math.random() * 60)],
                            x: [0, (Math.random() - 0.5) * 60],
                            scale: [0.4, 1.8, 2.5],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut"
                        }}
                    />
                 ))}
                 {/* Subtle Wind Icon hint in steam */}
                 <motion.div 
                    animate={{ rotate: 360, opacity: [0, 0.1, 0] }} 
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-10 left-8 opacity-0"
                 >
                     <Wind className="w-12 h-12 text-white blur-sm" />
                 </motion.div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};