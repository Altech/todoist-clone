import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

import type { Task as TaskModel, TaskGroup } from './Model';
import Task from './Task';
import EditTask from './EditTask';
import AddTask from './AddTask';
import TaskDropDown from './TaskDropDown';
import MoreHorizontalIcon from './svg/more-horizontal';
import { useUserValue } from './context/user-context';

// Firestore
//----------------------------------------------
const db = getFirestore();

type Props = {
  taskGroup: TaskGroup;
};

const Mainbar: React.FC<Props> = (props) => {
  const user = useUserValue();
  const [tasks, setTasks] = useState<Array<TaskModel>>([]);
  const [tasksEditing, setTasksEditing] = useState<{
    [key: string]: boolean | undefined;
  }>({});
  const [newTaskEditing, setNewTaskEditing] = useState<boolean>(false);
  const [dropDownTask, setDropDownTask] = useState<string | undefined>(
    undefined,
  );
  const setTaskEditing = (taskId: string | undefined, value: boolean) => {
    if (!taskId) return;
    const nextState = Object.assign({}, tasksEditing);
    nextState[taskId] = value;
    setTasksEditing(nextState);
  };

  const collectionPath =
    props.taskGroup.__type === 'project'
      ? `users/${user!.uid}/projects/${props.taskGroup.id}/tasks`
      : `users/${user!.uid}/tasks`;
  const title =
    props.taskGroup.__type === 'project'
      ? props.taskGroup.name
      : 'インボックス';

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

  const deleteTask = (task: TaskModel) => {
    const taskCollection = collection(
      db,
      collectionPath,
    ) as CollectionReference<TaskModel>;
    deleteDoc(doc(taskCollection, task.id)).catch((e) => console.log(e));
  };

  return (
    <DivMainBar>
      <DivInnerContainer>
        <DivHeader>
          <DivTitle>{title}</DivTitle>
          <DivMenu className="control">
            <MoreHorizontalIcon />
          </DivMenu>
        </DivHeader>
        <DivContent>
          {tasks.map((task) =>
            tasksEditing[task.id as string] ? (
              <EditTask
                collectionPath={collectionPath}
                task={task}
                onCancelClick={() => setTaskEditing(task.id, false)}
                onComplete={() => setTaskEditing(task.id, false)}
              />
            ) : (
              <div style={{ position: 'relative' }}>
                <Task
                  key={task.id}
                  done={task.done}
                  name={task.name}
                  schedule={task.scheduleDate}
                  onCenterClick={() => setTaskEditing(task.id, true)}
                  onMenuClick={() => setDropDownTask(task.id)}
                  showControl={dropDownTask === task.id}
                />
                {dropDownTask === task.id && (
                  <TaskDropDown
                    onEditClick={() => setTaskEditing(task.id, true)}
                    onDeleteClick={() => deleteTask(task)}
                  />
                )}
              </div>
            ),
          )}
          {newTaskEditing ? (
            <EditTask
              collectionPath={collectionPath}
              onCancelClick={() => setNewTaskEditing(false)}
              onComplete={() => setNewTaskEditing(false)}
            />
          ) : (
            <div onClick={() => setNewTaskEditing(true)}>
              <AddTask />
            </div>
          )}
        </DivContent>
      </DivInnerContainer>
    </DivMainBar>
  );
};

const DivMainBar = styled.div`
  background: white;
  width: 100%;
`;

const DivInnerContainer = styled.div`
  max-width: 818px;
  margin: 36px auto 0px auto;
`;

const DivHeader = styled.div`
  padding: 36px 55px auto 55px;
  height: 36px;

  display: flex;
  align-items: center;

  .control {
    display: none;
  }
  &:hover .control {
    display: block;
    cursor: pointer;
  }
`;

const DivTitle = styled.div`
  color: #202020;
  font-size: 20px;
  font-weight: 700;
`;

const DivMenu = styled.div`
  margin-left: auto;
  padding: 2px;

  svg {
    fill: gray;
    width: 20px;
  }
`;

const DivContent = styled.div``;

export default Mainbar;
