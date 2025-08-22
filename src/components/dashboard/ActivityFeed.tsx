import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Activity {
  id: string;
  type: 'proposal' | 'update' | 'harvest' | 'message';
  title: string;
  description: string;
  timestamp: Date;
  urgent?: boolean;
}

interface ActivityFeedProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    id: '1',
    type: 'proposal',
    title: 'Nouvelle proposition reçue',
    description: 'Marie Cultivatrice - Terrain de Provence',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 heures
    urgent: true
  },
  {
    id: '2',
    type: 'update',
    title: 'Mise à jour de culture',
    description: 'Photos ajoutées - Champ de Normandie',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 jour
  },
  {
    id: '3',
    type: 'harvest',
    title: 'Récolte planifiée',
    description: 'Terrain de Provence - Dans 2 semaines',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 jours
  }
];

const ActivityFeed = ({ activities = defaultActivities }: ActivityFeedProps) => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'proposal': return 'bg-primary/10 border-primary/20';
      case 'update': return 'bg-blue-500/10 border-blue-500/20';
      case 'harvest': return 'bg-orange-500/10 border-orange-500/20';
      case 'message': return 'bg-green-500/10 border-green-500/20';
      default: return 'bg-muted border-border';
    }
  };

  const getIndicatorColor = (type: string) => {
    switch (type) {
      case 'proposal': return 'bg-primary';
      case 'update': return 'bg-blue-500';
      case 'harvest': return 'bg-orange-500';
      case 'message': return 'bg-green-500';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`w-2 h-2 rounded-full mt-2 ${getIndicatorColor(activity.type)}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{activity.title}</p>
                  {activity.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(activity.timestamp, { 
                    addSuffix: true, 
                    locale: fr 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;