import { useContext } from "react";
import { PlayerContext } from "../context/PlayerProvider";

export const usePlayer = () => {
   const context = useContext(PlayerContext);

   if (!context) throw new Error('useSong must be used within a SongProvider');

   return context;
};
