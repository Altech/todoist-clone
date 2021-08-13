import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { firebaseAuth } from './firebase';
import { UserContext } from './context/user';

type Props = {};

export const SignInStatusBar: React.FC<Props> = () => {
  const user = useContext(UserContext);
  // states for sign in
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // states for sign up
  const [expand, setExpand] = useState<boolean>(false);

  const handlerGen = (type: 'SignIn' | 'SignUp') => (e: any) => {
    e.preventDefault();
    // This change will trigger `onAuthStateChanged`
    const proc =
      type === 'SignIn'
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;
    debugger;
    proc(firebaseAuth, email, password)
      .then((userCredential) => {
        console.log('Auth success.');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to auth');
      });
  };

  if (user) {
    return (
      <DivContainer>
        <DivSignedIn>
          <div>▷ user ID: {user.uid}</div>
          <button
            onClick={() => {
              firebaseAuth.signOut();
              // This change will trigger `onAuthStateChanged`
            }}
          >
            Sign Out
          </button>
        </DivSignedIn>
      </DivContainer>
    );
  } else {
    return (
      <DivContainer>
        <DivSignedOut>
          {
            <div>
              <span
                onClick={() => setExpand((prev) => !prev)}
                className="toggle"
              >
                {expand ? '▼ ' : '▶︎ '}
              </span>
              user ID: ---
            </div>
          }
          {expand && (
            <div>
              <h3>Sign In or Sign Up</h3>
              <form className="SignInForm">
                <div>
                  <label>email:</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label> password:</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" onClick={handlerGen('SignIn')}>
                  Sign In
                </button>
                <button type="submit" onClick={handlerGen('SignUp')}>
                  Sign Up
                </button>
              </form>
            </div>
          )}
        </DivSignedOut>
      </DivContainer>
    );
  }
};

const DivContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgb(89, 89, 89);
  color: white;
  padding: 14px;
`;

const DivSignedIn = styled.div`
  display: flex;
  button {
    margin-left: auto;
  }
  label {
    display: inline-block;
    width: 100px;
  }
`;

const DivSignedOut = styled.div`
  display: block;

  .toggle:hover {
    cursor: pointer;
  }

  button {
    margin-top: 14px;
    margin-left: 0;
    margin-right: 10px;
  }
  label {
    display: inline-block;
    width: 100px;
  }
`;
