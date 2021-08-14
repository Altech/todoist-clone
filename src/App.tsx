import React from 'react';

import { AppWithContext } from './AppWithContext';
import { ProjectsProvider } from './context/projects';
import { UserProvider } from './context/user';

import './App.css';

type Props = {};

export function App({}: Props) {
  return (
    <div className="App">
      <UserProvider>
        <ProjectsProvider>
          <AppWithContext />
        </ProjectsProvider>
      </UserProvider>
    </div>
  );
}
