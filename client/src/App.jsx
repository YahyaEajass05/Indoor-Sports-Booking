import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import layout components
import { 
  Navbar, 
  Footer, 
  ScrollProgressBar, 
  PageTransition, 
  AnimatedBackground,
  LoadingScreen 
} from './components/layout';

// Import context
import { ThemeProvider } from './context/ThemeContext';

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
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} message="Preparing your experience..." />

      {/* Animated Background */}
      <AnimatedBackground variant="particles" />

      {/* Scroll Progress Indicator */}
      <ScrollProgressBar position="top" />

      <div className="min-h-screen">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content with Page Transitions */}
        <PageTransition variant="fade">
          <main className="pt-20">
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
          </main>
        </PageTransition>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
