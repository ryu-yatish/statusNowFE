import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <header className="bg-background border-b border-border pt-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-semibold text-foreground mr-14">
              StatusNow
            </Link>
            <nav className="hidden md:flex items-center space-x-6">

              <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-sm">
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
