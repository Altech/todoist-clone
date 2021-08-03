import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import type { TaskGroup } from './Model';
import { Inbox } from './Model';
import useAuthState from './hooks/useAuthState';
import SignInStatusBar from './SignInStatusBar';
import Header from './Header';
import Sidebar from './Sidebar';
import Mainbar from './Mainbar';

import './App.css';

interface AppProps {}

function App({}: AppProps) {
  const [user, loading] = useAuthState();
  const [statusBarShown, setStatusBarShown] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const [focusedTaskGroup, setFocusedTaskGroup] = useState<TaskGroup>(Inbox);

  return (
    <div className="App">
      {(statusBarShown || !user) && <SignInStatusBar user={user} />}
      <Header
        onClickMenuHandler={() => setSidebarExpanded((prev) => !prev)}
        onClickAvatarHandler={() => setStatusBarShown((prev) => !prev)}
      />
      {user && (
        <DivBars>
          {sidebarExpanded && (
            <Sidebar userId={user.uid} switcher={setFocusedTaskGroup} />
          )}
          <Mainbar userId={user.uid} taskGroup={focusedTaskGroup} />
        </DivBars>
      )}
    </div>
  );
}

const DivBars = styled.div`
  display: flex;
  height: 100%;
`;

export default App;
