import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { firebaseApp } from './firebaseApp';

import {
  browserLocalPersistence,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  doc,
  DocumentReference,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

// Authentication
//----------------------------------------------
const firebaseAuth = getAuth(firebaseApp);

function signInMe() {
  firebaseAuth
    .setPersistence(browserLocalPersistence)
    .then(() => {
      const [email, password] = ['takeno.sh@gmail.com', 'testtest'];
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    })
    .catch((e) => console.log(e));
}

// Firestore
//----------------------------------------------
const db = getFirestore();

interface AppProps {}

interface User {
  first: string;
  last: string;
  born: number;
  count: number;
}

function App({}: AppProps) {
  const userId = firebaseAuth.currentUser?.uid;

  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Add sample document to firebstore.
  useEffect(() => {
    if (!userId) return;
    setDoc<User>(doc(db, 'users', userId) as DocumentReference<User>, {
      first: 'NewUi',
      last: 'Hoge',
      born: 1815,
      count: count,
    })
      .then((docRef) => {
        console.log('Document written.');
      })
      .catch((e) => {
        console.error('Error adding document: ', e);
      });
  }, []);
  // Return the App component.
  return (
    <div className="App">
      <div>userId: {JSON.stringify(userId)}</div>
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
