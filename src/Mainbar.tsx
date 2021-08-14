import React, { useContext } from 'react';
import styled from 'styled-components';

import type { TaskGroup } from './model';
import { newTask } from './data/task';
import { useTasks } from './hooks/useTasks';
import { TaskItem } from './TaskItem';

import MoreHorizontalIcon from './svg/more-horizontal';
import { getTaskGroupTitle } from './utils';
import { UserContext } from './context/user';

type Props = {
  taskGroup: TaskGroup;
};

export const Mainbar: React.FC<Props> = (props) => {
  const user = useContext(UserContext);
  const title = getTaskGroupTitle(props.taskGroup);
  const tasks = useTasks(props.taskGroup);

  return (
    <DivContainer>
      <DivInnerContainer>
        <DivHeader>
          <DivTitle>{title}</DivTitle>
          <DivMenu className="control">
            <MoreHorizontalIcon />
          </DivMenu>
        </DivHeader>
        <DivContent>
          {tasks.map((task) => (
            <TaskItem key={task.id} taskGroup={props.taskGroup} task={task} />
          ))}
          <TaskItem taskGroup={props.taskGroup} task={newTask(user!.uid)} />
        </DivContent>
      </DivInnerContainer>
    </DivContainer>
  );
};

const DivContainer = styled.div`
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
