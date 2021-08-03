import React from 'react';
import styled from 'styled-components';

import CalendarIcon from './svg/calendar';
import MoreIcon from './svg/more-horizontal-f';
import CircleUncheckedIcon from './svg/circle';
import CircleCheckedIcon from './svg/chevron-circle-down-f';
import CircleWillBeCheckedIcon from './svg/chevron-circle-down';
import type { Timestamp } from 'firebase/firestore';

type TaskProps = {
  done: boolean;
  name: string;
  schedule: Timestamp | null;
  onCenterClick: () => void;
  onMenuClick: () => void;
  showControl: boolean;
};

const Task: React.FC<TaskProps> = (props) => {
  return (
    <DivTask showControl={props.showControl}>
      <DivDone>
        {props.done ? <CircleCheckedIcon /> : <CircleUncheckedIcon />}
      </DivDone>
      <DivCenter onClick={props.onCenterClick}>
        <DivName>{props.name}</DivName>
        <DivSubline>
          {props.schedule && (
            <DivSchedule>
              <CalendarIcon />
              {`${props.schedule.toDate().getMonth() + 1}月${props.schedule
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
