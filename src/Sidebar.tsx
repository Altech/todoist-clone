import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserContext } from './context/user';
import { RecentFilter, TaskGroup, TodayFilter } from './model';
import { Inbox } from './model';
import { ProjectsContext } from './context/projects';
import { useTaskCounts } from './hooks/useTaskCounts';
import { getTaskGroupTitle } from './utils';
import { AddProjectModal } from './AddProjectModal';
import { newProject } from './data/project';

import InboxIcon from './svg/inbox';
import CalendarIcon from './svg/calendar';
import CalendarAltIcon from './svg/calendar-alt';
import ChevronDownIcon from './svg/chevron-down';
import ChevronRightIcon from './svg/chevron-right';
import CircleFilledIcon from './svg/circle-f';
import PlusIcon from './svg/plus';

type Props = {
  isShown: boolean;
  current: TaskGroup;
  switcher: (arg: TaskGroup) => void;
};

export const Sidebar: React.FC<Props> = (props) => {
  const user = useContext(UserContext);
  const projects = useContext(ProjectsContext);
  const counts = useTaskCounts();
  const specialTaskGroups: TaskGroup[] = [Inbox, TodayFilter, RecentFilter];
  const [expanded, setExpanded] = useState<boolean>(true);
  const [addProjectModal, setAddProjectModal] = useState<boolean>(false);

  return (
    <DivContainer isShown={props.isShown}>
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
          <DivProjects>
            <DivProjectsLeft onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
              Projects
            </DivProjectsLeft>
            <DivProjectsRight
              className="addProject"
              onClick={() => setAddProjectModal(true)}
            >
              <PlusIcon />
            </DivProjectsRight>
            {user && addProjectModal && (
              <AddProjectModal
                closer={() => setAddProjectModal(false)}
                project={newProject(user!.uid)}
              />
            )}
          </DivProjects>
          {expanded &&
            projects.map((project) => {
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

const DivContainer = styled.div<{ isShown: boolean }>`
  background: #fbfafa;
  width: ${(props) => (props.isShown ? '304px' : '0px')};
  padding-left: ${(props) => (props.isShown ? '35px' : '0px')};
  padding-top: 30px;
  transition: all 0.25s ease;
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

const DivProjects = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding-top: 10px;
  padding-bottom: 10px;

  .addProject {
    display: none;
  }
  &:hover .addProject {
    display: flex;
  }
`;

const DivProjectsLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  flex-grow: 1;

  &:hover {
    cursor: pointer;
  }

  svg {
    padding-left: 4px;
    padding-right: 4px;
    fill: rgba(0, 0, 0, 0.44);
  }
`;

const DivProjectsRight = styled.div`
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  svg {
    width: 20px;
    height: 20px;
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
