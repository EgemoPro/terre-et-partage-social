
import { Badge } from '@/components/ui/badge';
import { Home, Sprout } from 'lucide-react';
import { UserRole } from '@/store/slices/authSlice';

interface RoleBadgeProps {
  role: UserRole;
  showIcon?: boolean;
}

const RoleBadge = ({ role, showIcon = true }: RoleBadgeProps) => {
  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'owner':
        return {
          label: 'Propriétaire',
          icon: Home,
          className: 'bg-green-100 text-green-800 hover:bg-green-200'
        };
      case 'cultivator':
        return {
          label: 'Cultivateur',
          icon: Sprout,
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        };
      default:
        return {
          label: 'Utilisateur',
          icon: Home,
          className: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const config = getRoleConfig(role);
  const IconComponent = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      {showIcon && <IconComponent className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  );
};

export default RoleBadge;
