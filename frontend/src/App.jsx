import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollIntro from './components/ScrollIntro';
import WhoWeAre from './components/WhoWeAre';
import OurTeams from './components/OurTeams';
import Challenges from './components/Challenges';
import FounderJourney from './components/FounderJourney';
import Programs from './components/Programs';
import CompanyGoal from './components/CompanyGoal';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';

// App — composes the full marketing page and owns the modal state.
export default function App() {
  const [modal, setModal] = useState(null); // null | 'apply' | 'register' | 'basic' | 'signature' | 'premium'
  return (
    <div className="page">
      <Navbar onOpenApply={setModal} />
      <ScrollIntro onOpenApply={setModal} />
      <main className="page-body">
        <WhoWeAre />
        <OurTeams />
        <Challenges />
        <FounderJourney />
        <Programs onOpenApply={setModal} />
        <CompanyGoal />
        <FinalCTA onOpenApply={setModal} />
        <Footer />
      </main>
      {modal && <ApplyModal program={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
