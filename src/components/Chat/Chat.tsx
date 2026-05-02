import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import { sendMessage } from '../../services/chat';
import { useAuth } from '../../hooks/useAuth';
import Message from './Message';
import { Send, Smile } from 'lucide-react';

const Chat: React.FC = () => {
  const { messages, loading } = useChat();
  const { user } = useAuth();
  const [text, setText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user) return;

    const msg = text;
    setText(''); // Optimistic clear

    try {
      await sendMessage({
        text: msg.trim(),
        userId: user.id,
        userName: user.displayName || 'Unknown User',
        userAvatar: user.photoURL || '',
        createdAt: Date.now()
      });
    } catch (error) {
      console.error('Failed to send message', error);
      setText(msg); // Restore if failed
    }
  };

  return (
    <div className="flex flex-col h-full bg-dark">
      <div className="p-4 border-b border-dark-border bg-dark">
        <h3 className="font-semibold text-white">Project Chat</h3>
        <p className="text-xs text-accent flex items-center gap-1 mt-1">
          <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
          Online now
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-dark">
        {loading ? (
          <div className="flex justify-center mt-4">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          messages.map(msg => <Message key={msg.id} message={msg} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-dark border-t border-dark-border">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-dark-lighter border border-dark-border text-sm text-white rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <button 
            type="submit"
            disabled={!text.trim()}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
