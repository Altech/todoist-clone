import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';

import type { Task as TaskModel } from './Model';
// Firestore
//----------------------------------------------
const db = getFirestore();

type Props = {
  userId: string;
  collectionPath: string;
  task?: TaskModel;
  onCancelClick: () => void;
  onComplete: () => void;
};

function formatDate(date: Date): string {
  const y = date.getFullYear().toString();
  const m = ('0' + (date.getMonth() + 1)).slice(-2);
  const d = ('0' + date.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
}

const EditTask: React.FC<Props> = (props) => {
  const [name, setName] = useState<string>(props.task?.name || '');
  const [scheduleDate, setScheduleDate] = useState<Timestamp | null>(
    props.task?.scheduleDate || null,
  );

  const canSubmit = name.length > 0;

  const submitHandler = (e: any) => {
    e.preventDefault();
    const taskCollection = collection(
      db,
      props.collectionPath,
    ) as CollectionReference<TaskModel>;
    const docData: TaskModel = {
      __type: 'task',
      done: false,
      name: name,
      scheduleDate: scheduleDate,
    };
    if (props.task) {
      const docRef = doc(taskCollection, props.task.id);
      setDoc(docRef, docData)
        .then((_docRef) => props.onComplete())
        .catch((e) => console.log(e));
    } else {
      addDoc<TaskModel>(taskCollection, docData)
        .then((_docRef) => props.onComplete())
        .catch((e) => console.log(e));
    }
  };

  return (
    <DivEditTask>
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
              value={scheduleDate ? formatDate(scheduleDate.toDate()) : ''}
              onChange={(e) =>
                setScheduleDate(
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

export default EditTask;
