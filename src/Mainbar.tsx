import React from 'react';
import styled from 'styled-components';

import Task from './Task';
import AddTask from './AddTask';
import MoreHorizontalIcon from './svg/more-horizontal';

type Props = {};

const Mainbar: React.FC<Props> = (props) => {
  return (
    <DivMainBar>
      <DivInnerContainer>
        <DivHeader>
          <DivTitle>インボックス</DivTitle>
          <DivMenu className="control">
            <MoreHorizontalIcon />
          </DivMenu>
        </DivHeader>
        <DivContent>
          <Task />
          <Task />
          <AddTask />
        </DivContent>
      </DivInnerContainer>
    </DivMainBar>
  );
};

const DivMainBar = styled.div`
  background: white;
  width: 100%;
`;

const DivInnerContainer = styled.div`
  max-width: 818px;
  margin: 36px auto 0px auto;
`;

const DivHeader = styled.div`
  padding: 36px 55px auto 55px;
  height: 36px;

  display: flex;
  align-items: center;

  .control {
    display: none;
  }
  &:hover .control {
    display: block;
    cursor: pointer;
  }
`;

const DivTitle = styled.div`
  color: #202020;
  font-size: 20px;
  font-weight: 700;
`;

const DivMenu = styled.div`
  margin-left: auto;
  padding: 2px;

  svg {
    fill: gray;
    width: 20px;
  }
`;

const DivContent = styled.div``;

export default Mainbar;
