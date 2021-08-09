import { useContext } from 'react';

import { UserContext } from '../context/user-context';
import type { TaskGroup } from '../Model';

const getCollectionPath = (taskGroup: TaskGroup) => {
  const user = useContext(UserContext);

  if (taskGroup.__type === 'project') {
    return `users/${user!.uid}/projects/${taskGroup.id}/tasks`;
  } else {
    return `users/${user!.uid}/tasks`;
  }
};

export default getCollectionPath;
