import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { UserContext } from './context/user-context';
import type { TaskGroup } from './Model';
import { Inbox } from './Model';
import SignInStatusBar from './SignInStatusBar';
import Header from './Header';
import Sidebar from './Sidebar';
import Mainbar from './Mainbar';

const AppWithContext: React.FC = () => {
  const user = useContext(UserContext);
  const [statusBarShown, setStatusBarShown] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const [focusedTaskGroup, setFocusedTaskGroup] = useState<TaskGroup>(Inbox);

  return (
    <div>
      {(statusBarShown || !user) && <SignInStatusBar user={user} />}
      <Header
        onClickMenuHandler={() => setSidebarExpanded((prev) => !prev)}
        onClickAvatarHandler={() => setStatusBarShown((prev) => !prev)}
      />
      {user && (
        <DivBars>
          {sidebarExpanded && <Sidebar switcher={setFocusedTaskGroup} />}
          <Mainbar taskGroup={focusedTaskGroup} />
        </DivBars>
      )}
    </div>
  );
};

const DivBars = styled.div`
  display: flex;
  height: 100%;
`;

export default AppWithContext;
