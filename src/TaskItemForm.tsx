import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import { Task, TaskConverter } from './data/task';
import { FirestoreContext } from './context/firestore';

type Props = {
  collectionPath: string;
  task: Task;
  onCancelClick: () => void;
  onComplete: () => void;
};

export const TaskItemForm: React.FC<Props> = (props) => {
  const db = useContext(FirestoreContext);
  const [task, setTask] = useState<Task>(props.task);

  const canSubmit = task.name.length > 0;

  const submitHandler = (e: any) => {
    e.preventDefault();
    const col = collection(db, props.collectionPath).withConverter(
      TaskConverter,
    );
    if (task.id) {
      setDoc(doc(col, task.id), task)
        .then((_task) => props.onComplete())
        .catch((e) => console.error(e));
    } else {
      addDoc(col, task)
        .then((_docRef) => props.onComplete())
        .catch((e) => console.error(e));
    }
  };

  return (
    <DivContainer>
      <form>
        <DivInputs>
          <InputName
            type="text"
            placeholder="Task name"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
          <DivSettings>
            <InputSchedule
              type="date"
              value={task.scheduledAt ? formatDate(task.scheduledAt) : ''}
              onChange={(e) =>
                setTask({
                  ...task,
                  scheduledAt:
                    e.target.value.length > 0 ? new Date(e.target.value) : null,
                })
              }
            />
          </DivSettings>
        </DivInputs>
        <DivButtons>
          <button type="submit" disabled={!canSubmit} onClick={submitHandler}>
            Add task
          </button>
          <button type="reset" onClick={props.onCancelClick}>
            Cancel
          </button>
        </DivButtons>
      </form>
    </DivContainer>
  );
};

const DivContainer = styled.div`
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
  width: 100%;
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
  width: 138px;
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

function formatDate(date: Date): string {
  const y = date.getFullYear().toString();
  const m = ('0' + (date.getMonth() + 1)).slice(-2);
  const d = ('0' + date.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
}
