import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const teams = [
  {
    name: 'Outreach Crew',
    description: 'Founder acquisition, marketing, community engagement, and applicant support.',
    color: 'from-blue-600/20 to-blue-400/5',
    border: 'border-blue-500/30',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]',
  },
  {
    name: 'Strategy Division',
    description: 'Startup planning, idea validation, business strategy, mentorship, and execution systems.',
    color: 'from-purple-600/20 to-purple-400/5',
    border: 'border-purple-500/30',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.15)]',
  },
  {
    name: 'Structuring Unit',
    description: 'Legal structuring, registrations, compliance, and professional business setup.',
    color: 'from-emerald-600/20 to-emerald-400/5',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
  },
  {
    name: 'CodeForge Team',
    description: 'Technology development, websites, digital infrastructure, and automation.',
    color: 'from-orange-600/20 to-orange-400/5',
    border: 'border-orange-500/30',
    glow: 'shadow-[0_0_30px_rgba(249,115,22,0.15)]',
  },
]

function TeamCard({ team, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`p-8 rounded-2xl border bg-gradient-to-br ${team.color} ${team.border} ${team.glow} backdrop-blur-sm transition-shadow duration-300 cursor-default`}
    >
      <h3 className="text-xl font-bold text-white mb-3">{team.name}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{team.description}</p>
    </motion.div>
  )
}

export default function OurTeams() {
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
          <p className="text-purple-400 uppercase tracking-widest text-sm mb-4">Our Teams</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white">
            Built to Execute
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team, i) => (
            <TeamCard key={team.name} team={team} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
