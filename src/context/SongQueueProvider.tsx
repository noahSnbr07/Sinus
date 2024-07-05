import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { SongProps } from '../interfaces/interfaces';
import { DataSnapshot, Database, getDatabase, onValue, ref } from 'firebase/database';

interface SongQueueContextType {
   songQueue: Array<SongProps>;
   setSongQueue: Dispatch<SetStateAction<Array<SongProps>>>;
}

export const SongQueueContext = createContext<SongQueueContextType | undefined>(undefined);


// Create a provider component
export const SongQueueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [songQueue, setSongQueue] = useState<SongProps[]>([]);
   const db: Database = getDatabase();

   useEffect(() => {
      const dbRef = ref(db, '/');
      onValue(dbRef, (snap: DataSnapshot) => {
         const resp: SongProps[] = snap.val();
         setSongQueue(resp);
      });
   }, [db]);


   return (
      <SongQueueContext.Provider value={{ songQueue, setSongQueue }}>
         {children}
      </SongQueueContext.Provider>
   );
};
