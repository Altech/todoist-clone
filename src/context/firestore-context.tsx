import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { FirebaseFirestore, getFirestore } from 'firebase/firestore';

const db = getFirestore();

export const FirestoreContext = createContext<FirebaseFirestore>(db);

export const FirestoreProvider: React.FC = ({ children }) => {
  return (
    <FirestoreContext.Provider value={db}>{children}</FirestoreContext.Provider>
  );
};
