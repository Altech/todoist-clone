import type { User } from 'firebase/auth';
import type { TaskGroup } from './Model';

export const getCollectionPath = (taskGroup: TaskGroup, user: User) => {
  if (taskGroup.__type === 'project') {
    return `users/${user.uid}/projects/${taskGroup.id}/tasks`;
  } else {
    return `users/${user.uid}/tasks`;
  }
};

export const getTaskGroupTitle = (taskGroup: TaskGroup) => {
  if (taskGroup.__type === 'project') {
    return taskGroup.name;
  } else if (taskGroup.__type === 'inbox') {
    return 'インボックス';
  } else if (taskGroup.__type === 'today') {
    return '今日';
  }
};
