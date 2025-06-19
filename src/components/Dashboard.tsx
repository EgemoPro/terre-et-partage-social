
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Calendar, Sprout, Harvest, Eye } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setLands, setSelectedLand } from '@/store/slices/landsSlice';
import { Land } from '@/store/slices/landsSlice';
import AddLandModal from './AddLandModal';
import LandDetailModal from './LandDetailModal';

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { lands } = useAppSelector((state) => state.lands);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulation de données pour la démonstration
    const mockLands: Land[] = [
      {
        id: '1',
        title: 'Terrain de Provence',
        description: 'Belle parcelle ensoleillée parfaite pour les légumes méditerranéens',
        location: 'Aix-en-Provence, France',
        size: 500,
        images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
        status: 'cultivated',
        progress: 65,
        cultivator: 'Marie Cultivatrice',
        startDate: '2024-03-15',
        estimatedHarvest: '2024-07-15',
        ownerId: user?.id || '1'
      },
      {
        id: '2',
        title: 'Champ de Normandie',
        description: 'Terrain idéal pour les pommes de terre et légumes racines',
        location: 'Caen, France',
        size: 800,
        images: ['https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800'],
        status: 'available',
        progress: 0,
        ownerId: user?.id || '1'
      }
    ];
    dispatch(setLands(mockLands));
  }, [dispatch, user]);

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
      case 'harvest': return 'Récolte';
      default: return status;
    }
  };

  const handleViewLand = (land: Land) => {
    dispatch(setSelectedLand(land));
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bonjour, {user?.name} 👋
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez vos terres et suivez la progression de vos cultures
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="earth-gradient text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une terre
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terres totales</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lands.length}</div>
              <p className="text-xs text-muted-foreground">
                +1 ce mois-ci
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En culture</CardTitle>
              <Sprout className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lands.filter(land => land.status === 'cultivated').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Progression moyenne: 65%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prêtes à récolter</CardTitle>
              <Harvest className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lands.filter(land => land.status === 'harvest').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Dans les 2 prochaines semaines
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lands.map((land) => (
            <Card key={land.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                <Badge className={`absolute top-2 right-2 ${getStatusColor(land.status)}`}>
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
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {land.location}
                </div>
                
                <div className="text-sm text-gray-600">
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
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Récolte prévue: {new Date(land.estimatedHarvest).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => handleViewLand(land)}
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir les détails
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {lands.length === 0 && (
          <div className="text-center py-12">
            <Sprout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune terre ajoutée
            </h3>
            <p className="text-gray-600 mb-4">
              Commencez par ajouter votre première parcelle de terre.
            </p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="earth-gradient text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une terre
            </Button>
          </div>
        )}
      </div>

      <AddLandModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <LandDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default Dashboard;
