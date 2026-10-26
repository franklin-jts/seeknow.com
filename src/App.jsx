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
import TextSpotlight from './components/TextSpotlight.jsx';
import ConsolePage from './components/ConsolePage.jsx';
import ReferNowPage from './components/ReferNowPage.jsx';
import SolutionPage from './components/Solution.jsx';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/console') return <ConsolePage />;
  if (path === '/refer-now') return <ReferNowPage />;
  if (path === '/solution') return <SolutionPage />;
  return <HomePage />;
}

function HomePage() {
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
      {/* Text-only spotlight — purple at 100% inside, white at 85% outside */}
      <TextSpotlight radius={250} unit="char" />

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
        <Pricing />
        <Faq />
       <Finale />
      </main>
      <Footer />
    </>
  );
}
