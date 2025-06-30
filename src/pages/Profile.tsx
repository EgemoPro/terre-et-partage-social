
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import Header from '@/components/Header';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+33 6 12 34 56 78',
    location: 'Aix-en-Provence, France',
    bio: 'Propriétaire de terres familiales en Provence, passionné par l\'agriculture durable et locale.',
    joinDate: '2024-01-15'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    // Ici, on sauvegarderait les données via l'API
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Restaurer les données originales
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+33 6 12 34 56 78',
      location: 'Aix-en-Provence, France',
      bio: 'Propriétaire de terres familiales en Provence, passionné par l\'agriculture durable et locale.',
      joinDate: '2024-01-15'
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Terres ajoutées', value: '2' },
    { label: 'En culture', value: '1' },
    { label: 'Récoltes réussies', value: '3' },
    { label: 'Note moyenne', value: '4.8' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onAuthClick={() => {}} onDashboardClick={() => {}} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-2xl">{formData.name}</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Propriétaire depuis {new Date(formData.joinDate).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </CardDescription>
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    Membre vérifié
                  </Badge>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="earth-gradient text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Gérez vos informations de profil et préférences de contact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {formData.name}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {formData.email}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {formData.phone}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {formData.location}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">À propos</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">
                      {formData.bio}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Terre ajoutée</p>
                      <p className="text-xs text-gray-500">Il y a 2 jours</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Mise à jour reçue</p>
                      <p className="text-xs text-gray-500">Il y a 5 jours</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Récolte planifiée</p>
                      <p className="text-xs text-gray-500">Il y a 1 semaine</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Profil créé</p>
                      <p className="text-xs text-gray-500">Il y a 2 mois</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
