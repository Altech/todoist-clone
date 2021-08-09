import React from 'react';
import styled from 'styled-components';

import PlusIcon from './svg/plus-rectangle';
import UnorderedListIcon from './svg/unordered-list';

type Props = {
  onClickMenuHandler: () => void;
  onClickAvatarHandler: () => void;
};

// TODO: dummy
const avatarUrl =
  'https://pbs.twimg.com/profile_images/424966163655708672/cBENTnEp_400x400.png';

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
      <PlusIcon
        style={{
          width: '16px',
          height: '16px',
          fill: 'currentColor',
          padding: '8px',
          marginLeft: 'auto',
        }}
      />
      <img
        src={avatarUrl}
        style={{ width: '28px', borderRadius: '50%' }}
        onClick={props.onClickAvatarHandler}
      />
    </DivContainer>
  );
};

const DivMenu = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 16px;
  height: 16px;
  fill: currentColor;
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

export default Header;
