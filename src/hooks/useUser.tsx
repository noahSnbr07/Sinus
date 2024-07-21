import { useContext } from "react";
import UserContext from "../context/UserProvider";

export const useUser = () => {
   const context = useContext(UserContext);

   if (!context) throw new Error('useUSer must be used within a SongProvider');

   return context;
};