import { useContext } from 'react';

import { UserContext } from '../context/user';
import type { TaskGroup } from '../Model';

export const getCollectionPath = (taskGroup: TaskGroup) => {
  const user = useContext(UserContext);

  if (taskGroup.__type === 'project') {
    return `users/${user!.uid}/projects/${taskGroup.id}/tasks`;
  } else {
    return `users/${user!.uid}/tasks`;
  }
};
