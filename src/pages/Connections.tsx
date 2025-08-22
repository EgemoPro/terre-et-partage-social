import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Star, MapPin, User, Calendar, CheckCircle } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

interface CultivatorProfile {
  id: string;
  name: string;
  experience: number;
  specialties: string[];
  location: string;
  rating: number;
  completedProjects: number;
  description: string;
  avatar: string;
  preferredCrops: string[];
  methods: string[];
}

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  const mockCultivators: CultivatorProfile[] = [
    {
      id: '1',
      name: 'Marie Dubois',
      experience: 8,
      specialties: ['Légumes bio', 'Permaculture', 'Maraîchage'],
      location: 'Provence-Alpes-Côte d\'Azur',
      rating: 4.9,
      completedProjects: 23,
      description: 'Spécialiste en agriculture biologique avec une approche permaculturelle. Passionnée par la culture de légumes méditerranéens.',
      avatar: 'MD',
      preferredCrops: ['Tomates', 'Courgettes', 'Aubergines', 'Basilic'],
      methods: ['Agriculture biologique', 'Permaculture', 'Rotation des cultures']
    },
    {
      id: '2',
      name: 'Pierre Martin',
      experience: 12,
      specialties: ['Céréales', 'Légumineuses', 'Agriculture durable'],
      location: 'Normandie',
      rating: 4.7,
      completedProjects: 45,
      description: 'Expert en agriculture durable avec une spécialisation dans les céréales anciennes et les légumineuses.',
      avatar: 'PM',
      preferredCrops: ['Blé ancien', 'Lentilles', 'Pois chiches', 'Avoine'],
      methods: ['Agriculture durable', 'Semis direct', 'Agroforesterie']
    },
    {
      id: '3',
      name: 'Sophie Leroy',
      experience: 6,
      specialties: ['Plantes aromatiques', 'Jardinage urbain', 'Micro-cultures'],
      location: 'Île-de-France',
      rating: 4.8,
      completedProjects: 18,
      description: 'Spécialisée dans la culture de plantes aromatiques et le jardinage en espaces restreints.',
      avatar: 'SL',
      preferredCrops: ['Herbes aromatiques', 'Radis', 'Épinards', 'Roquette'],
      methods: ['Culture intensive', 'Hydroponie', 'Jardinage vertical']
    }
  ];

  const [cultivators] = useState(mockCultivators);
  const [selectedCultivator, setSelectedCultivator] = useState<string | null>(null);

  const filteredCultivators = cultivators.filter(cultivator => {
    const matchesSearch = cultivator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cultivator.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === 'all' || cultivator.location.includes(locationFilter);
    const matchesSpecialty = specialtyFilter === 'all' || cultivator.specialties.includes(specialtyFilter);
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const handleContactCultivator = (cultivatorId: string) => {
    // Ici on redirigerait vers le système de messagerie
    console.log('Contacter le cultivateur:', cultivatorId);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trouvez votre cultivateur partenaire
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez des cultivateurs expérimentés près de chez vous et démarrez votre projet agricole
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Filtres de recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Rechercher par nom ou spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cultivators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCultivators.map((cultivator) => (
            <Card key={cultivator.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xl font-bold">
                      {cultivator.avatar}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{cultivator.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{cultivator.rating}</span>
                      <span className="text-muted-foreground">({cultivator.completedProjects} projets)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {cultivator.location}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {cultivator.experience} ans d'expérience
                </div>
                
                <CardDescription>{cultivator.description}</CardDescription>
                
                <div>
                  <h4 className="font-medium mb-2">Spécialités</h4>
                  <div className="flex flex-wrap gap-2">
                    {cultivator.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 space-y-2">
                  <Button
                    onClick={() => handleContactCultivator(cultivator.id)}
                    className="w-full earth-gradient"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCultivator(cultivator.id)}
                    className="w-full"
                  >
                    Voir le profil complet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCultivators.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Aucun cultivateur trouvé
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Connections;
