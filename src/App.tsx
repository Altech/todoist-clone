import React from 'react';

import './App.css';
import AppWithContext from './AppWithContext';
import { ProjectsProvider } from './context/projects-context';
import { UserProvider } from './context/user-context';

interface AppProps {}

function App({}: AppProps) {
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
