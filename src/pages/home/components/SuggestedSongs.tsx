import { useEffect, useState } from 'react';
import { useData } from '../../../hooks/useData';
import { SongProps } from '../../../interfaces/interfaces';
import { refresh, shuffle } from '../../../images';
import { Link } from 'react-router-dom';

export default function SuggestedSongs() {
   const { data } = useData();
   const [fiveSuggestedSongs, setFiveSuggestedSongs] = useState<SongProps[]>([]);

   const getSuggestedSongs = (): SongProps[] => {
      if (!data.songs || data.songs.length < 3) {
         return [];
      }

      //shuffle the songs
      const shuffledSongs = [...data.songs].sort(() => 0.5 - Math.random());

      //cut them down to 3 songs
      return shuffledSongs.slice(0, 3);
   };

   useEffect(() => {
      const selectedSongs = getSuggestedSongs();
      setFiveSuggestedSongs(selectedSongs);
   }, [data.songs]);

   const RenderedSongs = (): JSX.Element[] => {
      return (
         fiveSuggestedSongs.map((song: SongProps) => {
            const songLoaded: boolean = !!(song && song.cover && song.tags[0].label);
            return (
               <Link key={song.id} className='flex flex-col gap-2' to={`/player/${song.id}`}>
                  {songLoaded ? (<>
                     <img className='rounded-xl w-full aspect-square' src={song.cover} draggable={false} loading='lazy' />
                     <span className='px-2 py-1 text-center bg-light-2 rounded-full text-sm'> {song.tags[0].label} </span>
                  </>) : (
                     <>
                        {/* scaffolding placeholder */}
                        <img src={refresh} className='rounded-xl w-full aspect-square flex-1 bg-stack' />
                        <span className='px-2 py-1 text-center bg-light-2 rounded-full text-sm'>loading</span>
                     </>
                  )}
               </Link>)
         })
      );
   }

   return (
      <div className='rounded-xl flex flex-col text-white bg-light-1 p-2 gap-2'>
         <div className='text-xl flex gap-2'>
            <img
               src={shuffle}
               alt='try new songs icon'
               title='shuffle icon'
               draggable={false}
               loading='lazy' />
            <p className='font-bold text-xl'> {"Try these"} </p>
         </div>
         <div className='flex gap-2 w-full'>
            <RenderedSongs />
         </div>
      </div>
   );
}