import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  { number: '01', title: 'Founder Evaluation', desc: 'Assess your vision, goals, and startup readiness.' },
  { number: '02', title: 'Idea Validation & Refinement', desc: 'Analyze and improve your idea for market fit.' },
  { number: '03', title: 'Startup Blueprint & Strategy', desc: 'Build your business model, operational plan, and growth roadmap.' },
  { number: '04', title: 'Brand Identity & Positioning', desc: 'Craft your startup\'s name, branding, and professional image.' },
  { number: '05', title: 'Legal & Business Structuring', desc: 'Register, document, and set up your company the right way.' },
  { number: '06', title: 'Technology & Digital Infrastructure', desc: 'Develop websites, automation, and digital systems.' },
  { number: '07', title: 'Professional Founder Development', desc: 'Train in leadership, communication, and execution discipline.' },
  { number: '08', title: 'Marketing & Growth Systems', desc: 'Launch outreach, lead generation, and growth frameworks.' },
  { number: '09', title: 'Operational Execution Support', desc: 'Manage workflows, customer systems, and daily operations.' },
  { number: '10', title: 'Launch & Scaling', desc: 'Launch your startup and scale for long-term success.' },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="flex gap-6 items-start"
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border border-purple-500/50 bg-purple-600/20 flex items-center justify-center text-purple-300 font-bold text-sm shrink-0">
          {step.number}
        </div>
        {index < steps.length - 1 && (
          <div className="w-px flex-1 min-h-[60px] bg-gradient-to-b from-purple-500/40 to-transparent mt-2" />
        )}
      </div>
      <div className="pb-12">
        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  )
}

export default function FounderJourney() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-purple-400 uppercase tracking-widest text-sm mb-4">The Journey</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white">
            Your Founder Journey
          </h2>
        </motion.div>

        <div>
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
