import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu, X, Sprout, User, LogOut, Settings } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import AuthModal from '../AuthModal';
import RoleBadge from '../RoleBadge';

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Sidebar Trigger */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && <SidebarTrigger />}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-primary-foreground" />
                </div>
                <a href="/" className="text-xl font-bold text-foreground">
                  Terre & Partage
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </a>
              <a href="/comment-ca-marche" className="text-muted-foreground hover:text-primary transition-colors">
                Comment ça marche
              </a>
              <a href="/cultivateurs" className="text-muted-foreground hover:text-primary transition-colors">
                Nos cultivateurs
              </a>
              <a href="/mise-en-relation" className="text-muted-foreground hover:text-primary transition-colors">
                Mise en relation
              </a>
              <a href="/devenir-cultivateur" className="text-muted-foreground hover:text-primary transition-colors">
                Devenir cultivateur
              </a>
            </nav>

            {/* Auth/User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarContent>
                            <span className="text-primary-foreground text-sm font-medium">
                              {user?.name.charAt(0).toUpperCase()}
                            </span>
                          </AvatarContent>
                          <AvatarFallback>
                            {user?.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                          {user?.role && (
                            <div className="pt-1">
                              <RoleBadge role={user.role} />
                            </div>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Déconnexion</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} className="bg-primary text-primary-foreground">
                  Se connecter
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </a>
                <a href="/comment-ca-marche" className="text-muted-foreground hover:text-primary transition-colors">
                  Comment ça marche
                </a>
                <a href="/cultivateurs" className="text-muted-foreground hover:text-primary transition-colors">
                  Nos cultivateurs
                </a>
                <a href="/mise-en-relation" className="text-muted-foreground hover:text-primary transition-colors">
                  Mise en relation
                </a>
                <a href="/devenir-cultivateur" className="text-muted-foreground hover:text-primary transition-colors">
                  Devenir cultivateur
                </a>
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 py-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {user?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{user?.name}</span>
                      {user?.role && <RoleBadge role={user.role} />}
                    </div>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="justify-start text-muted-foreground hover:text-destructive w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setShowAuthModal(true)} 
                    className="bg-primary text-primary-foreground w-fit"
                  >
                    Se connecter
                  </Button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AppHeader;