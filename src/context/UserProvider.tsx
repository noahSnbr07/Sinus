import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { UserProps } from "../interfaces/interfaces";

interface UserContextType {
   user: UserProps;
   setUser: Dispatch<SetStateAction<UserProps>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialValue: UserProps = {
   id: 0,
   name: "Default User",
   password: "password",
   gender: "male",
   membership: "Basic",
   image: ""
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<UserProps>(initialValue);

   return (
      <UserContext.Provider value={{ user, setUser }}>
         {children}
      </UserContext.Provider>
   );
};

export default UserContext;