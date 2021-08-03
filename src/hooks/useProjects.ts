import { useEffect, useState } from 'react';

// Firestore
//----------------------------------------------
const db = getFirestore();

export const useProjects = (userId: string) => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  useEffect(() => {
    const projectsRef = collection(
      db,
      `users/${userId}/projects`,
    ) as CollectionReference<ProjectModel>;
    const unsubscribe = onSnapshot(projectsRef, {
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
  }, []);

  return [projects, setProjects] as const;
};
