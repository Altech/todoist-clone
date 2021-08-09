import { useState, useEffect, useContext } from 'react';
import {
  collection,
  CollectionReference,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';

import { Inbox, Task } from '../Model';
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
  const paths = allTaskGroups.map((g) => getCollectionPath(g, user!));

  useEffect(() => {
    const unsbuscribes: Unsubscribe[] = [];
    allTaskGroups.forEach((taskGroup) => {
      const path = getCollectionPath(taskGroup, user!);
      const tasksCollection = collection(db, path) as CollectionReference<Task>;
      const q = query(tasksCollection, where('done', '==', false));
      const unsubscribe = onSnapshot(q, {
        next: (snapshot) => {
          setTaskCounts((prev) => {
            let n = 0;
            snapshot.forEach((_) => (n += 1));
            const newTasksCounts = Object.assign({}, prev);
            newTasksCounts[taskGroup.name] = n;
            return newTasksCounts;
          });
        },
      });
      unsbuscribes.push(unsubscribe);
    });
    return () => {
      unsbuscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [JSON.stringify(paths)]);

  return taskCounts;
};
