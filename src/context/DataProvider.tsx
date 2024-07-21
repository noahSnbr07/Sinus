import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { SongProps } from '../interfaces/interfaces';
import { DataSnapshot, Database, getDatabase, onValue, ref } from 'firebase/database';

interface DataInterface {
   songs: SongProps[];
   playlists: SongProps[]
}

interface DataContextInterface {
   data: DataInterface;
   setData: Dispatch<SetStateAction<DataInterface>>;
}

export const DataContext = createContext<DataContextInterface | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [data, setData] = useState<DataInterface>({ songs: [], playlists: [] });
   const db: Database = getDatabase();

   useEffect(() => {
      const getDataFromFirebase = (location: string): Promise<SongProps[]> => {
         return new Promise((resolve) => {
            const dbRef = ref(db, location);
            onValue(dbRef, (snapshot: DataSnapshot) => {
               resolve(snapshot.val());
            });
         });
      };

      const fetchAllData = async () => {
         try {
            const songs = await getDataFromFirebase("/songs");
            console.log(songs)
            const playlists = await getDataFromFirebase("/playlists");
            setData({ songs, playlists });
         } catch (error) {
            console.error("Error fetching data from Firebase:", error);
         }
      };

      fetchAllData();
   }, [db]);

   return (
      <DataContext.Provider value={{ data, setData }}>
         {children}
      </DataContext.Provider>
   );
};
