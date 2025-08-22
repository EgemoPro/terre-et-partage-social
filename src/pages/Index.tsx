
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/components/HomePage';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleDashboardClick = () => {
    setCurrentView('dashboard');
  };

  return (
    <AppLayout showSidebar={isAuthenticated && currentView === 'dashboard'}>
      {currentView === 'home' ? (
        <HomePage onAuthClick={() => {}} />
      ) : (
        isAuthenticated && <Dashboard />
      )}
    </AppLayout>
  );
};

export default Index;
