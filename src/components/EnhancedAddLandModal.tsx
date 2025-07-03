
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, X, Plus, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addLand } from '@/store/slices/landsSlice';
import InteractiveMap from './InteractiveMap';

interface EnhancedAddLandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MapLocation {
  lat: number;
  lng: number;
  address: string;
}

const EnhancedAddLandModal = ({ isOpen, onClose }: EnhancedAddLandModalProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | undefined>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    size: '',
    soilType: '',
    waterAccess: false,
    electricityAccess: false,
    toolStorage: false,
    fenced: false,
    sunExposure: '',
    slope: '',
    previousUse: '',
    organicCertified: false,
    accessDifficulty: '',
    images: [] as string[],
    documents: [] as string[],
    preferredCrops: [] as string[],
    restrictions: '',
    budget: '',
    timeline: ''
  });

  const soilTypes = [
    'Argileux', 'Sableux', 'Limoneux', 'Calcaire', 'Humifère', 'Mixte'
  ];

  const sunExposureOptions = [
    'Plein soleil (8h+)', 'Mi-ombre (4-8h)', 'Ombre (moins de 4h)'
  ];

  const slopeOptions = [
    'Plat', 'Légère pente', 'Pente modérée', 'Forte pente'
  ];

  const cropOptions = [
    'Légumes racines', 'Légumes feuilles', 'Tomates/Solanacées', 'Légumineuses',
    'Aromates', 'Fruits rouges', 'Céréales', 'Fleurs'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePreferredCrop = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      preferredCrops: prev.preferredCrops.includes(crop)
        ? prev.preferredCrops.filter(c => c !== crop)
        : [...prev.preferredCrops, crop]
    }));
  };

  const handleSubmit = () => {
    if (!selectedLocation || !formData.title || !formData.size) return;

    const newLand = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      location: selectedLocation.address,
      size: Number(formData.size),
      images: formData.images,
      status: 'available' as const,
      progress: 0,
      ownerId: user?.id || '1',
      // Nouvelles propriétés détaillées
      soilType: formData.soilType,
      waterAccess: formData.waterAccess,
      electricityAccess: formData.electricityAccess,
      toolStorage: formData.toolStorage,
      fenced: formData.fenced,
      sunExposure: formData.sunExposure,
      slope: formData.slope,
      previousUse: formData.previousUse,
      organicCertified: formData.organicCertified,
      preferredCrops: formData.preferredCrops,
      coordinates: { lat: selectedLocation.lat, lng: selectedLocation.lng }
    };

    dispatch(addLand(newLand));
    onClose();
    
    // Reset form
    setFormData({
      title: '', description: '', size: '', soilType: '', waterAccess: false,
      electricityAccess: false, toolStorage: false, fenced: false, sunExposure: '',
      slope: '', previousUse: '', organicCertified: false, accessDifficulty: '',
      images: [], documents: [], preferredCrops: [], restrictions: '', budget: '', timeline: ''
    });
    setSelectedLocation(undefined);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.title && formData.description && formData.size;
      case 2: return selectedLocation;
      case 3: return formData.soilType && formData.sunExposure;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle terre</DialogTitle>
          <DialogDescription>
            Étape {currentStep} sur 4 - Remplissez tous les détails de votre parcelle
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        <Tabs value={currentStep.toString()} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1">Informations</TabsTrigger>
            <TabsTrigger value="2">Localisation</TabsTrigger>
            <TabsTrigger value="3">Caractéristiques</TabsTrigger>
            <TabsTrigger value="4">Préférences</TabsTrigger>
          </TabsList>

          {/* Étape 1: Informations de base */}
          <TabsContent value="1" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Nom de la parcelle *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Terrain de Provence"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Décrivez votre terrain en détail..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="size">Superficie (m²) *</Label>
                  <Input
                    id="size"
                    type="number"
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    placeholder="500"
                  />
                </div>

                <div>
                  <Label htmlFor="previousUse">Usage précédent</Label>
                  <Input
                    id="previousUse"
                    value={formData.previousUse}
                    onChange={(e) => handleInputChange('previousUse', e.target.value)}
                    placeholder="Ex: Prairie, jardin, friche..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Étape 2: Localisation */}
          <TabsContent value="2">
            <InteractiveMap
              onLocationSelect={setSelectedLocation}
              selectedLocation={selectedLocation}
            />
          </TabsContent>

          {/* Étape 3: Caractéristiques du terrain */}
          <TabsContent value="3" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Caractéristiques du terrain</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Type de sol *</Label>
                    <Select value={formData.soilType} onValueChange={(value) => handleInputChange('soilType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type de sol" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Exposition au soleil *</Label>
                    <Select value={formData.sunExposure} onValueChange={(value) => handleInputChange('sunExposure', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Exposition solaire" />
                      </SelectTrigger>
                      <SelectContent>
                        {sunExposureOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Pente du terrain</Label>
                    <Select value={formData.slope} onValueChange={(value) => handleInputChange('slope', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type de pente" />
                      </SelectTrigger>
                      <SelectContent>
                        {slopeOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Équipements disponibles</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'waterAccess', label: 'Accès à l\'eau' },
                      { key: 'electricityAccess', label: 'Accès électricité' },
                      { key: 'toolStorage', label: 'Stockage outils' },
                      { key: 'fenced', label: 'Terrain clôturé' },
                      { key: 'organicCertified', label: 'Certifié bio' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.key}
                          checked={formData[item.key as keyof typeof formData] as boolean}
                          onCheckedChange={(checked) => handleInputChange(item.key, checked)}
                        />
                        <Label htmlFor={item.key} className="text-sm">{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Étape 4: Préférences */}
          <TabsContent value="4" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vos préférences de culture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Cultures souhaitées</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cropOptions.map(crop => (
                      <Badge
                        key={crop}
                        variant={formData.preferredCrops.includes(crop) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.preferredCrops.includes(crop) ? 'bg-green-500' : ''
                        }`}
                        onClick={() => togglePreferredCrop(crop)}
                      >
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline">Calendrier souhaité</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    placeholder="Ex: Démarrage au printemps 2024"
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Budget approximatif (€)</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="Ex: 500-1000"
                  />
                </div>

                <div>
                  <Label htmlFor="restrictions">Restrictions particulières</Label>
                  <Textarea
                    id="restrictions"
                    value={formData.restrictions}
                    onChange={(e) => handleInputChange('restrictions', e.target.value)}
                    placeholder="Mentionnez toute restriction ou exigence particulière..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Précédent
          </Button>
          
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="earth-gradient text-white"
              >
                Suivant
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="earth-gradient text-white"
              >
                Créer la parcelle
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedAddLandModal;
