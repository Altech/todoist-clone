import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { firebaseAuth } from './firebase';

export const LoginHeader = (props: { userId?: string }) => {
  const userId = props.userId;
  const [signedIn, setSignedIn] = useState<boolean>(!!userId);
  // states for sign in
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // states for sign up
  // ...

  // TODO: useCallback
  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        console.log('sign in success.');
        setSignedIn(true);
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        alert('Failed to sign in');
      });
    return false;
  };

  if (signedIn) {
    return (
      <div>
        <div>userId: {JSON.stringify(userId)}</div>
        <button
          onClick={() => {
            firebaseAuth.signOut().then(() => {
              setSignedIn(false);
            });
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Sign In</h3>
        <form className="SignInForm">
          <div>
            email:
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            password:
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={loginHandler}>
            Sign In
          </button>
        </form>
        <h3>Sign Up</h3>
        (TODO: ui)
      </div>
    );
  }
};