import { useState, useEffect, useContext } from 'react';
import {
  collection,
  CollectionReference,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { Task, TaskConverter } from '../Model';
import { FirestoreContext } from '../context/firestore';

export const useTasks = (collectionPath: string) => {
  const db = useContext(FirestoreContext);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    const tasksCollection = collection(db, collectionPath).withConverter(
      TaskConverter,
    );
    const q = query(
      tasksCollection,
      where('done', '==', false),
      orderBy('createdAt'),
    );
    const unsubscribe = onSnapshot(q, {
      next: (sn) => {
        setTasks(sn.docs.map((docSn) => docSn.data()));
      },
    });
    return unsubscribe;
  }, [collectionPath]);

  return tasks;
};
