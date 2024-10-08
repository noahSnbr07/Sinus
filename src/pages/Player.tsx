import { useParams } from 'react-router-dom';
import Page from '../components/Page';
import { app } from '../config/firebase';
import { FirebaseStorage, getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { RefObject, useEffect, useRef, useState } from 'react';
import { useSong } from '../hooks/useSong';
import { usePlayer } from '../hooks/usePlayer';
import { next, pause_black, play, prev } from '../images';
import { useAudioRef } from '../hooks/useAudioRef';
import { secondsToTimeString } from '../functions/timeConverter';
import { PlayerProps } from '../interfaces/interfaces';
import { useData } from '../hooks/useData';

export default function Player() {
   const { songIndex } = useParams<string>();

   // custom hooks for context values
   const { song, setSong } = useSong();
   const { player, setPlayer } = usePlayer();
   const { setReference } = useAudioRef();
   const { data } = useData();

   const scrollRef = useRef<HTMLDivElement>(null);

   const storage: FirebaseStorage = getStorage(app);
   const [/* fileUrl */, setFileUrl] = useState<string>('');

   // get the current song from the cloud storage
   useEffect(() => {
      const fetchFile = async () => {
         if (songIndex !== undefined) {
            try {
               const storageRefPath = storageRef(storage, `/audio/${songIndex}.mp3`);
               const url = await getDownloadURL(storageRefPath);
               setFileUrl(url);
               setSong(data.songs![parseInt(songIndex)]);
            } catch (error: unknown) {
               if (error instanceof Error) {
                  console.error('Error fetching file:', error.message);
               } else {
                  console.error('Unexpected error:', error);
               }
            }
         }
      };

      fetchFile();
   }, [songIndex, setSong, setFileUrl, data.songs, storage]);

   //controls e.g.: play, skip, prev, next
   const Controls = () => {
      const updateProgress = (e: React.ChangeEvent<HTMLInputElement>): void => {
         const newValue: number = Number(e.target.value);

         //update the global reference
         setReference((prev: RefObject<HTMLAudioElement> | null) => {
            if (prev && prev.current) {
               prev.current.currentTime = newValue;
            }
            return prev;
         });

         //update the player
         setPlayer((prev: PlayerProps) => ({ ...prev, progress: newValue }));
      }

      //returns name and artist isolated from other components
      const NameAndArtist = () => (
         <div className='flex flex-col'>
            <b className='text-2xl'> {song && song.name} </b>
            <p className='italic '> {song && song.artist} </p>
         </div>
      );

      //progressbar to indicate song current time
      const ProgressBar = () => (
         <div className='flex justify-between items-center gap-5'>
            <span> {secondsToTimeString(player.progress, false)} </span>
            <input
               type='range'
               min={0}
               max={song && song.length}
               value={player.progress}
               className='flex-1 appearance-none bg-stack rounded-full accent-white h-2'
               onChange={(e) => { updateProgress(e) }}
            />
            <span> {secondsToTimeString(song && song.length, false)} </span>
         </div>
      );

      const Buttons = () => (
         <div className='flex justify-center gap-16 items-center'>
            <button onClick={player.skipPrev}>
               <img className='scale-150' src={prev} alt='skip prev song icon' loading='lazy' draggable={false} />
            </button>
            <button
               onClick={() => player.togglePlayer()}
               className='bg-white rounded-full h-20 p-5 aspect-square grid place-items-center'>
               <img
                  className='h-full aspect-square'
                  src={player.isPlaying ? pause_black : play}
                  alt='toggle player'
                  loading='lazy'
                  draggable={false} />
            </button>
            <button onClick={player.skipNext}>
               <img className='scale-150' src={next} alt='skip next song icon' loading='lazy' draggable={false} />
            </button>
         </div>
      );

      return (
         <section className='flex flex-col gap-5  p-5 '>
            <NameAndArtist />
            <ProgressBar />
            <Buttons />
         </section>
      );
   }

   //big image to show cover
   const Cover = () => {
      return (
         <section className='grid place-items-center w-full aspect-square max-h-[350px]'>
            <img
               src={(song && song.cover) && song.cover}
               loading='lazy'
               alt={`this is the cover of the song "${(song && song.name) && song.name}" by "${(song && song.cover) && song.cover}"`}
               className='h-3/5 rounded-xl shadow-2xl'
            />
         </section>
      );
   }

   return (
      <Page className='flex'>
         <div className='backdrop-blur-3xl flex flex-1'>
            <img src={song && song.cover} className='absolute top-0 left-0 w-screen object-cover h-full' />
            <div className='backdrop-blur-3xl backdrop-brightness-50 flex-1 flex justify-between flex-col'>
               <Cover />
               <div ref={scrollRef} className='flex-1'>
               </div>
               <Controls />
            </div>
         </div>
      </Page>
   );
}