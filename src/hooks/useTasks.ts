import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Task } from '../types';
import { useAuth } from './useAuth';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const tasksData: Task[] = [];
      snapshot.forEach((doc: any) => {
        tasksData.push(doc.data() as Task);
      });
      setTasks(tasksData);
      setLoading(false);
    }, (error: any) => {
      console.error('Error fetching tasks: ', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { tasks, loading };
};
