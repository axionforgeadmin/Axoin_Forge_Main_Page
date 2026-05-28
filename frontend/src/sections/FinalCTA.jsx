import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useModalStore } from '../store/modalStore'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { open } = useModalStore()

  return (
    <section className="relative py-40 px-6 bg-black overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 via-black to-black" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
        >
          Ready to Build Your Startup?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-gray-400 text-lg"
        >
          Become the founder you aspire to be — don't just learn, build.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => open('apply')}
            className="px-10 py-4 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-500 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)]"
          >
            Apply Now
          </button>
          <button
            onClick={() => open('register')}
            className="px-10 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            Register Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}
