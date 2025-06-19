
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Users, MapPin, TrendingUp, Heart, Shield } from 'lucide-react';

interface HomePageProps {
  onAuthClick: () => void;
}

const HomePage = ({ onAuthClick }: HomePageProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Partagez vos terres,
                <br />
                <span className="text-green-600">cultivez l'avenir</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Connectez-vous avec des cultivateurs passionnés qui transformeront vos terres en potagers productifs. 
                Suivez l'évolution de vos parcelles en temps réel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onAuthClick}
                  size="lg" 
                  className="earth-gradient text-white text-lg px-8 py-3"
                >
                  <Sprout className="w-5 h-5 mr-2" />
                  Commencer maintenant
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Découvrir comment ça marche
                </Button>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mt-16 animate-fade-in">
            <div className="aspect-video bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop"
                alt="Terres cultivées"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trois étapes simples pour transformer vos terres en potagers productifs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">1. Partagez votre terrain</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Créez votre profil et ajoutez les détails de vos parcelles : localisation, 
                  superficie, photos et caractéristiques du sol.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">2. Trouvez un cultivateur</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Nos cultivateurs expérimentés examinent vos terres et vous proposent 
                  un plan de culture adapté à votre terrain.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">3. Suivez les progrès</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Recevez des mises à jour régulières avec photos et suivez l'évolution 
                  de vos cultures depuis votre tableau de bord.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pourquoi choisir Terre & Partage ?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Agriculture durable</h3>
                    <p className="text-gray-600">
                      Nos cultivateurs utilisent des méthodes respectueuses de l'environnement 
                      pour préserver la qualité de vos sols.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sécurisé et transparent</h3>
                    <p className="text-gray-600">
                      Contrats clairs, assurance incluse et transparence totale sur 
                      toutes les opérations effectuées sur vos terres.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Revenus passifs</h3>
                    <p className="text-gray-600">
                      Générez des revenus de vos terres inutilisées tout en contribuant 
                      à l'agriculture locale et responsable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-green-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=600&fit=crop"
                  alt="Cultivation en cours"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-xl shadow-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">Satisfaction propriétaires</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à valoriser vos terres ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez déjà plus de 500 propriétaires qui font confiance à nos cultivateurs.
          </p>
          <Button 
            onClick={onAuthClick}
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Créer mon compte gratuitement
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
