import { useEffect, useState } from 'react';
import { useSong } from '../../hooks/useSong';
import { explicit } from '../../images';
import { SongProps, TagProps } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type SongLinkProps = {
   songParam: SongProps;
   className?: string;
   delayIndex: number;
}

export default function SongLink({ songParam, className, delayIndex }: SongLinkProps) {

   // Destructure the song into its properties
   const { id, name, artist, cover, isExplicit, tags } = songParam;
   const { song, setSong } = useSong();
   const [sortedTags, setSortedTags] = useState<string[]>([]);

   // Boolean to indicate whether the song is currently playing or not
   const isPlaying: boolean = song.name === songParam.name;

   // Sort the tags and extract name from object Tag
   useEffect(() => {
      let newTags: string[] = [];
      tags.map((tag: TagProps) => { newTags.push(tag.label); });
      newTags = newTags.sort();
      setSortedTags(newTags);
   }, [tags]);

   return (
      <motion.button
         initial={{ opacity: 0, scale: 0, }}
         animate={{ opacity: 1, scale: 1, }}
         transition={{ delay: delayIndex * 0.02, duration: 0.5, }}
         onClick={() => setSong(song)}
         tabIndex={1}
         className={`lg:w-1/2 flex xl:w-1/3 w-full ${className ? className : ''}`}>

         <Link
            to={`/player/${id}`}
            className='flex items-center w-full h-full py-2 gap-2'>
            <div className='flex gap-2'>
               <img
                  className='h-20 rounded-xl object-contain'
                  loading='lazy'
                  draggable={false}
                  src={cover}
                  alt={`cover of ${name}`} />
               <div className='text-start flex flex-col'>
                  <p className={`text-xl flex gap-2 ${isPlaying && "text-accent"}`}>
                     {isExplicit && (<img src={explicit} alt={`${song.name} is marked with explicit content`} />)}
                     {name}
                  </p>
                  <p className='opacity-50'>
                     {artist}
                  </p>
                  <div className='w-full flex gap-2'>
                     {sortedTags.map((tag: string, i: number) =>
                        <span key={i} className='bg-light-1 rounded-full text-sm px-2 py-0.5'> {tag} </span>)
                     }
                  </div>
               </div>
            </div>
         </Link>
      </motion.button>
   );
}