import { collection, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Task } from '../types';

export const addTask = async (task: Omit<Task, 'id'>) => {
  const tasksRef = collection(db, 'tasks');
  const newTaskRef = doc(tasksRef);
  await setDoc(newTaskRef, { ...task, id: newTaskRef.id });
  return newTaskRef.id;
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  const taskRef = doc(db, 'tasks', id);
  await updateDoc(taskRef, updates);
};

export const deleteTask = async (id: string) => {
  const taskRef = doc(db, 'tasks', id);
  await deleteDoc(taskRef);
};
