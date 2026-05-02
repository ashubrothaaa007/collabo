// Mock Firebase
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  GoogleAuthProvider: jest.fn(() => ({})),
  signInWithPopup: jest.fn(() => Promise.resolve({ user: { uid: '123' } })),
  signOut: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));

import { loginWithGoogle, logout } from '../src/services/firebase';

describe('Auth Service', () => {
  it('loginWithGoogle should be a function', () => {
    expect(typeof loginWithGoogle).toBe('function');
  });

  it('logout should be a function', () => {
    expect(typeof logout).toBe('function');
  });
});
