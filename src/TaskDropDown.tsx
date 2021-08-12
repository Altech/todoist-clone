import React from 'react';
import styled from 'styled-components';

import PencilIcon from './svg/pencil';
import TrashIcon from './svg/trash';

type Props = {
  onEditClick: () => void;
  onDeleteClick: () => void;
};

export const TaskDropDown: React.FC<Props> = (props) => {
  return (
    <DivContainer>
      <ul>
        <li onClick={props.onEditClick}>
          <PencilIcon />
          Edit task
        </li>
        <li onClick={props.onDeleteClick}>
          <TrashIcon />
          Delete task
        </li>
      </ul>
    </DivContainer>
  );
};

const DivContainer = styled.div`
  position: absolute;
  top: 26px;
  right: 8px;
  width: 252px;
  z-index: 1;

  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 4px 0;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);

  ul {
    padding: 0px;
    margin: 0px;
  }
  li {
    list-style: none;
    font-size: 13px;
    color: rdb(32, 32, 32);
    padding: 4px 10px;
    height: 24px;

    display: flex;
    align-items: center;

    &:hover {
      background: #f3f3f3;
      cursor: pointer;
    }

    svg {
      width: 20px;
      height: 20px;
      fill: rgb(128, 128, 128);
      margin-right: 10px;
    }
  }
`;
