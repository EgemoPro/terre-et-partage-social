import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Sprout, TrendingUp, MessageSquare } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const StatsCard = ({ title, value, description, icon: Icon }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </CardContent>
  </Card>
);

interface DashboardStatsProps {
  stats: {
    totalLands: number;
    availableLands: number;
    activeProjects: number;
    avgProgress: number;
    estimatedRevenue: number;
    unreadMessages: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Terres totales"
        value={stats.totalLands}
        description={`${stats.availableLands} disponibles`}
        icon={MapPin}
      />
      <StatsCard
        title="Projets actifs"
        value={stats.activeProjects}
        description={`Progression moyenne: ${Math.round(stats.avgProgress)}%`}
        icon={Sprout}
      />
      <StatsCard
        title="Revenus estimés"
        value={`${stats.estimatedRevenue}€`}
        description="Ce trimestre"
        icon={TrendingUp}
      />
      <StatsCard
        title="Messages"
        value={stats.unreadMessages + 3}
        description={`${stats.unreadMessages} non lus`}
        icon={MessageSquare}
      />
    </div>
  );
};

export default DashboardStats;