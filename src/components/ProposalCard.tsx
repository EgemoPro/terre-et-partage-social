
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, XCircle, Clock, MapPin, Calendar, Percent, Euro, MessageSquare } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { updateProposalStatus, Proposal } from '@/store/slices/proposalsSlice';

interface ProposalCardProps {
  proposal: Proposal;
  isReceived?: boolean;
}

const ProposalCard = ({ proposal, isReceived = false }: ProposalCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleStatusUpdate = (status: Proposal['status']) => {
    dispatch(updateProposalStatus({ id: proposal.id, status }));
  };

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Acceptée</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Refusée</Badge>;
      case 'withdrawn':
        return <Badge variant="outline">Retirée</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarContent src={`https://api.dicebear.com/7.x/initials/svg?seed=${proposal.fromUserId}`} />
              <AvatarFallback>
                {proposal.fromUserId.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {isReceived ? 'Demande de cultivation' : 'Proposition envoyée'}
              </CardTitle>
              <CardDescription>
                {formatDate(proposal.createdAt)}
              </CardDescription>
            </div>
          </div>
          {getStatusBadge(proposal.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-gray-700 text-sm">
            {proposal.message}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proposal.proposedTerms.sharePercentage && (
            <div className="flex items-center space-x-2">
              <Percent className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>{proposal.proposedTerms.sharePercentage}%</strong> de partage
              </span>
            </div>
          )}

          {proposal.proposedTerms.rentPrice && (
            <div className="flex items-center space-x-2">
              <Euro className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>{proposal.proposedTerms.rentPrice}€</strong>/mois
              </span>
            </div>
          )}

          {proposal.proposedTerms.duration && (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                Durée: <strong>{proposal.proposedTerms.duration}</strong>
              </span>
            </div>
          )}

          {proposal.proposedTerms.startDate && (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                Début: <strong>{formatDate(proposal.proposedTerms.startDate)}</strong>
              </span>
            </div>
          )}
        </div>

        {isReceived && proposal.status === 'pending' && (
          <div className="flex space-x-2 pt-4 border-t">
            <Button
              size="sm"
              onClick={() => handleStatusUpdate('accepted')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Accepter
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusUpdate('rejected')}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Refuser
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Répondre
            </Button>
          </div>
        )}

        {!isReceived && proposal.status === 'pending' && (
          <div className="flex justify-end pt-4 border-t">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusUpdate('withdrawn')}
              className="text-gray-600"
            >
              Retirer la proposition
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProposalCard;
