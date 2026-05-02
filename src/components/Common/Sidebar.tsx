import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, KanbanSquare, Users, Settings, Target } from 'lucide-react';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Task Board', icon: KanbanSquare, path: '/board' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-dark border-r border-dark-border flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-dark-border">
        <div className="flex items-center space-x-3 text-primary">
          <Target className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight text-white">Collabo</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-400 hover:bg-dark-lighter hover:text-white'
                )
              }
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-10 px-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Projects
          </h3>
          <div className="space-y-2">
            {['Website Redesign', 'Mobile App', 'Q3 Marketing'].map((project, i) => (
              <div key={project} className="flex items-center text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                <span className={clsx("w-2 h-2 rounded-full mr-3", 
                  i === 0 ? "bg-accent" : i === 1 ? "bg-primary" : "bg-yellow-500"
                )}></span>
                {project}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-dark-border">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-4 text-white shadow-lg">
          <p className="text-sm font-medium mb-1">Upgrade to Pro</p>
          <p className="text-xs text-white/80 mb-3">Get unlimited AI suggestions</p>
          <button className="w-full bg-white text-primary text-xs font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
