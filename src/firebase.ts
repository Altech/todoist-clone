import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// This account is under free plan.
// I recommend you to create your own account for learning.
export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCnKWVx4RhE0eC9aIIKZIk0AAe63tLngVI',
  authDomain: 'altech-todoist.firebaseapp.com',
  projectId: 'altech-todoist',
  storageBucket: 'altech-todoist.appspot.com',
  messagingSenderId: '1020253811345',
  appId: '1:1020253811345:web:537661c6730f7d331dc530',
  measurementId: 'G-JPPCQ5QWM5',
});

export const firebaseAuth = getAuth(firebaseApp);
