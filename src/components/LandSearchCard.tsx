
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Droplets, Sprout, Heart, MessageCircle, Calendar } from 'lucide-react';
import { PublicLand } from '@/store/slices/publicLandsSlice';

interface LandSearchCardProps {
  land: PublicLand;
}

const LandSearchCard = ({ land }: LandSearchCardProps) => {
  const handleContact = () => {
    console.log('Contacter le propriétaire:', land.owner.name);
  };

  const handleSaveFavorite = () => {
    console.log('Ajouter aux favoris:', land.title);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        {land.images.length > 0 ? (
          <img
            src={land.images[0]}
            alt={land.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-100">
            <Sprout className="w-12 h-12 text-green-500" />
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleSaveFavorite}
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{land.title}</CardTitle>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {land.location}
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={land.owner.avatar} />
              <AvatarFallback>
                {land.owner.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{land.owner.name}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {land.description}
        </CardDescription>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{land.size} m²</Badge>
          <Badge variant="outline">{land.soilType}</Badge>
          {land.waterAccess && (
            <Badge variant="outline" className="text-blue-600">
              <Droplets className="w-3 h-3 mr-1" />
              Eau
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Cultures préférées:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {land.preferredCrops.slice(0, 3).map((crop, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {crop}
                </Badge>
              ))}
              {land.preferredCrops.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{land.preferredCrops.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            Disponible dès le {new Date(land.availableFrom).toLocaleDateString('fr-FR')}
          </div>

          {(land.rentPrice || land.sharePercentage) && (
            <div className="text-sm font-medium text-green-600">
              {land.rentPrice ? `${land.rentPrice}€/mois` : `${land.sharePercentage}% de partage`}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button
            onClick={handleContact}
            className="flex-1 earth-gradient text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contacter
          </Button>
          <Button variant="outline" className="flex-1">
            Voir détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandSearchCard;
