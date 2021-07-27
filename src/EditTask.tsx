import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  onCancelClick: () => void;
};

const EditTask: React.FC<Props> = (props) => {
  const [name, setName] = useState<string>('');
  const [schedule, setSchedule] = useState<string>('');

  const canSubmit = name.length > 0;

  return (
    <DivEditTask>
      <form>
        <DivInputs>
          <InputName
            type="text"
            placeholder="タスク名"
            onChange={(e) => setName(e.target.value)}
          />
          <DivSettings>
            <InputSchedule
              type="date"
              onChange={(e) => setSchedule(e.target.value)}
            />
          </DivSettings>
        </DivInputs>
        <DivButtons>
          <button type="submit" disabled={!canSubmit}>
            タスクを追加
          </button>
          <button type="reset" onClick={props.onCancelClick}>
            キャンセル
          </button>
        </DivButtons>
      </form>
    </DivEditTask>
  );
};

const DivEditTask = styled.div`
  margin: 4px auto;
`;

const DivInputs = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  cursor: text;
`;

const InputName = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
`;

const DivSettings = styled.div`
  padding-top: 10px;
`;

const InputSchedule = styled.input`
  border-radius: 5px;
  border: 1px solid #d6d6d6;
  width: 110px;
  height: 26px;
  color: rgba(0, 0, 0, 0.88);
`;

const DivButtons = styled.div`
  button {
    margin-top: 12px;
    padding: 6px 10px;
    border-radius: 5px;
    border: 1px solid;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    -webkit-font-smoothing: antialiased;
    font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo,
      sans-serif;
    &:hover {
      cursor: pointer;
    }
  }
  button[type='submit'] {
    background-color: #ff9000;
    border-color: #ff9000;
    color: white;
  }
  button[type='submit']:disabled {
    background-color: #ffce99;
    border-color: #ffce99;
  }

  button[type='reset'] {
    background-color: transparent;
    border-color: #d6d6d6;
    color: rgba(0, 0, 0, 0.88);
    margin-left: 12px;
  }
`;

export default EditTask;