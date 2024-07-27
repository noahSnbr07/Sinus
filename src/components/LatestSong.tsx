import { NavigateFunction, useNavigate } from 'react-router-dom';
import { timing } from '../images';
import { useData } from '../hooks/useData';

export default function LatestSong() {
   const { data } = useData();

   const latestSong = data.songs[data.songs.length - 1];

   const navigate: NavigateFunction = useNavigate();
   const gotoSong = (): void => navigate(`/Player/${data.songs[data.songs.length - 1].id}`);


   //placeholder for the image 
   const LatestSongImage = (): JSX.Element => {
      return (
         <>
            {latestSong ? (
               <img
                  loading='lazy'
                  draggable={false}
                  className='h-full aspect-square rounded-md'
                  src={latestSong.cover}
                  alt={`Latest Song: ${latestSong.name}`} />
            ) : (
               <div className='bg-stack h-[640px] aspect-square rounded-lg'>
               </div>
            )}
         </>
      );
   }

   //placehodler for the text
   const LatestSongText = (): JSX.Element => {
      return (
         <div>
            {latestSong ? (
               <div className='flex flex-col gap-1 text-white'>
                  <p className='text-xl'>{latestSong && latestSong.name}</p>
                  <p className='italic text-stack-neutral'>{latestSong.artist}</p>
               </div>
            ) : (
               <div className='flex flex-col gap-1'>
                  <span className='bg-stack rounded-full w-full' > &nbsp; </span>
                  <span className='bg-stack rounded-full w-full' > &nbsp; </span>
               </div>
            )}
         </div>
      );
   }

   return (
      <>
         <div className='w-full aspect-square bg-light-1 p-2 rounded-xl flex flex-col gap-5'>
            <div className='text-stack-neutral text-xl flex gap-2'>
               <img src={timing} loading='lazy' draggable={false} alt='timing icon' />
               <p className='text-white'>  {"Most recent Song"} </p>
            </div>
            <div className='flex flex-col gap-5'>
               <LatestSongImage />
               <LatestSongText />
               <button
                  onClick={gotoSong}
                  className='w-full p-5 bg-accent rounded-md text-xl text-white'>
                  <b> {"Play it now"} </b>
               </button>
            </div>
         </div>
      </>
   );
}