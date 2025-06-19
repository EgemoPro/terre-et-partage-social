
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Calendar, Ruler, User, Sprout } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

interface LandDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LandDetailModal = ({ isOpen, onClose }: LandDetailModalProps) => {
  const { selectedLand } = useAppSelector((state) => state.lands);

  if (!isOpen || !selectedLand) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'cultivated': return 'bg-blue-100 text-blue-800';
      case 'harvest': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'cultivated': return 'En culture';
      case 'harvest': return 'Prête à récolter';
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-2 top-2 z-10"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{selectedLand.title}</CardTitle>
              <CardDescription className="mt-2">
                {selectedLand.description}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(selectedLand.status)}>
              {getStatusText(selectedLand.status)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Images Gallery */}
          {selectedLand.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Photos du terrain</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedLand.images.map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${selectedLand.title} - Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Land Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations du terrain</h3>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{selectedLand.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Ruler className="w-4 h-4" />
                <span>{selectedLand.size} m²</span>
              </div>
            </div>

            {/* Cultivation Info */}
            {selectedLand.status !== 'available' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informations de culture</h3>
                
                {selectedLand.cultivator && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>Cultivateur: {selectedLand.cultivator}</span>
                  </div>
                )}
                
                {selectedLand.startDate && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Début: {new Date(selectedLand.startDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
                
                {selectedLand.estimatedHarvest && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Récolte prévue: {new Date(selectedLand.estimatedHarvest).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress */}
          {selectedLand.status === 'cultivated' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Progression de la culture</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avancement</span>
                  <span>{selectedLand.progress}%</span>
                </div>
                <Progress value={selectedLand.progress} className="h-3" />
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <Sprout className="w-4 h-4" />
                  <span className="font-medium">Dernière mise à jour</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Les légumes poussent bien ! Arrosage régulier et désherbage effectués cette semaine.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fermer
            </Button>
            {selectedLand.status === 'available' && (
              <Button className="flex-1 earth-gradient text-white">
                Proposer aux cultivateurs
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandDetailModal;
