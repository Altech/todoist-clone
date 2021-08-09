import React, { createContext, useContext } from 'react';

import type { Project } from '../Model';
import { useProjects } from '../hooks/useProjects';

export const ProjectsContext = createContext<Project[]>([]);

export const ProjectsProvider: React.FC = ({ children }) => {
  const projects = useProjects();
  return (
    <ProjectsContext.Provider value={projects}>
      {children}
    </ProjectsContext.Provider>
  );
};
