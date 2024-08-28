import { createContext, useState, ReactNode, Dispatch, SetStateAction, RefObject } from 'react';

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

   return (
      <AudioRefContext.Provider value={{ reference, setReference }}>
         {children}
      </AudioRefContext.Provider>
   );
};

export default AudioRefContext;