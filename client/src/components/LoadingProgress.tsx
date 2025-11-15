import { motion } from "framer-motion";

interface LoadingProgressProps {
  progress: number;
}

export function LoadingProgress({ progress }: LoadingProgressProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <svg className="w-24 h-24 text-white mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.56-.878 1.266-1.747 2.117-2.606.851-.859 1.833-1.574 2.945-2.145C7.267 4.406 8.39 4 9.511 4c1.456 0 2.464.504 3.024 1.512L24 7.8z"/>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Experience</h2>
          <p className="text-white/60">Preparing your premium footwear</p>
        </motion.div>

        <div className="w-80 max-w-full px-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-white/80 mt-4 text-lg font-semibold">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
