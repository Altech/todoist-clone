import React from 'react';
import styled from 'styled-components';

import UnorderedListIcon from './svg/unordered-list';

type Props = {
  onClickMenuHandler: () => void;
  onClickAvatarHandler: () => void;
};

export const Header: React.FC<Props> = (props) => {
  return (
    <DivContainer>
      <DivMenu onClick={props.onClickMenuHandler}>
        <UnorderedListIcon
          style={{
            width: '24px',
            height: '24px',
            fill: 'currentColor',
            padding: '8px',
          }}
        />
      </DivMenu>
      <img
        src={avatarUrl}
        style={{ width: '28px', borderRadius: '50%', marginLeft: 'auto' }}
        onClick={props.onClickAvatarHandler}
      />
    </DivContainer>
  );
};

const DivMenu = styled.div`
  margin-top: 3px;
  &:hover {
    cursor: pointer;
  }
`;

const DivContainer = styled.div`
  background: #f19636;
  color: white;
  box-sizing: border-box;
  height: 44px;
  overflow: hidden;
  padding-right: 8px;

  display: flex;
  align-items: center;
`;

// TODO: dummy
const avatarUrl =
  'https://pbs.twimg.com/profile_images/424966163655708672/cBENTnEp_400x400.png';
