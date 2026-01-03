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

// Import auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import EmailVerification from './pages/auth/EmailVerification';

// Import dashboard layout
import { DashboardLayout } from './components/dashboard';

// Import user dashboard pages
import UserDashboard from './pages/dashboards/user/UserDashboard';
import UpcomingBookings from './pages/dashboards/user/UpcomingBookings';
import BookingHistory from './pages/dashboards/user/BookingHistory';
import CancelledBookings from './pages/dashboards/user/CancelledBookings';
import SavedCourts from './pages/dashboards/user/SavedCourts';
import UserProfile from './pages/dashboards/user/Profile';
import UserNotifications from './pages/dashboards/user/Notifications';
import SecuritySettings from './pages/dashboards/user/SecuritySettings';

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

      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={
          <div className="min-h-screen">
            <Navbar />
            <PageTransition variant="fade">
              <main className="pt-20">
                <Home />
              </main>
            </PageTransition>
            <Footer />
          </div>
        } />
        <Route path="/courts" element={
          <div className="min-h-screen">
            <Navbar />
            <PageTransition variant="fade">
              <main className="pt-20">
                <Courts />
              </main>
            </PageTransition>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="min-h-screen">
            <Navbar />
            <PageTransition variant="fade">
              <main className="pt-20">
                <AboutUs />
              </main>
            </PageTransition>
            <Footer />
          </div>
        } />
        <Route path="/how-it-works" element={
          <div className="min-h-screen">
            <Navbar />
            <PageTransition variant="fade">
              <main className="pt-20">
                <HowItWorks />
              </main>
            </PageTransition>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen">
            <Navbar />
            <PageTransition variant="fade">
              <main className="pt-20">
                <ContactUs />
              </main>
            </PageTransition>
            <Footer />
          </div>
        } />
        <Route path="/faq" element={
          <div className="min-h-screen">
            <Navbar />
            <PageTransition variant="fade">
              <main className="pt-20">
                <FAQ />
              </main>
            </PageTransition>
            <Footer />
          </div>
        } />
        <Route path="/terms" element={
          <div className="min-h-screen">
            <Navbar />
            <PageTransition variant="fade">
              <main className="pt-20">
                <Terms />
              </main>
            </PageTransition>
            <Footer />
          </div>
        } />
        <Route path="/privacy" element={
          <div className="min-h-screen">
            <Navbar />
            <PageTransition variant="fade">
              <main className="pt-20">
                <PrivacyPolicy />
              </main>
            </PageTransition>
            <Footer />
          </div>
        } />
        
        {/* Auth Routes (No Navbar/Footer) */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-email" element={<EmailVerification />} />
        
        {/* User Dashboard Routes (DashboardLayout has its own navigation) */}
        <Route path="/dashboard/user" element={<DashboardLayout userRole="user"><UserDashboard /></DashboardLayout>} />
        <Route path="/dashboard/user/upcoming-bookings" element={<DashboardLayout userRole="user"><UpcomingBookings /></DashboardLayout>} />
        <Route path="/dashboard/user/booking-history" element={<DashboardLayout userRole="user"><BookingHistory /></DashboardLayout>} />
        <Route path="/dashboard/user/cancelled-bookings" element={<DashboardLayout userRole="user"><CancelledBookings /></DashboardLayout>} />
        <Route path="/dashboard/user/saved-courts" element={<DashboardLayout userRole="user"><SavedCourts /></DashboardLayout>} />
        <Route path="/dashboard/user/profile" element={<DashboardLayout userRole="user"><UserProfile /></DashboardLayout>} />
        <Route path="/dashboard/user/notifications" element={<DashboardLayout userRole="user"><UserNotifications /></DashboardLayout>} />
        <Route path="/dashboard/user/security-settings" element={<DashboardLayout userRole="user"><SecuritySettings /></DashboardLayout>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
