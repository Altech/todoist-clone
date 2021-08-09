import type { User } from 'firebase/auth';
import type { TaskGroup } from './Model';

export const getCollectionPath = (taskGroup: TaskGroup, user: User) => {
  if (taskGroup.__type === 'project') {
    return `users/${user.uid}/projects/${taskGroup.id}/tasks`;
  } else {
    return `users/${user.uid}/tasks`;
  }
};
