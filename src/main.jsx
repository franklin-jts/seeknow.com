import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './styles/reset.css';
import './styles/base.css';
import './styles/intro.css';
import './styles/s3-why.css';
import './styles/s4-ecosystem.css';
import './styles/s5-roles.css';
import './styles/s6-capabilities.css';
import './styles/s7-trust.css';
import './styles/s8-faq.css';
import './styles/s9-pricing.css';
import './styles/s10-finale.css';
import './styles/spotlight.css';

/* Mark the homepage hidden only while its intro screen plays. */
const path = window.location.pathname.replace(/\/+$/, '') || '/';
if (
  !['/console', '/refer-now', '/solution'].includes(path) &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  document.body.classList.add('intro-running');
}

// No <StrictMode>: the section behaviours attach DOM listeners once on mount.
createRoot(document.getElementById('root')).render(<App />);
