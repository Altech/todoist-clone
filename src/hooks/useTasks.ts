import { useState, useEffect, useContext } from 'react';
import { onSnapshot } from 'firebase/firestore';

import type { Task } from '../data/task';
import { FirestoreContext } from '../context/firestore';
import { genTaskGroupQuery, TaskGroup } from '../Model';
import { UserContext } from '../context/user';

export const useTasks = (taskGroup: TaskGroup) => {
  const user = useContext(UserContext);
  const db = useContext(FirestoreContext);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      genTaskGroupQuery(db, user!.uid, taskGroup),
      {
        next: (sn) => {
          setTasks(sn.docs.map((docSn) => docSn.data()));
        },
      },
    );
    return unsubscribe;
  }, [taskGroup.__type, taskGroup.name]);

  return tasks;
};
