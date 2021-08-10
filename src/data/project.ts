import {
  Timestamp,
  FirestoreDataConverter,
  serverTimestamp,
} from 'firebase/firestore';

export type Project = {
  __type: 'project';
  id?: string;
  name: string;
  createdAt?: Date;
  color: string | null;
};

export const ProjectConverter: FirestoreDataConverter<Project> = {
  toFirestore: (project) => {
    return {
      __type: 'project',
      name: project.name,
      createdAt: project.createdAt
        ? Timestamp.fromDate(project.createdAt)
        : serverTimestamp(),
      color: project.color,
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const project = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
    } as Project;
    project.id = snapshot.id;
    return project;
  },
};
