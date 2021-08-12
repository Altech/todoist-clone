import type { TaskGroup } from './model';

export const getTaskGroupTitle = (taskGroup: TaskGroup) => {
  if (taskGroup.__type === 'project') {
    return taskGroup.name;
  } else if (taskGroup.__type === 'inbox') {
    return 'インボックス';
  } else if (taskGroup.__type === 'today') {
    return '今日';
  } else if (taskGroup.__type === 'recent') {
    return '近日予定';
  }
};
