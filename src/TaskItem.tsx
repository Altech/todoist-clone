import React, { useContext, useState } from 'react';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';

import { FirestoreContext } from './context/firestore';
import { useCollectionPath } from './hooks/useCollectionPath';
import type { Task } from './data/task';
import type { TaskGroup } from './Model';
import { TaskItemView } from './TaskItemView';
import { TaskItemForm } from './TaskItemForm';
import { TaskItemPlaceholder } from './TaskItemPlaceholder';
import { TaskConverter } from './data/task';

type Props = {
  taskGroup: TaskGroup;
  task: Task;
};

type Mode = 'Placeholder' | 'View' | 'Form';

export const TaskItem: React.FC<Props> = (props) => {
  const task = props.task;
  const db = useContext(FirestoreContext);
  const [mode, setMode] = useState<Mode>(task.id ? 'View' : 'Placeholder');

  const collectionPath = useCollectionPath(props.taskGroup);

  const doneTask = (task: Task) => {
    const col = collection(db, collectionPath).withConverter(TaskConverter);
    setDoc(doc(col, task.id), { ...task, done: true });
  };

  const deleteTask = (task: Task) => {
    const col = collection(db, collectionPath).withConverter(TaskConverter);
    deleteDoc(doc(col, task.id)).catch((e) => console.log(e));
  };

  if (mode === 'Form') {
    return (
      <TaskItemForm
        task={props.task}
        collectionPath={collectionPath}
        onCancelClick={() => setMode(task.id ? 'View' : 'Placeholder')}
        onComplete={() => setMode(task.id ? 'View' : 'Placeholder')}
      />
    );
  } else if (mode === 'Placeholder') {
    return (
      <div onClick={() => setMode('Form')}>
        <TaskItemPlaceholder />
      </div>
    );
  } else if (mode === 'View') {
    return (
      <TaskItemView
        key="view"
        task={task}
        onCheckMarkClick={() => doneTask(task)}
        onCenterClick={() => setMode('Form')}
        onMenuEditClick={() => setMode('Form')}
        onMenuDeleteClick={() => deleteTask(task)}
      />
    );
  } else {
    console.error('Unexpected case.');
    return null;
  }
};

export default TaskItem;
