// Mock Firebase
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(() => ({ id: 'mock-id' })),
  setDoc: jest.fn(() => Promise.resolve()),
  updateDoc: jest.fn(() => Promise.resolve()),
  deleteDoc: jest.fn(() => Promise.resolve()),
  getFirestore: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));

import { addTask, updateTask, deleteTask } from '../src/services/tasks';

describe('Tasks Service', () => {
  it('addTask should be called and return an id', async () => {
    const task = {
      title: 'Test',
      description: 'Desc',
      status: 'Todo' as const,
      priority: 'High' as const,
      createdAt: Date.now(),
      userId: '1'
    };
    
    const id = await addTask(task);
    expect(id).toBe('mock-id');
  });

  it('updateTask should not throw', async () => {
    await expect(updateTask('1', { title: 'Updated' })).resolves.not.toThrow();
  });

  it('deleteTask should not throw', async () => {
    await expect(deleteTask('1')).resolves.not.toThrow();
  });
});
