import { useState, useEffect, useContext } from 'react';
import {
  collection,
  CollectionReference,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import type { Task as TaskModel } from '../Model';
import { FirestoreContext } from '../context/firestore-context';

const useTasks = (collectionPath: string) => {
  const db = useContext(FirestoreContext);
  const [tasks, setTasks] = useState<Array<TaskModel>>([]);

  useEffect(() => {
    const tasksCollection = collection(
      db,
      collectionPath,
    ) as CollectionReference<TaskModel>;
    const q = query(tasksCollection, orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, {
      next: (snapshot) => {
        const newTasks: Array<TaskModel> = [];
        snapshot.forEach((obj) => {
          const task = obj.data();
          task.id = obj.id;
          task.__type = 'task';
          newTasks.push(task);
        });
        setTasks(newTasks);
      },
    });
    return unsubscribe;
  }, [collectionPath]);

  return tasks;
};

export default useTasks;