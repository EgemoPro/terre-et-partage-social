
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import Dashboard from '@/components/Dashboard';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  const handleDashboardClick = () => {
    setCurrentView('dashboard');
  };

  const handleHomeClick = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onAuthClick={handleAuthClick}
        onDashboardClick={handleDashboardClick}
      />
      
      {currentView === 'home' ? (
        <HomePage onAuthClick={handleAuthClick} />
      ) : (
        isAuthenticated && <Dashboard />
      )}
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Index;
