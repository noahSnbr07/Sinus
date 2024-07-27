import { createContext, useState, ReactNode, Dispatch, SetStateAction, RefObject, useEffect } from 'react';
import { useSong } from '../hooks/useSong';
import { useData } from '../hooks/useData';

interface AudioRefContextType {
   reference: RefObject<HTMLAudioElement> | null,
   setReference: Dispatch<SetStateAction<RefObject<HTMLAudioElement> | null>>,
}

const AudioRefContext = createContext<AudioRefContextType | undefined>(undefined);

interface AudioRefProviderProps {
   children: ReactNode;
}

export const AudioRefProvider: React.FC<AudioRefProviderProps> = ({ children }) => {
   const [reference, setReference] = useState<RefObject<HTMLAudioElement> | null>(null);

   const { song, setSong } = useSong();
   const { data } = useData();

   const handleAudioPlayback = async () => {
      if (song.id >= data.songs.length - 1) return;
      if (reference && reference.current) {
         const nextSong = data.songs[song.id + 1];
         reference.current.onended = () => setSong(nextSong);

         try {
            await reference.current.pause();
            await reference.current.play();
         } catch (error) {
            console.error('Error during audio playback:', error);
         }
      }
   };

   useEffect(() => { handleAudioPlayback(); }, [song]);

   return (
      <AudioRefContext.Provider value={{ reference, setReference }}>
         {children}
      </AudioRefContext.Provider>
   );
};

export default AudioRefContext;