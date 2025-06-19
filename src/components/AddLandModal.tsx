
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload, MapPin, Ruler } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addLand } from '@/store/slices/landsSlice';
import { Land } from '@/store/slices/landsSlice';

interface AddLandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddLandModal = ({ isOpen, onClose }: AddLandModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    size: '',
    images: [] as string[]
  });
  const [imageUrls, setImageUrls] = useState('');

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLand: Land = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      size: parseInt(formData.size),
      images: imageUrls.split('\n').filter(url => url.trim()),
      status: 'available',
      progress: 0,
      ownerId: user?.id || '1'
    };
    
    dispatch(addLand(newLand));
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      size: '',
      images: []
    });
    setImageUrls('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-2 top-2 z-10"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <CardHeader>
          <CardTitle className="text-2xl">Ajouter une nouvelle terre</CardTitle>
          <CardDescription>
            Partagez les détails de votre parcelle avec nos cultivateurs
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la parcelle</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Ex: Terrain ensoleillé en Provence"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Décrivez votre terrain, le type de sol, l'exposition..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Ville, Région"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size">Superficie (m²)</Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="size"
                    name="size"
                    type="number"
                    placeholder="500"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="images">Photos (URLs)</Label>
              <div className="relative">
                <Upload className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="images"
                  placeholder="Collez les URLs de vos photos, une par ligne&#10;https://exemple.com/photo1.jpg&#10;https://exemple.com/photo2.jpg"
                  value={imageUrls}
                  onChange={(e) => setImageUrls(e.target.value)}
                  className="pl-10"
                  rows={4}
                />
              </div>
              <p className="text-sm text-gray-500">
                Ajoutez des URLs d'images de votre terrain (une par ligne)
              </p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" className="flex-1 earth-gradient text-white">
                Ajouter la parcelle
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLandModal;
