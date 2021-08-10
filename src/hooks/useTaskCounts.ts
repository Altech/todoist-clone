import { useState, useEffect, useContext } from 'react';
import {
  collection,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';

import { TaskConverter } from '../data/task';
import { Inbox } from '../Model';
import { FirestoreContext } from '../context/firestore';
import { ProjectsContext } from '../context/projects';
import { getCollectionPath } from '../utils';
import { UserContext } from '../context/user';

export const useTaskCounts = () => {
  const user = useContext(UserContext);
  const db = useContext(FirestoreContext);
  const projects = useContext(ProjectsContext);
  const [taskCounts, setTaskCounts] = useState<{ [key: string]: number }>({});

  const allTaskGroups = [Inbox, ...projects];

  useEffect(() => {
    const unsbuscribes: Unsubscribe[] = [];
    allTaskGroups.forEach((taskGroup) => {
      const path = getCollectionPath(taskGroup, user!);
      const col = collection(db, path).withConverter(TaskConverter);
      const q = query(col, where('done', '==', false));
      const unsubscribe = onSnapshot(q, {
        next: (sn) => {
          setTaskCounts((prev) => {
            return { ...prev, [taskGroup.name]: sn.size };
          });
        },
      });
      unsbuscribes.push(unsubscribe);
    });
    return () => {
      unsbuscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [JSON.stringify(allTaskGroups.map((g) => getCollectionPath(g, user!)))]);

  return taskCounts;
};
