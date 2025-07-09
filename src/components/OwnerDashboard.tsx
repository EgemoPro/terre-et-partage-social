import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MapPin, Calendar, Sprout, ShoppingBasket, Eye, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setLands, setSelectedLand } from '@/store/slices/landsSlice';
import { Land } from '@/store/slices/landsSlice';
import EnhancedAddLandModal from './EnhancedAddLandModal';
import LandDetailModal from './LandDetailModal';
import MessagingSystem from './MessagingSystem';

const OwnerDashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
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

  const totalRevenue = lands.reduce((sum, land) => sum + (land.status === 'harvest' ? 150 : 0), 0);
  const activeProjects = lands.filter(land => land.status === 'cultivated').length;
  const avgProgress = lands.length > 0 ? 
    lands.reduce((sum, land) => sum + land.progress, 0) / lands.length : 0;

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

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terres totales</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lands.length}</div>
              <p className="text-xs text-muted-foreground">
                {lands.filter(l => l.status === 'available').length} disponibles
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projets actifs</CardTitle>
              <Sprout className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects}</div>
              <p className="text-xs text-muted-foreground">
                Progression moyenne: {Math.round(avgProgress)}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus estimés</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue}€</div>
              <p className="text-xs text-muted-foreground">
                Ce trimestre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 non lus
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="lands">Mes terres</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nouvelle proposition reçue</p>
                      <p className="text-xs text-gray-500">Marie Cultivatrice - Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mise à jour de culture</p>
                      <p className="text-xs text-gray-500">Terrain de Provence - Il y a 1 jour</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Récolte planifiée</p>
                      <p className="text-xs text-gray-500">Dans 2 semaines</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="w-6 h-6 mb-2" />
                    <span className="text-sm">Nouvelle terre</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    <span className="text-sm">Trouver cultivateur</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    <span className="text-sm">Messages</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    <span className="text-sm">Rapports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lands">
            {/* Existing Lands Grid */}
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
          </TabsContent>

          <TabsContent value="messages">
            <MessagingSystem />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance des parcelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lands.map(land => (
                      <div key={land.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{land.title}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={land.progress} className="w-20 h-2" />
                          <span className="text-sm text-gray-600">{land.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenus par mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Janvier</span>
                      <span>120€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Février</span>
                      <span>80€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mars</span>
                      <span>200€</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <EnhancedAddLandModal
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

export default OwnerDashboard;
