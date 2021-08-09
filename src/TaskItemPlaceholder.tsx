import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CalendarIcon from './svg/calendar';
import MoreIcon from './svg/more-horizontal-f';

import PlusIcon from './svg/plus';
import PlusCircleIcon from './svg/plus-circle-f';

// Task
//-------------------------------------
type Props = {};

const TaskItemPlaceholder: React.FC<Props> = (props) => {
  return (
    <DivTaskItemPlaceholder>
      <DivAdd>
        <div className="state-normal">
          <PlusIcon />
        </div>
        <div className="state-highlight">
          <PlusCircleIcon />
        </div>
      </DivAdd>
      <DivCenter>
        <DivName className="name">タスクを追加</DivName>
      </DivCenter>
    </DivTaskItemPlaceholder>
  );
};

const DivTaskItemPlaceholder = styled.div`
  display: flex;
  align-items: center;

  padding-top: 6px;
  min-height: 28px;

  .state-highlight {
    display: none;
  }
  .state-normal {
    display: block;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .name {
    color: #f17600;
  }
  &:hover .state-highlight {
    display: block;
  }
  &:hover .state-normal {
    display: none;
  }
`;

const DivAdd = styled.div`
  margin-right: 6px;
  svg {
    fill: #ff9000;
    margin-top: 1px;
    width: 20px;
    height: 20px;
  }
`;

const DivCenter = styled.div``;

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

export default TaskItemPlaceholder;
