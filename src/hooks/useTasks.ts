import { useState, useEffect, useContext } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { Task, TaskConverter } from '../data/task';
import { FirestoreContext } from '../context/firestore';

export const useTasks = (collectionPath: string) => {
  const db = useContext(FirestoreContext);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    const col = collection(db, collectionPath).withConverter(TaskConverter);
    const q = query(col, where('done', '==', false), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, {
      next: (sn) => {
        setTasks(sn.docs.map((docSn) => docSn.data()));
      },
    });
    return unsubscribe;
  }, [collectionPath]);

  return tasks;
};
