import type { TaskGroup } from './model';

export const getTaskGroupTitle = (taskGroup: TaskGroup) => {
  if (taskGroup.__type === 'project') {
    return taskGroup.name;
  } else if (taskGroup.__type === 'inbox') {
    return 'Inbox';
  } else if (taskGroup.__type === 'today') {
    return 'Today';
  } else if (taskGroup.__type === 'recent') {
    return 'Upcomming';
  }
};
