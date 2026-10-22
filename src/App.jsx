import { useState } from 'react';
import useInit from './hooks/useInit';
import initPage from './scripts/hero-story.js';

import IntroScreen from './components/IntroScreen.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Story from './components/Story.jsx';
import Why from './components/Why.jsx';
import Ecosystem from './components/Ecosystem.jsx';
import Roles from './components/Roles.jsx';
import Capabilities from './components/Capabilities.jsx';
import Trust from './components/Trust.jsx';
import Faq from './components/Faq.jsx';
import Pricing from './components/Pricing.jsx';
import Finale from './components/Finale.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // Route wiring, mobile menu, header scroll state and pinned story.
  // Runs once after all children mount.
  useInit(initPage);

  const handleIntroDone = () => {
    setIntroDone(true);
    document.body.classList.remove('intro-running');
    document.body.classList.add('intro-done');
  };

  return (
    <>

      {/* Cinematic intro — removed from DOM once complete */}
      <IntroScreen onComplete={handleIntroDone} />

      <Header />
      <main id="top">
        <Hero />
        <Story />
        <Why />
        <Ecosystem />
        <Roles />
        <Capabilities />
        <Trust />
        <Faq />
        <Pricing />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
