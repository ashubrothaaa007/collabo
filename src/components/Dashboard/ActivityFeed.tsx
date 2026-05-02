import React from 'react';
import { CheckCircle2, MessageSquare, PlusCircle } from 'lucide-react';
import Avatar from '../Common/Avatar';
import { useAuth } from '../../hooks/useAuth';

const ActivityFeed: React.FC = () => {
  const { user } = useAuth();
  
  const activities = [
    {
      id: 1,
      type: 'complete',
      user: user?.displayName || 'User',
      avatar: user?.photoURL,
      action: 'completed task',
      target: 'Design System Update',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-accent'
    },
    {
      id: 2,
      type: 'comment',
      user: 'Sarah Lee',
      action: 'commented on',
      target: 'Q3 Marketing Pitch',
      time: '4 hours ago',
      icon: MessageSquare,
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'create',
      user: 'Mike Johnson',
      action: 'created project',
      target: 'Mobile App V2',
      time: 'Yesterday',
      icon: PlusCircle,
      color: 'text-primary'
    }
  ];

  return (
    <div className="bg-dark rounded-xl border border-dark-border shadow-sm h-full">
      <div className="p-6 border-b border-dark-border">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity, idx) => (
            <div key={activity.id} className="relative flex gap-4">
              {idx !== activities.length - 1 && (
                <div className="absolute top-10 left-5 -ml-px h-full w-0.5 bg-dark-border" aria-hidden="true"></div>
              )}
              <div className="relative">
                <Avatar src={activity.avatar} name={activity.user} size="md" className="ring-4 ring-dark" />
                <span className={`absolute -bottom-1 -right-1 rounded-full bg-dark p-0.5 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </span>
              </div>
              <div className="flex-1 min-w-0 pt-1.5">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">{activity.user}</span>{' '}
                  {activity.action}{' '}
                  <span className="font-medium text-white">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
