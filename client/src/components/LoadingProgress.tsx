import { motion } from "framer-motion";

interface LoadingProgressProps {
  progress: number;
}

export function LoadingProgress({ progress }: LoadingProgressProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black z-50 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.img
            src="/nike-logo.png"
            alt="Nike"
            className="w-32 h-auto mx-auto mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            JUST DO IT
          </motion.h1>
          
          <motion.p
            className="text-white/60 text-lg tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Loading your premium collection
          </motion.p>
        </motion.div>

        <motion.div
          className="w-96 max-w-full px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/80 via-white to-white/80 rounded-full shadow-lg shadow-white/20"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-0 h-full bg-white/30 rounded-full blur-md"
              initial={{ width: 0, left: 0 }}
              animate={{ width: `${progress}%`, left: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          <motion.p
            className="text-white font-semibold mt-6 text-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/40 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
