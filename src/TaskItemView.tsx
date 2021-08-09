import React from 'react';
import styled from 'styled-components';

import type { Task as TaskModel } from './Model';

import CalendarIcon from './svg/calendar';
import MoreIcon from './svg/more-horizontal-f';
import CircleUncheckedIcon from './svg/circle';
import CircleCheckedIcon from './svg/chevron-circle-down-f';
import CircleWillBeCheckedIcon from './svg/chevron-circle-down';

type TaskProps = {
  task: TaskModel;
  onCheckMarkClick: () => void;
  onCenterClick: () => void;
  onMenuClick: () => void;
  showControl: boolean;
};

const Task: React.FC<TaskProps> = (props) => {
  const task = props.task;

  return (
    <DivTask showControl={props.showControl}>
      <DivDone onClick={props.onCheckMarkClick}>
        {task.done ? (
          <CircleCheckedIcon className="checked" />
        ) : (
          <div>
            <CircleUncheckedIcon className="unchecked" />
            <CircleWillBeCheckedIcon className="willbechecked" />
          </div>
        )}
      </DivDone>
      <DivCenter onClick={props.onCenterClick}>
        <DivName>{task.name}</DivName>
        <DivSubline>
          {task.scheduledAt && (
            <DivSchedule>
              <CalendarIcon />
              {`${task.scheduledAt.toDate().getMonth() + 1}月${task.scheduledAt
                .toDate()
                .getDate()}日`}
            </DivSchedule>
          )}
        </DivSubline>
      </DivCenter>
      <DivMenu className="control" onClick={props.onMenuClick}>
        <MoreIcon />
      </DivMenu>
    </DivTask>
  );
};

const DivTask = styled.div<{ showControl: boolean }>`
  display: flex;
  border-bottom: 1px solid rgb(240, 240, 240);
  padding-top: 8px;
  min-height: 28px;

  .control {
    display: ${(props) => (props.showControl ? 'block' : 'none')};
  }
  &:hover .control {
    display: block;
  }
`;

const DivDone = styled.div`
  margin-right: 6px;
  svg {
    fill: gray;
    margin-top: 1px;
    width: 20px;
    height: 20px;
  }
  svg.unchecked {
    display: inline;
  }
  svg.willbechecked {
    display: none;
  }
  &:hover {
    cursor: pointer;
    svg.unchecked {
      display: none;
    }
    svg.willbechecked {
      display: inline;
    }
  }
`;

const DivCenter = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const DivName = styled.div`
  color: #202020;
  font-size: 13px;
`;

const DivSubline = styled.div`
  color: gray;
  font-size: 12px;

  display: flex;
  svg {
    width: 12px;
    height: 12px;
    fill: gray;
    padding: 2px;
  }
`;

const DivSchedule = styled.div`
  display: flex;
  align-items: center;
`;

const DivMenu = styled.div`
  margin-left: auto;
  svg {
    padding-right: 4px;
    position: relative;
    top: 3px;
    width: 13px;
    height: 13px;
    fill: #9f9f9f;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default Task;
