import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading,
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";
  
  const variants = {
    primary: "bg-amber-800 text-amber-50 hover:bg-amber-900 shadow-lg hover:shadow-amber-800/30",
    secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200",
    outline: "border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-amber-50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : children}
    </motion.button>
  );
};