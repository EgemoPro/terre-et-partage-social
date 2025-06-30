
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sprout, User, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

interface HeaderProps {
  onAuthClick: () => void;
  onDashboardClick: () => void;
}

const Header = ({ onAuthClick, onDashboardClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-earth-gradient rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <a href="/" className="text-xl font-bold text-gray-900">Terre & Partage</a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-green-600 transition-colors">Accueil</a>
            <a href="/comment-ca-marche" className="text-gray-600 hover:text-green-600 transition-colors">Comment ça marche</a>
            <a href="/cultivateurs" className="text-gray-600 hover:text-green-600 transition-colors">Nos cultivateurs</a>
            <a href="/devenir-cultivateur" className="text-gray-600 hover:text-green-600 transition-colors">Devenir cultivateur</a>
          </nav>

          {/* Auth/User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={onDashboardClick}
                  className="text-gray-600 hover:text-green-600"
                >
                  <User className="w-4 h-4 mr-2" />
                  Tableau de bord
                </Button>
                <a
                  href="/profil"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Mon profil
                </a>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <Button onClick={onAuthClick} className="earth-gradient text-white">
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
          <div className="md:hidden py-4 border-t border-green-100">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-600 hover:text-green-600 transition-colors">Accueil</a>
              <a href="/comment-ca-marche" className="text-gray-600 hover:text-green-600 transition-colors">Comment ça marche</a>
              <a href="/cultivateurs" className="text-gray-600 hover:text-green-600 transition-colors">Nos cultivateurs</a>
              <a href="/devenir-cultivateur" className="text-gray-600 hover:text-green-600 transition-colors">Devenir cultivateur</a>
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={onDashboardClick}
                    className="justify-start text-gray-600 hover:text-green-600"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Tableau de bord
                  </Button>
                  <a
                    href="/profil"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Mon profil
                  </a>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="justify-start text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Button onClick={onAuthClick} className="earth-gradient text-white w-fit">
                  Se connecter
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
