import { motion } from 'framer-motion'
import { useModalStore } from '../store/modalStore'

export default function Hero() {
  const { open } = useModalStore()

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Spline 3D background — add scene URL to .env when ready */}
      <div className="absolute inset-0 z-0">
        {/* TODO: <Spline scene={import.meta.env.VITE_SPLINE_SCENE_URL} /> */}
        <div className="w-full h-full bg-gradient-to-br from-purple-950/30 via-black to-blue-950/30" />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-7xl md:text-9xl font-extrabold tracking-tight text-white"
        >
          AXIONFORGE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="mt-4 text-lg md:text-2xl font-medium text-purple-300 tracking-widest uppercase"
        >
          Not Just Learning. Building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => open('apply')}
            className="px-8 py-4 rounded-full font-semibold text-white border border-purple-500/50 bg-white/5 backdrop-blur-md hover:bg-purple-600/20 hover:border-purple-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Apply Now
          </button>
          <button
            onClick={() => open('register')}
            className="px-8 py-4 rounded-full font-semibold text-white border border-blue-500/50 bg-white/5 backdrop-blur-md hover:bg-blue-600/20 hover:border-blue-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            Register
          </button>
        </motion.div>
      </div>
    </section>
  )
}
