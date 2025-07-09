
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Mail, Lock, User, Sprout, Home } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { setUser, UserRole } from '@/store/slices/authSlice';
import RoleSpecificSignupForm from './RoleSpecificSignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('owner');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // Additional fields for role-specific data
    location: '',
    phone: '',
    bio: '',
    experience: '',
    landTypes: [] as string[],
    preferredCrops: [] as string[],
    availability: ''
  });
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation d'authentification
    const user = {
      id: Date.now().toString(),
      name: formData.name || 'Utilisateur',
      email: formData.email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name || 'U'}`,
      role: isLogin ? 'owner' : selectedRole,
      // Additional profile data
      location: formData.location,
      phone: formData.phone,
      bio: formData.bio,
      experience: formData.experience
    };
    
    dispatch(setUser(user));
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
      location: '',
      phone: '',
      bio: '',
      experience: '',
      landTypes: [],
      preferredCrops: [],
      availability: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const roleOptions = [
    {
      value: 'owner' as UserRole,
      title: 'Propriétaire de terre',
      description: 'Je possède des terres à mettre en culture',
      icon: Home,
      color: 'bg-green-100 text-green-800'
    },
    {
      value: 'cultivator' as UserRole,
      title: 'Cultivateur',
      description: 'Je souhaite cultiver des terres',
      icon: Sprout,
      color: 'bg-blue-100 text-blue-800'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-2 top-2 z-10"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isLogin ? 'Connexion' : 'Inscription'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Connectez-vous pour accéder à vos terres'
              : 'Créez votre compte pour commencer'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Je suis un :</Label>
                  <div className="grid grid-cols-1 gap-3 mt-3">
                    {roleOptions.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <div
                          key={role.value}
                          onClick={() => setSelectedRole(role.value)}
                          className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                            selectedRole === role.value
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${role.color}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{role.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                            </div>
                            {selectedRole === role.value && (
                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Basic fields */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jean@exemple.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Role-specific form */}
            {!isLogin && (
              <RoleSpecificSignupForm
                role={selectedRole}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            
            <Button type="submit" className="w-full earth-gradient text-white">
              {isLogin ? 'Se connecter' : 'Créer le compte'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600"
            >
              {isLogin 
                ? "Pas encore de compte ? S'inscrire"
                : 'Déjà un compte ? Se connecter'
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;
