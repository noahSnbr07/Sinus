import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { ArtistProps, BugReportProps, PlaylistProps, SongProps, UserProps } from '../interfaces/interfaces';
import { DataSnapshot, Database, getDatabase, onValue, ref } from 'firebase/database';

interface DataInterface {
   songs: SongProps[];
   playlists: PlaylistProps[];
   artists: ArtistProps[];
   users: UserProps[];
   reports: BugReportProps[];
}

interface DataContextInterface {
   data: DataInterface;
   setData: Dispatch<SetStateAction<DataInterface>>;
}

export const DataContext = createContext<DataContextInterface | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [data, setData] = useState<DataInterface>({ songs: [], playlists: [], artists: [], users: [], reports: [] });
   const db: Database = getDatabase();

   useEffect(() => { console.log(data) }, [data]);

   useEffect(() => {
      const getDataFromFirebase = <T,>(location: string): Promise<T[]> => {
         return new Promise((resolve, reject) => {
            const dbRef = ref(db, location);
            onValue(dbRef, (snapshot: DataSnapshot) => {
               const data: T[] = snapshot.val();
               if (data) {
                  resolve(data);
               } else {
                  reject(new Error(`No data available at location: ${location}`));
               }
            }, (error) => {
               reject(error);
            });
         });
      };

      const fetchAllData = async () => {
         try {
            const songs = await getDataFromFirebase<SongProps>("/songs");
            const playlists = await getDataFromFirebase<PlaylistProps>("/playlists");
            const artists = await getDataFromFirebase<ArtistProps>("/artists");
            const users = await getDataFromFirebase<UserProps>("/users");
            const reports = await getDataFromFirebase<BugReportProps>("/reports");
            setData({ songs, playlists, artists, users, reports });
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