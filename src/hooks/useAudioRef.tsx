import { useContext } from "react";
import AudioRefContext from "../context/AudioRefProvider";

export const useAudioRef = () => {
   const context = useContext(AudioRefContext);

   if (!context) throw new Error('useAudioRef must be used within a AudioRefProvider');

   return context;
};
