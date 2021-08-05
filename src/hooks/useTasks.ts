import { useState, useEffect, useContext } from 'react';
import {
  collection,
  CollectionReference,
  onSnapshot,
} from 'firebase/firestore';

import type { Task as TaskModel } from '../Model';
import { FirestoreContext } from '../context/firestore-context';

const useTasks = (collectionPath: string) => {
  const db = useContext(FirestoreContext);
  const [tasks, setTasks] = useState<Array<TaskModel>>([]);

  useEffect(() => {
    const tasksRef = collection(
      db,
      collectionPath,
    ) as CollectionReference<TaskModel>;
    const unsubscribe = onSnapshot(tasksRef, {
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
