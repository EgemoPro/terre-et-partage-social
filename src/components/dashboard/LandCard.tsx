import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Calendar, Sprout, Eye } from 'lucide-react';
import { Land } from '@/store/slices/landsSlice';

interface LandCardProps {
  land: Land;
  onViewDetails: (land: Land) => void;
}

const LandCard = ({ land, onViewDetails }: LandCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': 
        return 'bg-primary/10 text-primary border-primary/20';
      case 'cultivated': 
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'harvest': 
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
      default: 
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'cultivated': return 'En culture';
      case 'harvest': return 'Récolte';
      default: return status;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {land.images.length > 0 ? (
          <img
            src={land.images[0]}
            alt={land.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/5">
            <Sprout className="w-12 h-12 text-primary/40" />
          </div>
        )}
        <Badge 
          variant="outline" 
          className={`absolute top-2 right-2 ${getStatusColor(land.status)}`}
        >
          {getStatusText(land.status)}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg">{land.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {land.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          {land.location}
        </div>
        
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{land.size} m²</span>
        </div>
        
        {land.status === 'cultivated' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{land.progress}%</span>
            </div>
            <Progress value={land.progress} className="h-2" />
            {land.estimatedHarvest && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Récolte prévue: {new Date(land.estimatedHarvest).toLocaleDateString('fr-FR')}
              </div>
            )}
          </div>
        )}
        
        <Button
          variant="outline"
          onClick={() => onViewDetails(land)}
          className="w-full"
        >
          <Eye className="w-4 h-4 mr-2" />
          Voir les détails
        </Button>
      </CardContent>
    </Card>
  );
};

export default LandCard;