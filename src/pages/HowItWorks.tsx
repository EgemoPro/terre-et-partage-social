
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Sprout, TrendingUp, MessageSquare, Shield } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const HowItWorks = () => {
  const steps = [
    {
      icon: MapPin,
      title: "Partagez vos terres",
      description: "Créez votre profil et ajoutez les détails de vos parcelles : localisation, superficie, photos et caractéristiques du sol.",
      details: [
        "Créez un compte gratuitement",
        "Ajoutez vos parcelles avec photos",
        "Décrivez le type de sol et l'exposition",
        "Indiquez la superficie disponible"
      ]
    },
    {
      icon: Users,
      title: "Trouvez un cultivateur",
      description: "Nos cultivateurs expérimentés examinent vos terres et vous proposent un plan de culture adapté.",
      details: [
        "Évaluation gratuite de vos terres",
        "Proposition de plan de culture",
        "Signature du contrat de partenariat",
        "Démarrage des travaux de préparation"
      ]
    },
    {
      icon: TrendingUp,
      title: "Suivez les progrès",
      description: "Recevez des mises à jour régulières avec photos et suivez l'évolution depuis votre tableau de bord.",
      details: [
        "Mises à jour hebdomadaires avec photos",
        "Suivi de la croissance en temps réel",
        "Notifications importantes",
        "Planification de la récolte"
      ]
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre processus simple en trois étapes pour transformer vos terres 
            inutilisées en potagers productifs et durables.
          </p>
        </div>

        {/* Steps Section */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                    {index + 1}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                
                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex-1 max-w-md">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-primary/5 flex items-center justify-center">
                    <step.icon className="w-16 h-16 text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle>Étape {index + 1}</CardTitle>
                    <CardDescription>{step.title}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-muted/50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Pourquoi nous faire confiance ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Notre approche garantit des résultats durables pour tous
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Agriculture Durable</h3>
              <p className="text-muted-foreground">
                Méthodes respectueuses de l'environnement et préservation des sols
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparence Totale</h3>
              <p className="text-muted-foreground">
                Suivi en temps réel et rapports détaillés de toutes les activités
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Revenus Assurés</h3>
              <p className="text-muted-foreground">
                Contrats clairs et rémunération garantie pour vos terres
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HowItWorks;
