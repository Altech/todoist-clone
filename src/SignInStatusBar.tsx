import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './SignInStatusBar.css';
import { firebaseAuth } from './firebase';

export const SignInStatusBar = (props: { userId?: string }) => {
  const userId = props.userId;
  const signedIn = !!userId;

  // states for sign in
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // states for sign up
  const [expand, setExpand] = useState<boolean>(false);

  // TODO: useCallback
  const loginHandler = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        console.log('sign in success.');
        // The change will be triggered via `onAuthStateChanged`
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
      <div className="SignInStatusBar SignIn">
        <div>▷ user ID: {userId}</div>
        <button
          onClick={() => {
            firebaseAuth.signOut();
            // The change will be triggered via `onAuthStateChanged`
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <div className="SignInStatusBar SignUp">
        {
          <div>
            <span onClick={() => setExpand((prev) => !prev)}>
              {expand ? '▼ ' : '▶︎ '}
            </span>
            user ID: ---
          </div>
        }
        {expand && (
          <div>
            <h3>Sign In</h3>
            <form className="SignInForm">
              <div>
                email:
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
        )}
      </div>
    );
  }
};
