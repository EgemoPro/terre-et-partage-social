
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Droplets, Calendar, Euro, Percent, Send, Heart } from 'lucide-react';
import { PublicLand } from '@/store/slices/publicLandsSlice';
import { useAppSelector } from '@/store/hooks';
import SendProposalModal from './SendProposalModal';

interface LandSearchCardProps {
  land: PublicLand;
}

const LandSearchCard = ({ land }: LandSearchCardProps) => {
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 group">
        <div className="relative">
          <img 
            src={land.images[0]} 
            alt={land.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`absolute top-2 right-2 ${
              isLiked ? 'text-red-500' : 'text-white hover:text-red-500'
            } bg-black/20 hover:bg-black/40`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                {land.title}
              </CardTitle>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {land.location}
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {land.size}m²
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription className="text-sm leading-relaxed">
            {land.description}
          </CardDescription>

          {/* Owner info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="w-8 h-8">
              <AvatarContent src={land.owner.avatar} />
              <AvatarFallback>
                {land.owner.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{land.owner.name}</p>
              <p className="text-xs text-gray-600">Propriétaire</p>
            </div>
          </div>

          {/* Property details */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${land.waterAccess ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <span className={land.waterAccess ? 'text-blue-600' : 'text-gray-500'}>
                {land.waterAccess ? 'Eau disponible' : 'Pas d\'eau'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Badge variant="outline" className="text-xs">
                {land.soilType}
              </Badge>
            </div>
          </div>

          {/* Preferred crops */}
          {land.preferredCrops.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Cultures suggérées :</p>
              <div className="flex flex-wrap gap-1">
                {land.preferredCrops.slice(0, 3).map((crop, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                    {crop}
                  </Badge>
                ))}
                {land.preferredCrops.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{land.preferredCrops.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Terms */}
          <div className="flex items-center justify-between text-sm border-t pt-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Dès le {formatDate(land.availableFrom)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {land.sharePercentage && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Percent className="w-4 h-4" />
                  <span className="font-medium">{land.sharePercentage}%</span>
                </div>
              )}
              {land.rentPrice && (
                <div className="flex items-center space-x-1 text-blue-600">
                  <Euro className="w-4 h-4" />
                  <span className="font-medium">{land.rentPrice}€/mois</span>
                </div>
              )}
            </div>
          </div>

          {/* Action button */}
          {user?.role === 'cultivator' && (
            <Button 
              onClick={() => setShowProposalModal(true)}
              className="w-full earth-gradient text-white group-hover:shadow-md transition-shadow"
            >
              <Send className="w-4 h-4 mr-2" />
              Faire une proposition
            </Button>
          )}
        </CardContent>
      </Card>

      <SendProposalModal
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        land={land}
      />
    </>
  );
};

export default LandSearchCard;
