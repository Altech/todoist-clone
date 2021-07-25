import React from 'react';
import styled from 'styled-components';

import InboxIcon from './svg/inbox';
import CalendarIcon from './svg/calendar';
import CalendarAltIcon from './svg/calendar-alt';

type Props = {};

const Sidebar: React.FC<Props> = (props) => {
  return (
    <DivSidebar>
      <div>
        <DivItem iconColor="#246fe0">
          <InboxIcon />
          インボックス
          <span>{12}</span>
        </DivItem>
        <DivItem iconColor="#058527">
          <CalendarIcon /> 今日
          <span>{2}</span>
        </DivItem>
        <DivItem iconColor="#692fc2">
          <CalendarAltIcon />
          近日予定
        </DivItem>
      </div>
    </DivSidebar>
  );
};

const DivSidebar = styled.div`
  background: #fbfafa;
  width: 304px;
  padding-top: 30px;
  padding-left: 35px;
`;

const DivItem = styled.div<{ iconColor?: string }>`
  height: 34px;
  padding: 5px;
  padding-right: 18px;
  font-size: 14px;
  color: #202020;

  box-sizing: border-box;

  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    fill: ${(props) => props.iconColor || '#666'};
    height: 18px;
    width: 18px;
    padding-left: 4px;
    padding-right: 4px;
  }

  &:hover {
    cursor: pointer;
    background: #e9e9e9;
  }

  span {
    color: #aaa;
    font-size: 12px;
    margin-left: auto;
  }
`;

export default Sidebar;
