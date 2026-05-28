import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const blocks = [
  {
    title: 'Who We Are',
    body: 'AXIONFORGE LLP is a next-generation startup execution and founder development ecosystem. We empower ambitious students and early-stage entrepreneurs to turn their ideas into scalable, real-world businesses.',
  },
  {
    title: 'Our Mission',
    body: 'To bridge the gap between "having an idea" and "building a real company." We help you move beyond theory, providing the systems, guidance, and resources to launch and grow your startup with clarity and confidence.',
  },
  {
    title: 'What Makes Us Different',
    body: 'We focus on building founders, not just teaching startups. Our approach is hands-on, professional, and execution-driven — so you develop real-world skills and the discipline to operate like a true company from day one.',
  },
]

function Block({ title, body, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
      className="flex flex-col gap-4 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{body}</p>
    </motion.div>
  )
}

export default function WhoWeAre() {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Background logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[20vw] font-extrabold text-white/[0.03] tracking-tighter">
          AXIONFORGE
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {blocks.map((block, i) => (
          <Block key={block.title} {...block} index={i} />
        ))}
      </div>
    </section>
  )
}
