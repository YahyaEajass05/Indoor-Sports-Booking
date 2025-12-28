import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { 
  Navbar, 
  Footer, 
  Sidebar, 
  AnimatedBackground, 
  LoadingScreen,
  ScrollProgressBar,
  PageTransition,
  Breadcrumb,
  NotificationToast
} from './components/layout';

// Test component to verify all layout components render
const TestLayoutComponents = () => {
  const [notifications, setNotifications] = React.useState([
    { id: 1, type: 'success', title: 'Success!', message: 'Component loaded successfully' },
  ]);

  const handleCloseNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {/* Animated Background */}
        <AnimatedBackground variant="particles" />
        
        {/* Scroll Progress Bar */}
        <ScrollProgressBar position="top" />
        
        {/* Navbar */}
        <Navbar />
        
        {/* Sidebar */}
        <Sidebar isOpen={false} onClose={() => {}} userRole="user" />
        
        {/* Page Content with Transition */}
        <PageTransition variant="fade">
          <main className="pt-24 pb-16 px-4">
            <div className="container mx-auto">
              <Breadcrumb />
              
              <div className="space-y-8">
                <section className="text-center py-20">
                  <h1 className="text-5xl font-bold gradient-text-animated mb-4">
                    Layout Components Test
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    All layout components are working perfectly!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {/* Test Cards */}
                    {[
                      { title: 'Navbar', icon: '📱', desc: 'Responsive navigation with animations' },
                      { title: 'Sidebar', icon: '🔲', desc: 'Collapsible sidebar with role-based menu' },
                      { title: 'Footer', icon: '📄', desc: 'Interactive footer with social links' },
                      { title: 'Animations', icon: '✨', desc: 'Advanced animation utilities' },
                      { title: 'Loading', icon: '⏳', desc: 'Beautiful loading screens' },
                      { title: 'Notifications', icon: '🔔', desc: 'Toast notification system' },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="card-glow bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Scroll Test */}
                  <div className="mt-20 space-y-8">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                        <h3 className="text-2xl font-bold text-gray-800">Section {i + 1}</h3>
                        <p className="text-gray-600 mt-2">
                          Scroll down to see the scroll progress indicator in action!
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </PageTransition>
        
        {/* Footer */}
        <Footer />
        
        {/* Notification Toast */}
        <NotificationToast
          notifications={notifications}
          onClose={handleCloseNotification}
          position="top-right"
          autoClose={5000}
        />
      </div>
    </BrowserRouter>
  );
};

export default TestLayoutComponents;
