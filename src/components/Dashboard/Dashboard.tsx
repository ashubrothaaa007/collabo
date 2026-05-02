import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import StatsCard from './StatsCard';
import ActivityFeed from './ActivityFeed';
import AIAssistant from '../AI/AIAssistant';
import { CheckCircle2, Clock, ListTodo, AlertCircle, Sparkles } from 'lucide-react';
import { isOverdue } from '../../utils/helpers';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tasks, loading } = useTasks();
  const [showAI, setShowAI] = useState(false);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const completed = tasks.filter(t => t.status === 'Done').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const overdue = tasks.filter(t => t.status !== 'Done' && isOverdue(t.dueDate)).length;

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Good morning, {user?.displayName?.split(' ')[0] || 'Team'}</h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAI(true)}
            className="flex items-center gap-2 bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20"
          >
            <Sparkles className="w-4 h-4" />
            Ask Collabo AI
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Tasks" 
          value={tasks.length} 
          icon={ListTodo} 
          color="primary"
          trend="12%"
          trendUp={true}
        />
        <StatsCard 
          title="Completed" 
          value={completed} 
          icon={CheckCircle2} 
          color="accent"
          trend="8%"
          trendUp={true}
        />
        <StatsCard 
          title="In Progress" 
          value={inProgress} 
          icon={Clock} 
          color="blue"
        />
        <StatsCard 
          title="Overdue" 
          value={overdue} 
          icon={AlertCircle} 
          color="red"
          trend="2%"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-96">
        <div className="lg:col-span-2 bg-dark rounded-xl border border-dark-border p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Team Workload</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-32 h-32 mx-auto rounded-full border-8 border-dark-border border-t-primary border-r-accent animate-[spin_3s_linear_infinite] mb-4 opacity-20"></div>
              <p>Workload visualization chart</p>
              <p className="text-sm">(Placeholder for Chart.js/Recharts)</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
    </div>
  );
};

export default Dashboard;
