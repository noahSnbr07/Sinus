import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

export const useData = () => {
   const context = useContext(DataContext);

   if (!context) throw new Error('useSong must be used within a SongProvider');

   return context;
};
