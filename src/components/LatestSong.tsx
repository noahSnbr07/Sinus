import { NavigateFunction, useNavigate } from 'react-router-dom';
import { timing } from '../images';
import { useData } from '../hooks/useData';

export default function LatestSong() {
   const { data } = useData();

   const latestSong = data.songs[data.songs.length - 1];

   const navigate: NavigateFunction = useNavigate();


   return (
      <>
         {latestSong ? (
            <div className='w-full aspect-square bg-stack-light p-2 rounded-xl flex flex-col gap-5'>
               <p className='text-stack-neutral text-xl flex gap-2'>
                  <img src={timing} loading='lazy' draggable={false} alt='timing icon' />
                  {"Most recent Song"}
               </p>
               <div className='flex flex-col gap-5'>
                  <img className='h-full aspect-square rounded-md' src={latestSong.cover} alt={`Latest Song: ${latestSong.name}`} />
                  <div className='flex flex-col text-white'>
                     <p className='text-xl w-60 truncate'>{latestSong.name}</p>
                     <p className='italic text-stack-neutral'>{latestSong.artist}</p>
                  </div>
                  <button
                     onClick={() => void navigate(`/Player/${data.songs[data.songs.length - 1].id}`)}
                     className='w-full p-5 bg-accent rounded-md text-xl text-white'>
                     <b>  {"Play it now"} </b>
                  </button>
               </div>
            </div>
         ) : (
            <p className='text-white'>loading ...</p>
         )}
      </>
   );
}