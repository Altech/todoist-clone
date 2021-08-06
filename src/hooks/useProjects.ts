import { useContext, useEffect, useState } from 'react';
import {
  collection,
  CollectionReference,
  onSnapshot,
} from 'firebase/firestore';

import { UserContext } from '../context/user-context';
import { FirestoreContext } from '../context/firestore-context';
import type { Project as ProjectModel } from '../Model';

const useProjects = (): ProjectModel[] => {
  const user = useContext(UserContext);
  const db = useContext(FirestoreContext);
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  useEffect(() => {
    if (!user) {
      setProjects([]);
      return;
    }
    const projectsCollection = collection(
      db,
      `users/${user!.uid}/projects`,
    ) as CollectionReference<ProjectModel>;
    const unsubscribe = onSnapshot(projectsCollection, {
      next: (snapshot) => {
        const newProjects: ProjectModel[] = [];
        snapshot.forEach((obj) => {
          const project = obj.data();
          project.id = obj.id;
          project.__type = 'project';
          newProjects.push(project);
        });
        setProjects(newProjects);
      },
    });
    return unsubscribe;
  }, [user]);

  return projects;
};

export default useProjects;
