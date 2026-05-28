import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CompanyGoal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-40 px-6 bg-black overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-black to-blue-950/30" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-purple-400 uppercase tracking-widest text-sm mb-6"
        >
          Our Goal
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
        >
          Building India's Next Generation of Founders
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Each program is designed to move you from learning about startups to building and operating real companies.
        </motion.p>
      </div>
    </section>
  )
}
