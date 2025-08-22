import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Sprout } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setLands, setSelectedLand } from '@/store/slices/landsSlice';
import { Land } from '@/store/slices/landsSlice';
import EnhancedAddLandModal from './EnhancedAddLandModal';
import LandDetailModal from './LandDetailModal';
import MessagingSystem from './MessagingSystem';
import DashboardStats from './dashboard/DashboardStats';
import LandCard from './dashboard/LandCard';
import ActivityFeed from './dashboard/ActivityFeed';
import QuickActions from './dashboard/QuickActions';

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

  const stats = {
    totalLands: lands.length,
    availableLands: lands.filter(l => l.status === 'available').length,
    activeProjects: lands.filter(land => land.status === 'cultivated').length,
    avgProgress: lands.length > 0 ? lands.reduce((sum, land) => sum + land.progress, 0) / lands.length : 0,
    estimatedRevenue: lands.reduce((sum, land) => sum + (land.status === 'harvest' ? 150 : 0), 0),
    unreadMessages: 2
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Bonjour, {user?.name} 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Gérez vos terres et suivez la progression de vos cultures
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="earth-gradient"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une terre
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <DashboardStats stats={stats} />
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityFeed />
              <QuickActions 
                onAddLand={() => setShowAddModal(true)}
                onFindCultivator={() => setActiveTab('cultivators')}
                onOpenMessages={() => setActiveTab('messages')}
                onViewReports={() => setActiveTab('analytics')}
              />
            </div>
          </TabsContent>

          <TabsContent value="lands">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lands.map((land) => (
                <LandCard 
                  key={land.id} 
                  land={land} 
                  onViewDetails={handleViewLand}
                />
              ))}
            </div>

            {lands.length === 0 && (
              <div className="text-center py-12">
                <Sprout className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Aucune terre ajoutée
                </h3>
                <p className="text-muted-foreground mb-4">
                  Commencez par ajouter votre première parcelle de terre.
                </p>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="earth-gradient"
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
                          <span className="text-sm text-muted-foreground">{land.progress}%</span>
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
