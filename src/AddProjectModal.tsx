import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FirestoreContext } from './context/firestore';
import { UserContext } from './context/user';

import { Project, ProjectConverter } from './data/project';

type Props = {
  project: Project;
  closer: () => void;
};

export const AddProjectModal: React.FC<Props> = (props) => {
  const user = useContext(UserContext);
  const db = useContext(FirestoreContext);
  const [project, setProject] = useState<Project>(props.project);

  const canSubmit = project.name.length > 0;

  const submitHandler = (e: any) => {
    e.preventDefault();
    const col = collection(db, `users/${user!.uid}/projects`).withConverter(
      ProjectConverter,
    );
    addDoc(col, project)
      .then((_project) => props.closer())
      .catch((e) => console.error(e));
  };

  return (
    <DivContainer>
      <DivOverlay onClick={props.closer}></DivOverlay>
      <DivMain>
        <DivHeader>Add Project</DivHeader>
        <DivBody>
          <DivName>
            <label>Name</label>
            <input
              type="text"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </DivName>
          <DivColor>
            <label>Color</label>
            <input
              type="color"
              value={project.color}
              onChange={(e) =>
                setProject({ ...project, color: e.target.value })
              }
            />
          </DivColor>
        </DivBody>
        <DivFooter>
          <button type="reset" onClick={props.closer}>
            Cancel
          </button>
          <button type="submit" disabled={!canSubmit} onClick={submitHandler}>
            Add
          </button>
        </DivFooter>
      </DivMain>
    </DivContainer>
  );
};

const DivContainer = styled.div``;

const DivOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 1;
`;

const DivMain = styled.div`
  position: fixed;
  --width: 400px;
  --height: 252px;
  width: var(--width);
  //  height: var(--height);
  top: calc(50% - var(--width) / 2);
  left: calc(50% - var(--width) / 2);
  z-index: 2;

  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 16%);
  max-height: 100%;
  background: white;
`;

const DivHeader = styled.div`
  padding: 0 24px;
  box-sizing: border-box;
  height: 50px;
  background: #fafafa;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ddd;
  padding-top: 16px;

  font-size: 14px;
  font-weight: 700;
`;

const DivBody = styled.div`
  padding: 20px 24px;
`;

const DivName = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 7px;
  }

  input {
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const DivColor = styled.div`
  label {
    display: block;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 7px;
  }

  input {
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100px;
    box-sizing: border-box;
  }
`;

const DivFooter = styled.div`
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: right;

  button {
    margin: 12px;
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
    margin-right: 0px;
  }
`;
