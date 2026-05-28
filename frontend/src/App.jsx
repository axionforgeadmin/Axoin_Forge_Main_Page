import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import WhoWeAre from './sections/WhoWeAre'
import OurTeams from './sections/OurTeams'
import Challenges from './sections/Challenges'
import FounderJourney from './sections/FounderJourney'
import Programs from './sections/Programs'
import CompanyGoal from './sections/CompanyGoal'
import FinalCTA from './sections/FinalCTA'
import Footer from './components/Footer'
import ApplyModal from './components/ApplyModal'
import { useModalStore } from './store/modalStore'

export default function App() {
  const { isOpen } = useModalStore()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <OurTeams />
      <Challenges />
      <FounderJourney />
      <Programs />
      <CompanyGoal />
      <FinalCTA />
      <Footer />
      {isOpen && <ApplyModal />}
    </div>
  )
}
