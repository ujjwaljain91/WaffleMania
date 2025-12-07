import React from 'react';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-950 text-amber-50 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-amber-900/50 pb-12 mb-12">
            <div>
                <h3 className="text-3xl font-serif font-bold mb-4">Waffle Mania</h3>
                <p className="text-amber-200/60 max-w-xs">
                    Redefining the waffle experience through aesthetics, premium ingredients, and a touch of magic.
                </p>
            </div>
            
            <div className="flex gap-12">
                <div>
                    <h4 className="font-bold mb-4 text-amber-200">Explore</h4>
                    <ul className="space-y-2 text-amber-200/60">
                        <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Menu</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-amber-200">Legal</h4>
                    <ul className="space-y-2 text-amber-200/60">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                    </ul>
                </div>
            </div>

            <div>
                <h4 className="font-bold mb-4 text-amber-200">Newsletter</h4>
                <div className="flex border-b border-amber-700 pb-2">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-transparent outline-none text-white placeholder-amber-800/50 w-full"
                    />
                    <button className="text-amber-200 hover:text-white">
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-amber-200/40 text-sm">
            <p>&copy; 2025 Waffle Mania Co. All rights reserved. Made with love by Ujjwal Jain</p>
            <div className="flex gap-6">
                <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
        </div>
      </div>
    </footer>
  );
};