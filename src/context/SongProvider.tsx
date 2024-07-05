import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
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
   id: 1,
   name: "Dalai Lama",
   artist: "Rammstein",
   cover: "https://cdns-images.dzcdn.net/images/cover/633b009c486f17d1aef7fef6b1151201/350x350.jpg",
   audio: "https://firebasestorage.googleapis.com/v0/b/sinus-app.appspot.com/o/audio%2F1.mp3?alt=media&token=e80ea39a-f7d0-4219-b17e-622d8e37ec17",
   length: 358,
   isExplicit: false,
   release: "2022"
};

// Create a provider component
export const SongProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [song, setSong] = useState<SongProps>(initialValue);

   return (
      <SongContext.Provider value={{ song, setSong }}>
         {children}
      </SongContext.Provider>
   );
};