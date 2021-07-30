import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  addDoc,
  collection,
  CollectionReference,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

import type { Task as TaskModel, TaskGroup } from './Model';
import Task from './Task';
import EditTask from './EditTask';
import AddTask from './AddTask';
import TaskDropDown from './TaskDropDown';
import MoreHorizontalIcon from './svg/more-horizontal';

// Firestore
//----------------------------------------------
const db = getFirestore();

type Props = {
  userId: string;
  taskGroup: TaskGroup;
};

const Mainbar: React.FC<Props> = (props) => {
  const [tasks, setTasks] = useState<Array<TaskModel>>([]);
  const [taskEditing, setTaskEditing] = useState<boolean>(false);
  const [dropDownTask, setDropDownTask] = useState<string | undefined>(
    undefined,
  );

  const dbPath =
    props.taskGroup.__type === 'project'
      ? `users/${props.userId}/projects/${props.taskGroup.id}/tasks`
      : `users/${props.userId}/tasks`;
  const title =
    props.taskGroup.__type === 'project'
      ? props.taskGroup.name
      : 'インボックス';

  useEffect(() => {
    const tasksRef = collection(db, dbPath) as CollectionReference<TaskModel>;
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
  }, [dbPath]);

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
          {tasks.map((task) => (
            <div style={{ position: 'relative' }}>
              <div onClick={() => setDropDownTask(task.id)}>
                <Task
                  key={task.id}
                  done={task.done}
                  name={task.name}
                  schedule={task.scheduleDate}
                  showControl={dropDownTask === task.id}
                />
              </div>
              {dropDownTask === task.id && <TaskDropDown />}
            </div>
          ))}
          {taskEditing ? (
            <EditTask
              userId={props.userId}
              dbPath={dbPath}
              onCancelClick={() => setTaskEditing(false)}
              onComplete={() => setTaskEditing(false)}
            />
          ) : (
            <div onClick={() => setTaskEditing(true)}>
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
