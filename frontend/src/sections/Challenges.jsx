import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const problems = [
  'Uncertainty about where to begin',
  'No clear business structure or roadmap',
  'Lack of mentorship and professional guidance',
  'Difficulty validating ideas',
  'Limited knowledge in branding and technology',
  'Fear of failure, lack of confidence',
  'No professional network or support ecosystem',
  'Struggling to balance academics and startup building',
]

const solutions = [
  'Validating and refining your startup ideas',
  'Building strong business models and execution strategies',
  'Personalized mentorship and founder development',
  'Creating professional brands and digital presence',
  'Legal and business structuring support',
  'Developing operational systems and workflows',
  'Teaching real-world execution and professional habits',
  'Supporting you through every stage of the journey',
]

export default function Challenges() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-32 px-6 bg-black" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-purple-400 uppercase tracking-widest text-sm mb-4">The Reality</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white">
            The Gap We Bridge
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="p-8 rounded-2xl border border-red-500/20 bg-red-950/10"
          >
            <h3 className="text-xl font-bold text-red-400 mb-6">What Students Face</h3>
            <ul className="space-y-3">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                  <span className="mt-1 text-red-500">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10"
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-6">How AXIONFORGE Solves It</h3>
            <ul className="space-y-3">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                  <span className="mt-1 text-emerald-500">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
