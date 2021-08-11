import { useState, useEffect, useContext } from 'react';
import {
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { Task, TaskConverter } from '../data/task';
import { FirestoreContext } from '../context/firestore';
import { TaskGroup, TodayFilter } from '../Model';
import { getCollectionPath } from '../utils';
import { UserContext } from '../context/user';

export const useTasks = (taskGroup: TaskGroup) => {
  const user = useContext(UserContext);
  const db = useContext(FirestoreContext);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  if (taskGroup !== TodayFilter) {
    const collectionPath = getCollectionPath(taskGroup, user!);

    useEffect(() => {
      const col = collection(db, collectionPath).withConverter(TaskConverter);
      const q = query(col, where('done', '==', false), orderBy('createdAt'));
      const unsubscribe = onSnapshot(q, {
        next: (sn) => {
          setTasks(sn.docs.map((docSn) => docSn.data()));
        },
      });
      return unsubscribe;
    }, [taskGroup.name]); // temp

    return tasks;
  } else {
    useEffect(() => {
      const colGr = collectionGroup(db, 'tasks').withConverter(TaskConverter);
      const q = query(
        colGr,
        where('userId', '==', user!.uid),
        where('scheduledAt', '<=', new Date()),
        orderBy('scheduledAt'),
      );
      const unsubscribe = onSnapshot(q, {
        next: (sn) => {
          setTasks(sn.docs.map((docSn) => docSn.data()));
        },
      });
      return unsubscribe;
    }, [taskGroup.name]);
    return tasks;
  }
};
