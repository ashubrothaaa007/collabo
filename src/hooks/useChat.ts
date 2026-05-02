import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';
import { ChatMessage } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      orderBy('createdAt', 'asc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const messagesData: ChatMessage[] = [];
      snapshot.forEach((doc: any) => {
        messagesData.push(doc.data() as ChatMessage);
      });
      setMessages(messagesData);
      setLoading(false);
    }, (error: any) => {
      console.error('Error fetching chats: ', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { messages, loading };
};
