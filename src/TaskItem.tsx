import React, { useContext, useState } from 'react';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

import { FirestoreContext } from './context/firestore-context';
import getCollectionPath from './hooks/getCollectionPath';
import type { Task, TaskGroup } from './Model';
import TaskItemView from './TaskItemView';
import TaskItemForm from './TaskItemForm';
import TaskItemPlaceholder from './TaskItemPlaceholder';

type Props = {
  taskGroup: TaskGroup;
  task?: Task;
};

type Mode = 'Placeholder' | 'View' | 'Form';

// タスクの追加・表示・編集の三つのモードを請け負う。
const TaskItem: React.FC<Props> = (props) => {
  const db = useContext(FirestoreContext);
  const [mode, setMode] = useState<Mode>(props.task ? 'View' : 'Placeholder');

  const collectionPath = getCollectionPath(props.taskGroup);

  const doneTask = (task: Task) => {
    const taskCollection = collection(
      db,
      collectionPath,
    ) as CollectionReference<Task>;
    const newTask = Object.assign({}, task);
    newTask.done = true;
    setDoc(doc(taskCollection, task.id), newTask);
  };

  const deleteTask = (task: Task) => {
    const taskCollection = collection(
      db,
      collectionPath,
    ) as CollectionReference<Task>;
    deleteDoc(doc(taskCollection, task.id)).catch((e) => console.log(e));
  };

  if (mode === 'Form') {
    return (
      <TaskItemForm
        task={props.task}
        collectionPath={collectionPath}
        onCancelClick={() => setMode(props.task ? 'View' : 'Placeholder')}
        onComplete={() => setMode(props.task ? 'View' : 'Placeholder')}
      />
    );
  } else if (mode === 'Placeholder') {
    return (
      <div onClick={() => setMode('Form')}>
        <TaskItemPlaceholder />
      </div>
    );
  } else if (mode === 'View') {
    const task = props.task as Task;
    return (
      <TaskItemView
        key="view"
        task={props.task as Task}
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
