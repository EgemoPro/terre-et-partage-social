import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, MessageSquare, TrendingUp } from 'lucide-react';

interface QuickActionsProps {
  onAddLand?: () => void;
  onFindCultivator?: () => void;
  onOpenMessages?: () => void;
  onViewReports?: () => void;
}

const QuickActions = ({ 
  onAddLand, 
  onFindCultivator, 
  onOpenMessages, 
  onViewReports 
}: QuickActionsProps) => {
  const actions = [
    {
      label: 'Nouvelle terre',
      icon: Plus,
      onClick: onAddLand,
      variant: 'default' as const
    },
    {
      label: 'Trouver cultivateur',
      icon: Users,
      onClick: onFindCultivator,
      variant: 'outline' as const
    },
    {
      label: 'Messages',
      icon: MessageSquare,
      onClick: onOpenMessages,
      variant: 'outline' as const
    },
    {
      label: 'Rapports',
      icon: TrendingUp,
      onClick: onViewReports,
      variant: 'outline' as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button 
              key={index}
              variant={action.variant}
              className="h-20 flex-col space-y-2"
              onClick={action.onClick}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;