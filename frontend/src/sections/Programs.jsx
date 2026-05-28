import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useModalStore } from '../store/modalStore'

const programs = [
  {
    name: 'Basic',
    tagline: 'For aspiring founders starting their journey.',
    features: [
      'Idea validation',
      'Founder mentorship',
      'Startup strategy guidance',
      'Business model training',
      'Founder development sessions',
      'Startup blueprint support',
    ],
    featured: false,
    border: 'border-white/10',
    glow: '',
  },
  {
    name: 'Signature',
    tagline: 'For founders ready for advanced execution and professional structuring.',
    features: [
      'Everything in Basic',
      'Advanced execution guidance',
      'Startup branding support',
      'Legal and business structuring',
      'Operational planning',
      'Growth strategy support',
      'Founder execution systems',
    ],
    featured: true,
    border: 'border-purple-500/50',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.25)]',
  },
  {
    name: 'Premium',
    tagline: 'For founders seeking full-spectrum support from idea to execution.',
    features: [
      'Everything in Signature',
      'Full execution support',
      'Technology and digital infrastructure',
      'Marketing and growth systems',
      'Startup operational support',
      'Advanced founder mentorship',
      'Long-term scaling guidance',
    ],
    featured: false,
    border: 'border-white/10',
    glow: '',
  },
]

function ProgramCard({ program, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { open } = useModalStore()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, y: -6 }}
      className={`relative flex flex-col p-8 rounded-2xl border bg-white/5 backdrop-blur-sm ${program.border} ${program.glow} transition-all duration-300 ${program.featured ? 'scale-105' : ''}`}
    >
      {program.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-xs font-semibold tracking-wider uppercase">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-2">{program.name} Program</h3>
      <p className="text-gray-500 text-sm mb-6">{program.tagline}</p>
      <ul className="space-y-2 flex-1 mb-8">
        {program.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="text-purple-400">→</span> {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => open(program.name.toLowerCase())}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          program.featured
            ? 'bg-purple-600 hover:bg-purple-500 text-white'
            : 'border border-white/20 text-white hover:bg-white/10'
        }`}
      >
        Apply for {program.name}
      </button>
    </motion.div>
  )
}

export default function Programs() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-purple-400 uppercase tracking-widest text-sm mb-4">Our Programs</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white">
            Choose Your Path
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {programs.map((p, i) => (
            <ProgramCard key={p.name} program={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
