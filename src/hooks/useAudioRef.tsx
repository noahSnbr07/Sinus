import { useContext } from "react";
import AudioRefContext from "../context/AudioRefProvider";

export const useAudioRef = () => {
   const context = useContext(AudioRefContext);

   if (!context) throw new Error('useSong must be used within a SongProvider');

   return context;
};
