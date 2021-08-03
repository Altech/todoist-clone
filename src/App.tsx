import React from 'react';

import './App.css';
import AppWithContext from './AppWithContext';
import { UserProvider } from './context/user-context';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <UserProvider>
        <AppWithContext />
      </UserProvider>
    </div>
  );
}

export default App;
