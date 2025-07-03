
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Send, User } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantName: string;
  participantRole: 'cultivator' | 'owner';
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

const MessagingSystem = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const mockConversations: Conversation[] = [
    {
      id: '1',
      participantName: 'Marie Cultivatrice',
      participantRole: 'cultivator',
      lastMessage: 'Je suis intéressée par votre terrain en Provence',
      unreadCount: 2,
      messages: [
        {
          id: '1',
          senderId: '2',
          senderName: 'Marie Cultivatrice',
          content: 'Bonjour, je suis intéressée par votre terrain en Provence. Pourriez-vous me donner plus de détails sur la qualité du sol ?',
          timestamp: '2024-01-15T10:30:00Z',
          isRead: true
        },
        {
          id: '2',
          senderId: '1',
          senderName: 'Vous',
          content: 'Bonjour Marie, merci pour votre intérêt ! Le sol est argileux avec un bon drainage. Voulez-vous planifier une visite ?',
          timestamp: '2024-01-15T14:20:00Z',
          isRead: true
        }
      ]
    },
    {
      id: '2',
      participantName: 'Pierre Maraîcher',
      participantRole: 'cultivator',
      lastMessage: 'Proposition de contrat de culture',
      unreadCount: 0,
      messages: [
        {
          id: '3',
          senderId: '3',
          senderName: 'Pierre Maraîcher',
          content: 'J\'ai préparé une proposition de contrat pour la culture de légumes de saison sur votre parcelle.',
          timestamp: '2024-01-14T16:45:00Z',
          isRead: true
        }
      ]
    }
  ];

  const [conversations, setConversations] = useState(mockConversations);

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'Vous',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true
    };

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, messages: [...conv.messages, newMsg], lastMessage: newMessage }
        : conv
    ));

    setNewMessage('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-80 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedConversation === conversation.id
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {conversation.participantName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">
                      {conversation.participantName}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={conversation.participantRole === 'cultivator' ? 'bg-green-100' : 'bg-blue-100'}
                    >
                      {conversation.participantRole === 'cultivator' ? 'Cultivateur' : 'Propriétaire'}
                    </Badge>
                  </div>
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge className="bg-red-500">{conversation.unreadCount}</Badge>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-2 truncate">
                {conversation.lastMessage}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Messages View */}
      <Card className="lg:col-span-2">
        <CardHeader>
          {selectedConv && (
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {selectedConv.participantName}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          {selectedConv ? (
            <div className="space-y-4">
              {/* Messages */}
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === '1' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.senderId === '1'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Tapez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={2}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="earth-gradient text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Sélectionnez une conversation pour commencer</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingSystem;
