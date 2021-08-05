import React from 'react';

import AppWithContext from './AppWithContext';
import { ProjectsProvider } from './context/projects-context';
import { UserProvider } from './context/user-context';

import './App.css';

interface Props {}

function App({}: Props) {
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

export default App;
