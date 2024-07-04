import { useContext } from "react";
import { SongQueueContext } from "../context/SongQueueProvider";

export const useSongQueue = () => {
   const context = useContext(SongQueueContext);

   if (!context) throw new Error('useSong must be used within a SongProvider');

   return context;
};
