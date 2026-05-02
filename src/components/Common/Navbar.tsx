import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/firebase';
import { LogOut, Bell, Search } from 'lucide-react';
import Avatar from './Avatar';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-dark border-b border-dark-border flex items-center justify-between px-6 z-10">
      <div className="flex-1 flex items-center">
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tasks, projects..." 
            className="w-full bg-dark-lighter border border-dark-border text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative text-gray-400 hover:text-white transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3 border-l border-dark-border pl-6">
          <Avatar src={user?.photoURL} name={user?.displayName} size="sm" />
          <span className="text-sm font-medium text-gray-200 hidden sm:block">{user?.displayName}</span>
          <button 
            onClick={logout}
            className="text-gray-400 hover:text-red-400 transition-colors ml-2"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
