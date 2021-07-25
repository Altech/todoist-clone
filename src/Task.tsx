import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CalendarIcon from './svg/calendar';
import MoreIcon from './svg/more-horizontal-f';
import CircleUncheckedIcon from './svg/circle';
import CircleCheckedIcon from './svg/chevron-circle-down';

// Task
//-------------------------------------
type TaskProps = {};

const Task: React.FC<TaskProps> = (props) => {
  return (
    <DivTask>
      <DivDone>
        <CircleUncheckedIcon />
        <CircleCheckedIcon style={{ display: 'none' }} />
      </DivDone>
      <DivCenter>
        <DivName>TypeScript で Scheme の処理系を書いてみる</DivName>
        <DivSubline>
          <DivSchedule>
            <CalendarIcon />
            9月18日
          </DivSchedule>
        </DivSubline>
      </DivCenter>
      <DivMenu className="control">
        <MoreIcon />
      </DivMenu>
    </DivTask>
  );
};

const DivTask = styled.div`
  display: flex;
  border-bottom: 1px solid rgb(240, 240, 240);
  padding-top: 8px;
  min-height: 28px;

  .control {
    display: none;
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

const DivSchedule = styled.div`
  display: flex;
  align-items: center;

  display: none;
`;

const DivMenu = styled.div`
  margin-left: auto;
  display: none;
  svg {
    padding-right: 4px;
    position: relative;
    top: 3px;
    width: 14px;
    fill: #9f9f9f;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default Task;
