import React from 'react';
import { createContext } from 'react';
import type { User } from 'firebase/auth';

import useAuthState from '../hooks/useAuthState';

export const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, loading] = useAuthState();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
