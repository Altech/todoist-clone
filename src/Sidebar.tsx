import React from 'react';
import styled from 'styled-components';

type Props = {};

const Sidebar: React.FC<Props> = (props) => {
  return <DivSidebar>sidebar</DivSidebar>;
};

const DivSidebar = styled.div`
  /* background: #fbfafa; */
  background: red;
  width: 304px;
`;

export default Sidebar;
