import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { PlayerProps } from '../interfaces/interfaces';
import { useAudioRef } from '../hooks/useAudioRef';

interface PlayerContextType {
   player: PlayerProps,
   setPlayer: Dispatch<SetStateAction<PlayerProps>>,
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
   const { reference } = useAudioRef();

   const initialValue: PlayerProps = {
      progress: 0,
      isPlaying: false,
      isLooping: true,
      isShuffling: false,
      togglePlayer: () => { },
   };

   const [player, setPlayer] = useState<PlayerProps>(initialValue);

   useEffect(() => {
      const updateProgress = () => {
         setPlayer((prev: PlayerProps) => ({
            ...prev,
            progress: reference?.current?.currentTime ?? 0,
         }));
      };

      const interval = setInterval(updateProgress, 1000);

      return () => clearInterval(interval);
   }, [reference, setPlayer]);

   const togglePlayerLocal = () => {
      setPlayer((prev: PlayerProps) => ({ ...prev, isPlaying: !prev.isPlaying }));
   };

   useEffect(() => {
      setPlayer((prev: PlayerProps) => ({
         ...prev,
         togglePlayer: togglePlayerLocal,
      }));
   }, [setPlayer,]);

   useEffect(() => {
      player.isPlaying ? reference?.current?.play() : reference?.current?.pause();
   }, [player.isPlaying]);

   return (
      <PlayerContext.Provider value={{ player, setPlayer }}>
         {children}
      </PlayerContext.Provider>
   );
};
