import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { firebaseAuth } from './firebase';
import { UserContext } from './context/user';

export const SignInStatusBar = () => {
  const user = useContext(UserContext);
  // states for sign in
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // states for sign up
  const [expand, setExpand] = useState<boolean>(false);

  const loginHandler = (e: any) => {
    e.preventDefault();
    // This change will trigger `onAuthStateChanged`
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        console.log('sign in success.');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to sign in');
      });
    return false;
  };

  if (user) {
    return (
      <DivContainer type={'SignIn'}>
        <div>▷ user ID: {user.uid}</div>
        <button
          onClick={() => {
            firebaseAuth.signOut();
            // This change will trigger `onAuthStateChanged`
          }}
        >
          Sign Out
        </button>
      </DivContainer>
    );
  } else {
    return (
      <DivContainer type={'SignUp'}>
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
      </DivContainer>
    );
  }
};

const DivContainer = styled.div<{ type: 'SignIn' | 'SignUp' }>`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgb(89, 89, 89);
  color: white;
  padding: 14px;

  display: ${(props) => (props.type === 'SignIn' ? 'flex' : 'block')};

  button {
    margin-left: ${(props) => (props.type === 'SignIn' ? 'auto' : '0')};
  }
`;
