import type { Timestamp } from 'firebase/firestore';

export type Project = {
  __type: 'project';
  id?: string;
  createdAt?: Timestamp;
  name: string;
  color: string | null;
};
