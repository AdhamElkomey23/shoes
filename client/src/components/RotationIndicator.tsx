import { motion } from "framer-motion";

interface RotationIndicatorProps {
  isDragging?: boolean;
}

export function RotationIndicator({ isDragging }: RotationIndicatorProps) {
  return (
    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg width="200" height="80" viewBox="0 0 200 80" className="overflow-visible">
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            d="M 20 60 Q 100 10 180 60"
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth={isDragging ? "4" : "3"}
            strokeLinecap="round"
            filter="url(#glow)"
            className="transition-all duration-300"
          />
          
          <motion.circle
            cx="20"
            cy="60"
            r={isDragging ? "6" : "4"}
            fill="#3B82F6"
            filter="url(#glow)"
            animate={{
              scale: isDragging ? [1, 1.2, 1] : 1,
            }}
            transition={{
              repeat: isDragging ? Infinity : 0,
              duration: 1,
            }}
          />
          
          <motion.circle
            cx="180"
            cy="60"
            r={isDragging ? "6" : "4"}
            fill="#EC4899"
            filter="url(#glow)"
            animate={{
              scale: isDragging ? [1, 1.2, 1] : 1,
            }}
            transition={{
              repeat: isDragging ? Infinity : 0,
              duration: 1,
            }}
          />
          
          <motion.path
            d="M 15 55 L 20 60 L 15 65"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          
          <motion.path
            d="M 185 55 L 180 60 L 185 65"
            fill="none"
            stroke="#EC4899"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        </svg>
        
        <motion.div 
          className="text-center mt-2 text-white/70 text-sm font-medium"
          animate={{
            opacity: isDragging ? 1 : 0.7,
          }}
        >
          Drag to rotate
        </motion.div>
      </motion.div>
    </div>
  );
}
