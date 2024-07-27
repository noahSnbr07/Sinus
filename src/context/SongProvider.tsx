import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { SongProps } from '../interfaces/interfaces';

//define the context interface
interface SongContextType {
   song: SongProps;
   setSong: Dispatch<SetStateAction<SongProps>>;
}

//create the context with default values
export const SongContext = createContext<SongContextType | undefined>(undefined);

//holds the default value
const initialValue: SongProps = {
   artist: "Lil Peep",
   audio: "https://firebasestorage.googleapis.com/v0/b/sinus-app.appspot.com/o/audio%2F0.mp3?alt=media&token=42091c5a-772b-42e1-95ba-716901abcd34",
   cover: "https://i.scdn.co/image/ab67616d0000b273eb998de81063e6f2e2c4c2bd",
   highlight: 149,
   id: 0,
   isExplicit: true,
   length: 232,
   name: "Save That Shit",
   publisher: "User #2345",
   release: "04.06:2024 - 16:29",
   tags: [
      {
         "color": "magenta",
         "id": 14,
         "label": "Cloud Rap"
      },
      {
         "color": "lime",
         "id": 10,
         "label": "Punk"
      },
      {
         "color": "gold",
         "id": 12,
         "label": "Trap"
      }
   ]
}

// Create a provider component
export const SongProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [song, setSong] = useState<SongProps>(initialValue);

   return (
      <SongContext.Provider value={{ song, setSong }}>
         {children}
      </SongContext.Provider>
   );
};