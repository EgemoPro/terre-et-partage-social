
import { useAppSelector } from '@/store/hooks';
import OwnerDashboard from './OwnerDashboard';
import CultivatorDashboard from './CultivatorDashboard';

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.role === 'cultivator') {
    return <CultivatorDashboard />;
  }

  return <OwnerDashboard />;
};

export default Dashboard;
