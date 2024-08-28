import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { ArtistProps, BugReportProps, PlaylistProps, SongProps, UserProps } from '../interfaces/interfaces';
import { DataSnapshot, Database, getDatabase, onValue, ref } from 'firebase/database';

interface DataInterface {
   songs: SongProps[];
   playlists: PlaylistProps[];
   artists: ArtistProps[];
   users: UserProps[];
   reports: BugReportProps[];
   message: string;
}

interface DataContextInterface {
   data: DataInterface;
   setData: Dispatch<SetStateAction<DataInterface>>;
}

export const DataContext = createContext<DataContextInterface | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [data, setData] = useState<DataInterface>({
      songs: [],
      playlists: [],
      artists: [],
      users: [],
      reports: [],
      message: ''
   });
   const db: Database = getDatabase();

   useEffect(() => {
      // Function to handle updates from Firebase
      const handleDataUpdate = <T,>(location: string, key: keyof DataInterface) => {
         const dbRef = ref(db, location);
         onValue(dbRef, (snapshot: DataSnapshot) => {
            const updatedData: T[] = snapshot.val() || [];
            console.warn("DB Contents changed at", location);

            // Update the specific key in the data state
            setData(prevData => ({
               ...prevData,
               [key]: updatedData
            }));
         }, (error) => {
            console.error(`Error fetching data from ${location}:`, error);
         });
      };

      // Set up listeners for each data type
      handleDataUpdate<SongProps>("/songs", "songs");
      handleDataUpdate<PlaylistProps>("/playlists", "playlists");
      handleDataUpdate<ArtistProps>("/artists", "artists");
      handleDataUpdate<UserProps>("/users", "users");
      handleDataUpdate<BugReportProps>("/reports", "reports");
      handleDataUpdate<string>("/message", "message");

   }, [db]);

   return (
      <DataContext.Provider value={{ data, setData }}>
         {children}
      </DataContext.Provider>
   );
};
