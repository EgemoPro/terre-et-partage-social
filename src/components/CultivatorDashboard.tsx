import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, Droplets, Tractor, Heart, MessageCircle, TrendingUp, Sprout } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setPublicLands, setSearchFilters } from '@/store/slices/publicLandsSlice';
import { PublicLand } from '@/store/slices/publicLandsSlice';
import { setSentProposals, setReceivedProposals } from '@/store/slices/proposalsSlice';
import LandSearchCard from './LandSearchCard';
import CultivatorStats from './CultivatorStats';
import ProposalCard from './ProposalCard';

const CultivatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('search');
  const { lands, searchFilters } = useAppSelector((state) => state.publicLands);
  const { sentProposals, receivedProposals } = useAppSelector((state) => state.proposals);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulation de données pour la démonstration
    const mockPublicLands: PublicLand[] = [
      {
        id: '1',
        title: 'Terrain Bio Provence',
        description: 'Belle parcelle certifiée bio, idéale pour légumes méditerranéens. Sol argileux bien drainé.',
        location: 'Aix-en-Provence, France',
        size: 800,
        images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
        owner: {
          id: 'owner1',
          name: 'Marie Dubois',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
        },
        soilType: 'Argileux',
        waterAccess: true,
        equipmentAvailable: [true, true],
        preferredCrops: ['Tomates', 'Courgettes', 'Aubergines'],
        availableFrom: '2024-03-15',
        sharePercentage: 30
      },
      {
        id: '2',
        title: 'Grande Parcelle Normandie',
        description: 'Terrain de 1200m² avec accès à l\'eau, parfait pour cultures maraîchères diversifiées.',
        location: 'Caen, France',
        size: 1200,
        images: ['https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800'],
        owner: {
          id: 'owner2',
          name: 'Jean Martin'
        },
        soilType: 'Limoneux',
        waterAccess: true,
        equipmentAvailable: [false],
        preferredCrops: ['Pommes de terre', 'Carottes', 'Poireaux'],
        availableFrom: '2024-04-01',
        rentPrice: 200
      },
      {
        id: '3',
        title: 'Terrain Urbain Lyon',
        description: 'Petite parcelle en ville, parfaite pour jardinage urbain et cultures intensives.',
        location: 'Lyon, France',
        size: 300,
        images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'],
        owner: {
          id: 'owner3',
          name: 'Sophie Leroy'
        },
        soilType: 'Sableux',
        waterAccess: false,
        equipmentAvailable: [],
        preferredCrops: ['Radis', 'Laitues', 'Herbes aromatiques'],
        availableFrom: '2024-03-20',
        sharePercentage: 50
      }
    ];
    dispatch(setPublicLands(mockPublicLands));

    // Mock proposals data
    const mockSentProposals = [
      {
        id: '1',
        fromUserId: user?.id || '1',
        toUserId: 'owner1',
        landId: '1',
        type: 'cultivation_request' as const,
        status: 'pending' as const,
        message: 'Bonjour, je suis très intéressé par votre terrain bio. J\'ai 5 ans d\'expérience en jardinage...',
        proposedTerms: {
          sharePercentage: 30,
          duration: '1 an',
          startDate: '2024-04-01'
        },
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      }
    ];

    dispatch(setSentProposals(mockSentProposals));
    dispatch(setReceivedProposals([]));
  }, [dispatch, user?.id]);

  const handleSearch = (query: string) => {
    dispatch(setSearchFilters({ location: query }));
  };

  const filteredLands = lands.filter(land => {
    if (searchFilters.location && !land.location.toLowerCase().includes(searchFilters.location.toLowerCase())) {
      return false;
    }
    if (land.size < searchFilters.minSize || land.size > searchFilters.maxSize) {
      return false;
    }
    if (searchFilters.soilType && land.soilType !== searchFilters.soilType) {
      return false;
    }
    if (searchFilters.waterAccess !== null && land.waterAccess !== searchFilters.waterAccess) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.name} 🌱
          </h1>
          <p className="text-gray-600 mt-2">
            Trouvez les meilleures terres à cultiver près de chez vous
          </p>
        </div>

        <CultivatorStats />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="search">Recherche de terres</TabsTrigger>
            <TabsTrigger value="projects">Mes projets</TabsTrigger>
            <TabsTrigger value="proposals">
              Mes propositions
              {sentProposals.length > 0 && (
                <Badge className="ml-2 bg-blue-500 text-white text-xs">
                  {sentProposals.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher des terres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Input
                      placeholder="Localisation..."
                      value={searchFilters.location}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Select 
                      value={searchFilters.soilType} 
                      onValueChange={(value) => dispatch(setSearchFilters({ soilType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type de sol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous types</SelectItem>
                        <SelectItem value="Argileux">Argileux</SelectItem>
                        <SelectItem value="Limoneux">Limoneux</SelectItem>
                        <SelectItem value="Sableux">Sableux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select 
                      value={searchFilters.waterAccess === null ? "all" : searchFilters.waterAccess.toString()}
                      onValueChange={(value) => dispatch(setSearchFilters({ 
                        waterAccess: value === "all" ? null : value === "true" 
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Accès à l'eau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Peu importe</SelectItem>
                        <SelectItem value="true">Avec eau</SelectItem>
                        <SelectItem value="false">Sans eau</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Taille min (m²)"
                      value={searchFilters.minSize || ''}
                      onChange={(e) => dispatch(setSearchFilters({ minSize: Number(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLands.map((land) => (
                <LandSearchCard key={land.id} land={land} />
              ))}
            </div>

            {filteredLands.length === 0 && (
              <div className="text-center py-12">
                <Sprout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune terre trouvée
                </h3>
                <p className="text-gray-600">
                  Modifiez vos critères de recherche pour voir plus de résultats.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projets en cours</CardTitle>
                <CardDescription>Suivez vos cultures actuelles</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Aucun projet en cours pour le moment.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sent Proposals */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Propositions envoyées
                    </CardTitle>
                    <CardDescription>
                      Propositions que vous avez envoyées aux propriétaires
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {sentProposals.length > 0 ? (
                      <div className="space-y-4">
                        {sentProposals.map((proposal) => (
                          <ProposalCard 
                            key={proposal.id} 
                            proposal={proposal} 
                            isReceived={false}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">Aucune proposition envoyée pour le moment.</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Received Proposals (for cultivators who might also be owners) */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Propositions reçues
                    </CardTitle>
                    <CardDescription>
                      Demandes de collaboration reçues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {receivedProposals.length > 0 ? (
                      <div className="space-y-4">
                        {receivedProposals.map((proposal) => (
                          <ProposalCard 
                            key={proposal.id} 
                            proposal={proposal} 
                            isReceived={true}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">Aucune proposition reçue pour le moment.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communications avec les propriétaires</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Aucun message pour le moment.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CultivatorDashboard;
