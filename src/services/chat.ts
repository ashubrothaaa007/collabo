import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ChatMessage } from '../types';

export const sendMessage = async (message: Omit<ChatMessage, 'id'>) => {
  const chatRef = collection(db, 'chats');
  const newMessageRef = doc(chatRef);
  await setDoc(newMessageRef, { ...message, id: newMessageRef.id });
};
