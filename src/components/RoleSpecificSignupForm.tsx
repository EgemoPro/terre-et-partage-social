
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/store/slices/authSlice';
import { MapPin, User, Phone, Mail } from 'lucide-react';

interface RoleSpecificSignupFormProps {
  role: UserRole;
  formData: any;
  setFormData: (data: any) => void;
}

const RoleSpecificSignupForm = ({ role, formData, setFormData }: RoleSpecificSignupFormProps) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const values = value.split(',').map(v => v.trim()).filter(v => v);
    setFormData((prev: any) => ({
      ...prev,
      [field]: values
    }));
  };

  if (role === 'owner') {
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <Badge className="bg-green-100 text-green-800">
            Inscription Propriétaire
          </Badge>
          <p className="text-sm text-gray-600 mt-2">
            Renseignez vos informations pour proposer vos terres
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Localisation</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              placeholder="Ville, région..."
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              placeholder="+33 6 12 34 56 78"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="landTypes">Types de terres disponibles</Label>
          <Input
            id="landTypes"
            placeholder="Jardin, champ, verger... (séparés par des virgules)"
            value={formData.landTypes?.join(', ') || ''}
            onChange={(e) => handleArrayChange('landTypes', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Expérience en agriculture</Label>
          <Select
            value={formData.experience || ''}
            onValueChange={(value) => handleInputChange('experience', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="debutant">Débutant</SelectItem>
              <SelectItem value="intermediaire">Intermédiaire</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
              <SelectItem value="professionnel">Professionnel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Présentation</Label>
          <Textarea
            id="bio"
            placeholder="Parlez-nous de vos terres et de vos attentes..."
            value={formData.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={3}
          />
        </div>
      </div>
    );
  }

  // Cultivator form
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Badge className="bg-blue-100 text-blue-800">
          Inscription Cultivateur
        </Badge>
        <p className="text-sm text-gray-600 mt-2">
          Renseignez vos informations pour trouver des terres à cultiver
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Zone de recherche</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="location"
            placeholder="Ville, région où vous cherchez..."
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phone"
            placeholder="+33 6 12 34 56 78"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredCrops">Cultures souhaitées</Label>
        <Input
          id="preferredCrops"
          placeholder="Tomates, carottes, salades... (séparés par des virgules)"
          value={formData.preferredCrops?.join(', ') || ''}
          onChange={(e) => handleArrayChange('preferredCrops', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Expérience en jardinage</Label>
        <Select
          value={formData.experience || ''}
          onValueChange={(value) => handleInputChange('experience', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez votre niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="debutant">Débutant</SelectItem>
            <SelectItem value="amateur">Amateur</SelectItem>
            <SelectItem value="confirme">Confirmé</SelectItem>
            <SelectItem value="professionnel">Professionnel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">Disponibilité</Label>
        <Select
          value={formData.availability || ''}
          onValueChange={(value) => handleInputChange('availability', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Combien de temps pouvez-vous consacrer ?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekend">Week-ends uniquement</SelectItem>
            <SelectItem value="partiel">Temps partiel</SelectItem>
            <SelectItem value="complet">Temps complet</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Présentation</Label>
        <Textarea
          id="bio"
          placeholder="Parlez-nous de votre passion pour le jardinage..."
          value={formData.bio || ''}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};

export default RoleSpecificSignupForm;
