
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, Award } from 'lucide-react';
import Header from '@/components/Header';

const Cultivators = () => {
  const cultivators = [
    {
      id: '1',
      name: 'Marie Cultivatrice',
      specialties: ['Légumes bio', 'Permaculture', 'Maraîchage'],
      experience: '8 ans',
      location: 'Provence-Alpes-Côte d\'Azur',
      rating: 4.9,
      totalLands: 15,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Marie',
      description: 'Spécialiste en agriculture biologique avec une expertise en permaculture. Passionnée par la culture de légumes anciens et la préservation des variétés locales.',
      achievements: ['Certification Bio', 'Formation Permaculture', 'Prix du Jeune Agriculteur 2020']
    },
    {
      id: '2',
      name: 'Jean Verdoyant',
      specialties: ['Céréales anciennes', 'Agriculture durable', 'Rotation des cultures'],
      experience: '12 ans',
      location: 'Normandie',
      rating: 4.8,
      totalLands: 22,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Jean',
      description: 'Expert en céréales anciennes et techniques de rotation. Spécialisé dans la remise en état de terres laissées en friche depuis plusieurs années.',
      achievements: ['Master Agriculture Durable', 'Certification HVE', 'Médaille du Mérite Agricole']
    },
    {
      id: '3',
      name: 'Sophie Terraverde',
      specialties: ['Fruits et légumes', 'Agriculture urbaine', 'Hydroponie'],
      experience: '6 ans',
      location: 'Île-de-France',
      rating: 4.7,
      totalLands: 18,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sophie',
      description: 'Innovatrice en agriculture urbaine et techniques modernes. Experte en optimisation de rendement sur petites surfaces et cultures hors-sol.',
      achievements: ['Diplôme Ingénieur Agronome', 'Innovation Award 2021', 'Certification Hydroponie']
    },
    {
      id: '4',
      name: 'Pierre Naturel',
      specialties: ['Vignoble', 'Arboriculture', 'Agriculture biodynamique'],
      experience: '15 ans',
      location: 'Bourgogne',
      rating: 5.0,
      totalLands: 8,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Pierre',
      description: 'Maître viticulteur et arboriculteur avec une approche biodynamique. Spécialiste de la culture de la vigne et des arbres fruitiers anciens.',
      achievements: ['Maître Sommelier', 'Certification Demeter', 'Grand Prix du Vin Bio 2019']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onAuthClick={() => {}} onDashboardClick={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Cultivateurs Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre équipe de cultivateurs passionnés et expérimentés, 
            prêts à transformer vos terres en jardins productifs.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <p className="text-gray-600">Cultivateurs actifs</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <p className="text-gray-600">Terres cultivées</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
              <p className="text-gray-600">Note moyenne</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <p className="text-gray-600">Satisfaction client</p>
            </CardContent>
          </Card>
        </div>

        {/* Cultivators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cultivators.map((cultivator) => (
            <Card key={cultivator.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={cultivator.avatar}
                      alt={cultivator.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-xl">{cultivator.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">{cultivator.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{cultivator.totalLands} terres</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {cultivator.experience}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {cultivator.location}
                </div>
                
                <CardDescription className="text-base">
                  {cultivator.description}
                </CardDescription>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Spécialités :</h4>
                  <div className="flex flex-wrap gap-2">
                    {cultivator.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Certifications :</h4>
                  <div className="space-y-1">
                    {cultivator.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Award className="w-3 h-3 mr-2 text-green-600" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full earth-gradient text-white">
                  Contacter {cultivator.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-green-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Vous êtes cultivateur ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez notre communauté et aidez à valoriser les terres inutilisées.
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            Devenir cultivateur partenaire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cultivators;
