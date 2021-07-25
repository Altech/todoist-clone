import React, { useState, useEffect } from 'react';

import { firebaseAuth } from './firebase';
import { SignInStatusBar } from './SignInStatusBar';
import logo from './logo.svg';
import './App.css';

import {
  doc,
  DocumentReference,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from '@firebase/auth';

// Firestore
//----------------------------------------------
const db = getFirestore();

interface AppProps {}

interface User {
  first: string;
  last: string;
  born: number;
}

function App({}: AppProps) {
  const [userId, setUserId] = useState<string | undefined>(
    firebaseAuth.currentUser?.uid,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUserId(user?.uid);
    });
    return unsubscribe;
  }, [firebaseAuth]);

  // useEffect(() => {
  //   if (!userId) return;
  //   setDoc<User>(doc(db, 'users', userId) as DocumentReference<User>, {
  //     first: 'NewUi',
  //     last: 'Hoge',
  //     born: 1815,
  //   })
  //     .then((docRef) => {
  //       console.log('Document written.');
  //     })
  //     .catch((e) => {
  //       console.error('Error adding document: ', e);
  //     });
  // }, []);

  return (
    <div className="App">
      <SignInStatusBar userId={userId} />
      <div className="CreateReactApp">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>Page has been open.</p>
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
    </div>
  );
}

export default App;
