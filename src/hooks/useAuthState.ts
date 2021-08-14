import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '../firebase';

export const useAuthState = (): [User | null, boolean] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setLoading(false);
      setUser(user);
    });
    return unsubscribe;
  }, [firebaseAuth]);

  // TODO: Return error as third value.
  return [user, loading];
};
