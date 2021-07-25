import React from 'react';
import styled from 'styled-components';

type Props = {};

const Sidebar: React.FC<Props> = (props) => {
  return <DivMainBar>mainbar</DivMainBar>;
};

const DivMainBar = styled.div`
  background: yellow;
  width: 100%;
`;

export default Sidebar;
