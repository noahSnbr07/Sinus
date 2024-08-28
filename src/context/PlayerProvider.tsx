import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { PlayerProps, SongProps } from '../interfaces/interfaces';
import { useAudioRef } from '../hooks/useAudioRef';
import { useData } from '../hooks/useData';
import { useSong } from '../hooks/useSong';

interface PlayerContextType {
   player: PlayerProps,
   setPlayer: Dispatch<SetStateAction<PlayerProps>>,
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
   const { reference } = useAudioRef();
   const { data } = useData();
   const { song, setSong } = useSong();

   // Initial Player Object
   const initialValue: PlayerProps = {
      progress: 0,
      isPlaying: true,
      mode: 'auto',
      togglePlayer: () => void {},
      play: () => void {},
      pause: () => void {},
      skipNext: () => void {},
      skipPrev: () => void {},
   };

   const [player, setPlayer] = useState<PlayerProps>(initialValue);

   //media session provider 
   if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
         title: song && song.name,
         artist: song && song.artist,

         artwork: [
            {
               src: song && song.cover,
               sizes: "640x640",
               type: "image/png",
            },
         ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
         player.play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
         player.pause();
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
         player.skipPrev();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
         player.skipNext();
      });
   }

   // Update progress and duration every 1000 milliseconds
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

   // Local function to toggle whether the player is active or not
   const togglePlayerLocal = () => {
      setPlayer((prev: PlayerProps) => ({ ...prev, isPlaying: !prev.isPlaying }));
   };

   const playLocal = () => {
      setPlayer((prev) => ({ ...prev, isPlaying: true }));
      reference?.current?.play();
   };

   const pauseLocal = () => {
      setPlayer((prev) => ({ ...prev, isPlaying: false }));
      reference?.current?.pause();
   };

   const skipNextLocal = () => {
      let currentIndex = data.songs.findIndex(s => s.id === song.id);
      const randomSongIndex: number = data.songs[Math.floor(Math.random() * data.songs.length - 1)].id;
      if (player.mode === 'shuffle') currentIndex = randomSongIndex;
      const nextIndex = currentIndex + 1 > data.songs.length ? 0 : currentIndex + 1;

      if (nextIndex >= data.songs.length) setSong(data.songs[0]);
      else setSong(data.songs[nextIndex]);
   };

   const skipPrevLocal = () => {
      const currentIndex = data.songs.findIndex(s => s.id === song.id);
      const prevIndex = currentIndex - 1;

      if (prevIndex < 0) setSong(data.songs[data.songs.length - 1]);
      else setSong(data.songs[prevIndex]);
   };

   const getNextSong = (): SongProps => {
      const mode: string = player.mode;
      let nextSong: SongProps;

      switch (mode) {
         case "auto": {
            const nextIndex = (data.songs.findIndex(s => s.id === song.id) + 1) % data.songs.length;
            nextSong = data.songs[nextIndex];
            break;
         }
         case "repeat": {
            nextSong = song; // Repeat the same song
            break;
         }
         case "shuffle": {
            let randomIndex;
            do {
               randomIndex = Math.floor(Math.random() * data.songs.length);
            }
            while (data.songs[randomIndex].id === song.id);
            nextSong = data.songs[randomIndex];
            break;
         }
         default: {
            nextSong = song;
         }
      }
      return nextSong;
   };

   const handleAudioPlayback = async () => {
      if (song.id >= data.songs.length) return;
      if (reference && reference.current) {
         reference.current.onended = async () => {
            const nextSong: SongProps = getNextSong();
            setSong(nextSong);
            reference.current!.currentTime = 0;
            await reference.current!.play();
         };

         try {
            await reference.current.pause();
            await reference.current.play();
         } catch (error) {
            console.error('Error during audio playback:', error);
         }
      }
   };

   useEffect(() => { handleAudioPlayback(); }, [song]);

   // Apply the local function when setPlayer is called
   useEffect(() => {
      setPlayer((prev: PlayerProps) => ({
         ...prev,
         togglePlayer: togglePlayerLocal,
         play: playLocal,
         pause: pauseLocal,
         skipNext: skipNextLocal,
         skipPrev: skipPrevLocal,
      }));
   }, [setPlayer, data, song]);

   // Toggles the player's state
   useEffect(() => {
      player.isPlaying ? reference?.current?.play() : reference?.current?.pause();
   }, [player.isPlaying]);

   return (
      <PlayerContext.Provider value={{ player, setPlayer }}>
         {children}
      </PlayerContext.Provider>
   );
};