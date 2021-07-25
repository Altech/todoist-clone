import React, { useState, useEffect } from 'react';

import {
  doc,
  DocumentReference,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

import { SignInStatusBar } from './SignInStatusBar';
import useAuthState from './util/useAuthState';
import logo from './logo.svg';
import './App.css';

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
  const [user, loading] = useAuthState();

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

  if (loading) return <div style={{ color: '#ccc' }}>loading...</div>;

  return (
    <div className="App">
      <SignInStatusBar user={user} />
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
