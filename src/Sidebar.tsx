import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { RecentFilter, TaskGroup, TodayFilter } from './model';
import { Inbox } from './model';
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
  const counts = useTaskCounts();
  const specialTaskGroups: TaskGroup[] = [Inbox, TodayFilter, RecentFilter];

  return (
    <DivContainer>
      <div style={{ marginRight: '4px' }}>
        <div>
          {specialTaskGroups.map((group) => (
            <DivItem
              key={group.name}
              iconColor={specialTaskGroupIconColors[group.name]}
              focus={props.current === group}
              onClick={() => props.switcher(group)}
            >
              <InboxIcon />
              {getTaskGroupTitle(group)}
              <span>
                {counts[group.name] && counts[group.name] > 0
                  ? counts[group.name]
                  : ''}
              </span>
            </DivItem>
          ))}
        </div>
        <div>
          <DivProjectsHeader>
            <ChevronDownIcon />
            Projects
          </DivProjectsHeader>
          {projects.map((project) => {
            const taskCount = counts[project.name];
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

const specialTaskGroupIconColors: { [key: string]: string } = {
  __inbox__: '#246fe0',
  __today__: '#058527',
  __recent__: '#692fc2',
};
