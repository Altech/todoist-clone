import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  CollectionReference,
  getFirestore,
} from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCnKWVx4RhE0eC9aIIKZIk0AAe63tLngVI',
  authDomain: 'altech-todoist.firebaseapp.com',
  projectId: 'altech-todoist',
  storageBucket: 'altech-todoist.appspot.com',
  messagingSenderId: '1020253811345',
  appId: '1:1020253811345:web:537661c6730f7d331dc530',
  measurementId: 'G-JPPCQ5QWM5',
});

// Firestore
//----------------------------------------------
const db = getFirestore();

// Initialize Firebase
// firebase.analytics();

interface AppProps {}

interface User {
  first: string;
  last: string;
  born: number;
  count: number;
}

function App({}: AppProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  useEffect(() => {
    addDoc<User>(collection(db, 'users') as CollectionReference<User>, {
      first: 'NewUi',
      last: 'Hoge',
      born: 1815,
      count: count,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((e) => {
        console.error('Error adding document: ', e);
      });
  }, []);
  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Page has been open for <code>{count}</code> seconds.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
