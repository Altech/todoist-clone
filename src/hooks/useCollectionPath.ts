import { useContext } from 'react';

import { UserContext } from '../context/user';
import { getCollectionPath } from '../utils';
import type { TaskGroup } from '../Model';

export const useCollectionPath = (taskGroup: TaskGroup) => {
  const user = useContext(UserContext);
  return getCollectionPath(taskGroup, user!);
};
