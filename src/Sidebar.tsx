import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  collection,
  CollectionReference,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

import type { Project as ProjectModel } from 'Model';

import InboxIcon from './svg/inbox';
import CalendarIcon from './svg/calendar';
import CalendarAltIcon from './svg/calendar-alt';
import ChevronDownIcon from './svg/chevron-down';
import CircleFilledIcon from './svg/circle-f';

// Firestore
//----------------------------------------------
const db = getFirestore();

type Props = {
  userId: string;
};

const colors: string[] = [
  '#9FC2E7',
  '#91CA5C',
  '#F29E4B',
  '#50A7EF',
  '#F4D246',
];

const Sidebar: React.FC<Props> = (props) => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  useEffect(() => {
    const projectsRef = collection(
      db,
      `users/${props.userId}/projects`,
    ) as CollectionReference<ProjectModel>;
    const unsubscribe = onSnapshot(projectsRef, {
      next: (snapshot) => {
        const newProjects: ProjectModel[] = [];
        snapshot.forEach((obj) => {
          const project = obj.data();
          project.id = obj.id;
          newProjects.push(project);
        });
        setProjects(newProjects);
      },
    });
    return unsubscribe;
  });

  return (
    <DivSidebar>
      <div>
        <DivItem iconColor="#246fe0">
          <InboxIcon />
          インボックス
          <span>{12}</span>
        </DivItem>
        <DivItem iconColor="#058527">
          <CalendarIcon /> 今日
          <span>{2}</span>
        </DivItem>
        <DivItem iconColor="#692fc2">
          <CalendarAltIcon />
          近日予定
        </DivItem>
      </div>
      <div>
        <DivProjectsHeader>
          <ChevronDownIcon />
          プロジェクト
        </DivProjectsHeader>
        {projects.map((project) => (
          <DivItem iconColor={project.color} iconIsSmall={true}>
            <CircleFilledIcon />
            {project.name}
            <span>{12}</span>
          </DivItem>
        ))}
      </div>
    </DivSidebar>
  );
};

const DivSidebar = styled.div`
  background: #fbfafa;
  width: 304px;
  padding-top: 30px;
  padding-left: 35px;
`;

const DivItem = styled.div<{ iconColor?: string; iconIsSmall?: boolean }>`
  height: 34px;
  padding: 5px;
  padding-right: 18px;
  font-size: 14px;
  color: #202020;

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

export default Sidebar;
