import React, { useState } from 'react';
import { Sparkles, Loader2, Plus, ArrowRight } from 'lucide-react';
import { suggestTasks } from '../../services/gemini';
import { addTask } from '../../services/tasks';
import { useAuth } from '../../hooks/useAuth';
import clsx from 'clsx';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const tasks = await suggestTasks(prompt);
      setSuggestions(tasks);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAll = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await Promise.all(
        suggestions.map(task => 
          addTask({
            title: task.title,
            description: task.description || '',
            status: 'Todo',
            priority: task.priority || 'Medium',
            label: task.label || 'Feature',
            userId: user.id,
            createdAt: Date.now(),
          })
        )
      );
      onClose();
    } catch (err) {
      setError('Failed to add tasks to board.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-dark w-full max-w-2xl rounded-2xl shadow-2xl border border-primary/30 flex flex-col max-h-[90vh] overflow-hidden">
        
        <div className="p-6 border-b border-dark-border flex justify-between items-center bg-gradient-to-r from-dark to-primary/10">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Ask Collabo AI</h2>
              <p className="text-sm text-gray-400">Describe a feature or goal, and AI will create the tasks.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!suggestions.length ? (
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., We need to build a user authentication flow with social login and password reset..."
                className="w-full h-32 bg-dark-lighter border border-dark-border text-white rounded-xl p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {loading ? 'Generating tasks...' : 'Generate Tasks'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Suggested Tasks ({suggestions.length})</h3>
                <button
                  onClick={handleAddAll}
                  disabled={loading}
                  className="flex items-center gap-2 bg-accent hover:bg-emerald-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add All to Board
                </button>
              </div>
              
              {error && <p className="text-red-400 text-sm">{error}</p>}
              
              <div className="space-y-3">
                {suggestions.map((task, i) => (
                  <div key={i} className="bg-dark-lighter border border-dark-border rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{task.title}</h4>
                      <span className={clsx(
                        "text-xs px-2 py-1 rounded-md font-medium",
                        task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-accent/20 text-accent'
                      )}>
                        {task.priority || 'Medium'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    {task.label && (
                      <div className="mt-3 inline-block bg-dark border border-dark-border text-xs text-gray-300 px-2 py-1 rounded">
                        {task.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setSuggestions([])}
                className="w-full text-center text-sm text-gray-400 hover:text-white mt-4"
              >
                Try a different prompt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
