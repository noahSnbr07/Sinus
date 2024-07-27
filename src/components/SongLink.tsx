import { useEffect, useState } from 'react';
import { useSong } from '../hooks/useSong';
import { explicit } from '../images';
import { SongProps, TagProps } from '../interfaces/interfaces';
import { Link } from 'react-router-dom';

type SongLinkProps = { songParam: SongProps; className?: string; }

//destructure the song into its properties
export default function SongLink({ songParam, className }: SongLinkProps) {

   const { id, name, artist, cover, isExplicit, tags } = songParam;
   const { song, setSong } = useSong();
   const [sortedTags, setSortedTags] = useState<string[]>([]);

   //sort the tags
   useEffect(() => {
      let newTags: string[] = [];
      tags.map((tag: TagProps) => { newTags.push(tag.label) });
      newTags = newTags.sort();
      setSortedTags(newTags);
   }, [tags]);

   return (
      <button onClick={() => void setSong(song)} tabIndex={1} className={`lg:w-1/2 xl:w-1/3 w-full ${className ? className : ''}`}>
         <Link to={`/player/${id}`} className='flex items-center w-full h-full py-2 gap-2'>
            <div className='flex gap-2'>
               <img
                  className='h-20 rounded-lg object-contain'
                  loading='lazy'
                  draggable={false}
                  src={cover}
                  alt={`cover of ${name}`} />
               <div className='text-start flex flex-col'>
                  <p className={`text-xl flex gap-2 ${song.name === songParam.name ? "text-accent" : "text-white"}`}>
                     {isExplicit && (<img src={explicit} alt={`${song.name} is marked with explicit content`} />)}
                     {name}
                  </p>
                  <p className='text-light-2' >
                     {artist}
                  </p>
                  <div className='w-full flex gap-2'>
                     {sortedTags.map((tag: string, i: number) =>
                        <span key={i} className='bg-light-1 rounded-full text-white text-sm px-2 py-0.5'> {tag} </span>)
                     }
                  </div>
               </div>
            </div>
         </Link>
      </button>
   );
}