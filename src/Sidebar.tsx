import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { TaskGroup, TodayFilter } from './Model';
import { Inbox } from './Model';
import { ProjectsContext } from './context/projects';

import InboxIcon from './svg/inbox';
import CalendarIcon from './svg/calendar';
import CalendarAltIcon from './svg/calendar-alt';
import ChevronDownIcon from './svg/chevron-down';
import CircleFilledIcon from './svg/circle-f';
import { useTaskCounts } from './hooks/useTaskCounts';
import { getTaskGroupTitle } from './utils';

type Props = {
  current: TaskGroup;
  switcher: (arg: TaskGroup) => void;
};

export const Sidebar: React.FC<Props> = (props) => {
  const projects = useContext(ProjectsContext);
  const taskCounts = useTaskCounts();

  return (
    <DivContainer>
      <div style={{ marginRight: '4px' }}>
        <div>
          <DivItem
            iconColor="#246fe0"
            focus={props.current === Inbox}
            onClick={() => props.switcher(Inbox)}
          >
            <InboxIcon />
            {getTaskGroupTitle(Inbox)}
            <span>
              {taskCounts[Inbox.name] && taskCounts[Inbox.name] > 0
                ? taskCounts[Inbox.name]
                : ''}
            </span>
          </DivItem>
          <DivItem
            iconColor="#058527"
            focus={props.current === TodayFilter}
            onClick={() => props.switcher(TodayFilter)}
          >
            <CalendarIcon />
            {getTaskGroupTitle(TodayFilter)}
            <span>
              {taskCounts[TodayFilter.name] && taskCounts[TodayFilter.name] > 0
                ? taskCounts[TodayFilter.name]
                : ''}
            </span>
          </DivItem>
          <DivItem iconColor="#692fc2" focus={false}>
            <CalendarAltIcon />
            近日予定
          </DivItem>
        </div>
        <div>
          <DivProjectsHeader>
            <ChevronDownIcon />
            プロジェクト
          </DivProjectsHeader>
          {projects.map((project) => {
            const taskCount = taskCounts[project.name];
            return (
              <DivItem
                key={project.name}
                iconColor={project.color}
                iconIsSmall={true}
                focus={
                  props.current.__type === 'project' &&
                  props.current.name === project.name
                }
                onClick={() => props.switcher(project)}
              >
                <CircleFilledIcon />
                {project.name}
                <span>{taskCount && taskCount > 0 ? taskCount : ''}</span>
              </DivItem>
            );
          })}
        </div>
      </div>
    </DivContainer>
  );
};

const DivContainer = styled.div`
  background: #fbfafa;
  width: 304px;
  padding-top: 30px;
  padding-left: 35px;
`;

const DivItem = styled.div<{
  iconColor: string | null;
  iconIsSmall?: boolean;
  focus: boolean;
}>`
  height: 34px;
  padding: 5px;
  padding-right: 18px;
  font-size: 14px;
  color: #202020;
  border-radius: 5px;
  background: ${(props) => (props.focus ? '#e9e9e9' : 'none')};

  box-sizing: border-box;

  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    fill: ${(props) => props.iconColor || '#666'};
    height: ${(props) => (props.iconIsSmall ? '10px' : '18px')};
    width: ${(props) => (props.iconIsSmall ? '10px' : '18px')};
    padding-left: ${(props) => (props.iconIsSmall ? '8px' : '4px')};
    padding-right: ${(props) => (props.iconIsSmall ? '8px' : '4px')};
  }

  &:hover {
    cursor: pointer;
    background: #e9e9e9;
  }

  span {
    color: #aaa;
    font-size: 12px;
    margin-left: auto;
  }
`;

const DivProjectsHeader = styled.div`
  margin-top: 12px;
  padding-top: 10px;
  padding-bottom: 10px;

  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;

  svg {
    padding-left: 4px;
    padding-right: 4px;
    fill: rgba(0, 0, 0, 0.44);
  }
`;

const colors: string[] = [
  '#9FC2E7',
  '#91CA5C',
  '#F29E4B',
  '#50A7EF',
  '#F4D246',
];
