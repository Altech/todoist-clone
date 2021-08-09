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
import TaskView from './TaskView';
import EditTask from './EditTask';
import AddTask from './AddTask';
import TaskDropDown from './TaskDropDown';

type Props = {
  taskGroup: TaskGroup;
  task?: Task;
};

type Mode = 'Placeholder' | 'View' | 'Form';

// タスクの追加・表示・編集の三つのモードを請け負う。
const EditableTask: React.FC<Props> = (props) => {
  const db = useContext(FirestoreContext);
  const [mode, setMode] = useState<Mode>(props.task ? 'View' : 'Placeholder');
  const [dropdown, setDropdown] = useState<boolean>(false);

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
      <EditTask
        task={props.task}
        collectionPath={collectionPath}
        onCancelClick={() => setMode('Placeholder')}
        onComplete={() => setMode('Placeholder')}
      />
    );
  } else if (mode === 'Placeholder') {
    return (
      <div onClick={() => setMode('Form')}>
        <AddTask />
      </div>
    );
  } else if (mode === 'View') {
    const task = props.task as Task;
    return (
      <div style={{ position: 'relative' }}>
        <TaskView
          key="view"
          task={props.task as Task}
          onCheckMarkClick={() => doneTask(task)}
          onCenterClick={() => setMode('Form')}
          onMenuClick={() => setDropdown(true)}
          showControl={dropdown}
        />
        {dropdown && (
          <TaskDropDown
            key="dowpdown"
            onEditClick={() => setMode('Form')}
            onDeleteClick={() => deleteTask(task)}
          />
        )}
      </div>
    );
  } else {
    console.error('Unexpected case.');
    return null;
  }
};

export default EditableTask;
