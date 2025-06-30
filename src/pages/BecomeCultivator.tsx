
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, Check, Mail } from 'lucide-react';

const BecomeCultivator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1 : Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Étape 2 : Expérience professionnelle
    experience: '',
    specialties: '',
    certifications: '',
    previousWork: '',
    
    // Étape 3 : Disponibilité et zone
    availability: '',
    workingZone: '',
    transport: '',
    teamSize: '',
    
    // Étape 4 : Motivation et références
    motivation: '',
    references: '',
    additionalInfo: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Formulaire soumis:', formData);
    setCurrentStep(5); // Étape de confirmation
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Votre nom"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email professionnel *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="votre.email@exemple.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="experience">Années d'expérience en agriculture *</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
                placeholder="Ex: 5 ans"
              />
            </div>
            <div>
              <Label htmlFor="specialties">Spécialités agricoles *</Label>
              <Textarea
                id="specialties"
                value={formData.specialties}
                onChange={(e) => updateFormData('specialties', e.target.value)}
                placeholder="Ex: Maraîchage bio, permaculture, cultures céréalières..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="certifications">Certifications et diplômes</Label>
              <Textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => updateFormData('certifications', e.target.value)}
                placeholder="Ex: Certificat bio, BPREA, formations spécialisées..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="previousWork">Expériences précédentes significatives</Label>
              <Textarea
                id="previousWork"
                value={formData.previousWork}
                onChange={(e) => updateFormData('previousWork', e.target.value)}
                placeholder="Décrivez vos expériences les plus marquantes..."
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="availability">Disponibilité *</Label>
              <Textarea
                id="availability"
                value={formData.availability}
                onChange={(e) => updateFormData('availability', e.target.value)}
                placeholder="Ex: Temps plein, temps partiel, saisonnier, jours disponibles..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="workingZone">Zone géographique de travail *</Label>
              <Input
                id="workingZone"
                value={formData.workingZone}
                onChange={(e) => updateFormData('workingZone', e.target.value)}
                placeholder="Ex: Région parisienne, rayon de 50km autour de Lyon..."
              />
            </div>
            <div>
              <Label htmlFor="transport">Moyens de transport *</Label>
              <Input
                id="transport"
                value={formData.transport}
                onChange={(e) => updateFormData('transport', e.target.value)}
                placeholder="Ex: Véhicule personnel, utilitaire, camion..."
              />
            </div>
            <div>
              <Label htmlFor="teamSize">Taille de votre équipe</Label>
              <Input
                id="teamSize"
                value={formData.teamSize}
                onChange={(e) => updateFormData('teamSize', e.target.value)}
                placeholder="Ex: Travail seul, équipe de 3 personnes..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="motivation">Pourquoi souhaitez-vous rejoindre Terre & Partage ? *</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => updateFormData('motivation', e.target.value)}
                placeholder="Expliquez votre motivation et ce que vous pourriez apporter à notre communauté..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="references">Références professionnelles</Label>
              <Textarea
                id="references"
                value={formData.references}
                onChange={(e) => updateFormData('references', e.target.value)}
                placeholder="Noms et contacts de personnes pouvant témoigner de votre travail..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="additionalInfo">Informations complémentaires</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                placeholder="Toute information que vous jugez utile de partager..."
                rows={3}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Candidature envoyée avec succès !
              </h3>
              <p className="text-gray-600 mb-4">
                Merci pour votre intérêt à rejoindre notre équipe de cultivateurs partenaires.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-blue-800">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">
                    Vous recevrez une réponse par votre adresse email sous 48-72 heures
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Informations personnelles";
      case 2: return "Expérience professionnelle";
      case 3: return "Disponibilité et zone d'intervention";
      case 4: return "Motivation et références";
      case 5: return "Candidature envoyée";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Devenir cultivateur partenaire
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre réseau de cultivateurs passionnés et contribuez à valoriser 
            les terres en friche tout en développant votre activité.
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep <= 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${step !== 4 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {step !== 4 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        currentStep > step ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-500">
                Étape {currentStep} sur 4 - {getStepTitle()}
              </span>
            </div>
          </div>
        )}

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              {getStepTitle()}
            </CardTitle>
            {currentStep <= 4 && (
              <CardDescription>
                {currentStep === 1 && "Commençons par vos informations de contact."}
                {currentStep === 2 && "Partagez votre expérience et vos compétences agricoles."}
                {currentStep === 3 && "Précisez votre disponibilité et votre zone d'intervention."}
                {currentStep === 4 && "Dernière étape : parlez-nous de votre motivation."}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            {currentStep <= 4 && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="earth-gradient text-white flex items-center space-x-2"
                  >
                    <span>Suivant</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="earth-gradient text-white"
                  >
                    Envoyer ma candidature
                  </Button>
                )}
              </div>
            )}

            {currentStep === 5 && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => window.location.href = '/'}
                  className="earth-gradient text-white"
                >
                  Retour à l'accueil
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info */}
        {currentStep <= 4 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              * Champs obligatoires. Vos données sont traitées de manière confidentielle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BecomeCultivator;
