import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/public/Home';
import Courts from './pages/public/Courts';
import AboutUs from './pages/public/AboutUs';
import HowItWorks from './pages/public/HowItWorks';
import ContactUs from './pages/public/ContactUs';
import FAQ from './pages/public/FAQ';
import Terms from './pages/public/Terms';
import PrivacyPolicy from './pages/public/PrivacyPolicy';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dark-950">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
