import { useState, useEffect, useContext } from 'react';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';

import { Inbox, RecentFilter, TodayFilter } from '../Model';
import { FirestoreContext } from '../context/firestore';
import { ProjectsContext } from '../context/projects';
import { UserContext } from '../context/user';
import { genTaskGroupQuery } from '../Model';

export const useTaskCounts = () => {
  const user = useContext(UserContext);
  const db = useContext(FirestoreContext);
  const projects = useContext(ProjectsContext);
  const [taskCounts, setTaskCounts] = useState<{ [key: string]: number }>({});

  const allTaskGroups = [Inbox, TodayFilter, RecentFilter, ...projects];

  useEffect(() => {
    const unsbuscribes: Unsubscribe[] = [];
    allTaskGroups.forEach((taskGroup) => {
      const q = genTaskGroupQuery(db, user!.uid, taskGroup);
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
  }, [JSON.stringify(allTaskGroups.map((g) => [g.__type, g.name]))]);

  return taskCounts;
};
