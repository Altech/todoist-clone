import { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { UserContext } from '../context/user';
import { FirestoreContext } from '../context/firestore';
import { Project, ProjectConverter } from '../data/project';

export const useProjects = (): Project[] => {
  const user = useContext(UserContext);
  const db = useContext(FirestoreContext);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!user) {
      setProjects([]);
      return;
    }
    const col = collection(db, `users/${user!.uid}/projects`).withConverter(
      ProjectConverter,
    );
    const unsubscribe = onSnapshot(col, {
      next: (sn) => {
        setProjects(sn.docs.map((docSn) => docSn.data()));
      },
    });
    return unsubscribe;
  }, [user]);

  return projects;
};
