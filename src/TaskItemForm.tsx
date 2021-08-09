import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

import type { Task } from './Model';
import { FirestoreContext } from './context/firestore-context';

type Props = {
  collectionPath: string;
  task?: Task;
  onCancelClick: () => void;
  onComplete: () => void;
};

function formatDate(date: Date): string {
  const y = date.getFullYear().toString();
  const m = ('0' + (date.getMonth() + 1)).slice(-2);
  const d = ('0' + date.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
}

const TaskItemForm: React.FC<Props> = (props) => {
  const db = useContext(FirestoreContext);
  const [name, setName] = useState<string>(props.task?.name || '');
  const [scheduledAt, setscheduledAt] = useState<Timestamp | null>(
    props.task?.scheduledAt || null,
  );

  const canSubmit = name.length > 0;

  const submitHandler = (e: any) => {
    e.preventDefault();
    const taskCollection = collection(
      db,
      props.collectionPath,
    ) as CollectionReference<Task>;
    const docData: Task = {
      __type: 'task',
      done: false,
      name: name,
      scheduledAt: scheduledAt,
      createdAt: props?.task?.createdAt || Timestamp.fromDate(new Date()),
    };
    if (props.task) {
      const docRef = doc(taskCollection, props.task.id);
      setDoc(docRef, docData)
        .then((_docRef) => props.onComplete())
        .catch((e) => console.log(e));
    } else {
      addDoc<Task>(taskCollection, docData)
        .then((_docRef) => props.onComplete())
        .catch((e) => console.log(e));
    }
  };

  return (
    <DivTaskItemForm>
      <form>
        <DivInputs>
          <InputName
            type="text"
            placeholder="タスク名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DivSettings>
            <InputSchedule
              type="date"
              value={scheduledAt ? formatDate(scheduledAt.toDate()) : ''}
              onChange={(e) =>
                setscheduledAt(
                  e.target.value.length > 0
                    ? Timestamp.fromDate(new Date(e.target.value))
                    : null,
                )
              }
            />
          </DivSettings>
        </DivInputs>
        <DivButtons>
          <button type="submit" disabled={!canSubmit} onClick={submitHandler}>
            タスクを追加
          </button>
          <button type="reset" onClick={props.onCancelClick}>
            キャンセル
          </button>
        </DivButtons>
      </form>
    </DivTaskItemForm>
  );
};

const DivTaskItemForm = styled.div`
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

export default TaskItemForm;
