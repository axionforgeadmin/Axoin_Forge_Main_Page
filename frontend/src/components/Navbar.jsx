import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useModalStore } from '../store/modalStore'

const links = ['About', 'Teams', 'Journey', 'Programs']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { open } = useModalStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-extrabold text-white tracking-tight">AXIONFORGE</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          <button
            onClick={() => open('apply')}
            className="px-5 py-2 rounded-full text-sm font-semibold text-white border border-purple-500/50 hover:bg-purple-600/20 transition-all duration-300"
          >
            Apply Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
          <button
            onClick={() => { open('apply'); setMenuOpen(false) }}
            className="mt-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all"
          >
            Apply Now
          </button>
        </div>
      )}
    </motion.nav>
  )
}
