
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Send, MapPin, Calendar, Percent, Euro } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addProposal, Proposal } from '@/store/slices/proposalsSlice';
import { PublicLand } from '@/store/slices/publicLandsSlice';

interface SendProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  land: PublicLand;
}

const SendProposalModal = ({ isOpen, onClose, land }: SendProposalModalProps) => {
  const [proposalData, setProposalData] = useState({
    message: '',
    sharePercentage: land.sharePercentage || 30,
    rentPrice: land.rentPrice || 0,
    duration: '6 mois',
    startDate: ''
  });

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const newProposal: Proposal = {
      id: Date.now().toString(),
      fromUserId: user.id,
      toUserId: land.owner.id,
      landId: land.id,
      type: 'cultivation_request',
      status: 'pending',
      message: proposalData.message,
      proposedTerms: {
        sharePercentage: proposalData.sharePercentage,
        rentPrice: proposalData.rentPrice,
        duration: proposalData.duration,
        startDate: proposalData.startDate
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch(addProposal(newProposal));
    onClose();
    
    // Reset form
    setProposalData({
      message: '',
      sharePercentage: land.sharePercentage || 30,
      rentPrice: land.rentPrice || 0,
      duration: '6 mois',
      startDate: ''
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setProposalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
        
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Envoyer une proposition
          </CardTitle>
          <CardDescription>
            Proposez vos conditions pour cultiver cette terre
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Land Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-4">
              <img 
                src={land.images[0]} 
                alt={land.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{land.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {land.location}
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline">{land.size}m²</Badge>
                  <Badge variant="outline">{land.soilType}</Badge>
                  {land.waterAccess && <Badge className="bg-blue-100 text-blue-800">Eau disponible</Badge>}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="message">Message personnel</Label>
              <Textarea
                id="message"
                placeholder="Présentez-vous et expliquez votre projet de culture..."
                value={proposalData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {land.sharePercentage && (
                <div className="space-y-2">
                  <Label htmlFor="sharePercentage">Partage des récoltes (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="sharePercentage"
                      type="number"
                      min="10"
                      max="70"
                      value={proposalData.sharePercentage}
                      onChange={(e) => handleInputChange('sharePercentage', Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Pourcentage de la récolte que vous proposez au propriétaire
                  </p>
                </div>
              )}

              {land.rentPrice !== undefined && (
                <div className="space-y-2">
                  <Label htmlFor="rentPrice">Loyer mensuel (€)</Label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="rentPrice"
                      type="number"
                      min="0"
                      value={proposalData.rentPrice}
                      onChange={(e) => handleInputChange('rentPrice', Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Durée souhaitée</Label>
                <Select
                  value={proposalData.duration}
                  onValueChange={(value) => handleInputChange('duration', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3 mois">3 mois</SelectItem>
                    <SelectItem value="6 mois">6 mois</SelectItem>
                    <SelectItem value="1 an">1 an</SelectItem>
                    <SelectItem value="2 ans">2 ans</SelectItem>
                    <SelectItem value="Plus long terme">Plus long terme</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Date de début souhaitée</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="startDate"
                    type="date"
                    value={proposalData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" className="earth-gradient text-white">
                <Send className="w-4 h-4 mr-2" />
                Envoyer la proposition
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendProposalModal;
