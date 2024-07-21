import { useSong } from '../hooks/useSong';
import { explicit } from '../images';
import { SongProps, TagProps } from '../interfaces/interfaces';
import { Link } from 'react-router-dom';

type SongLinkProps = { songParam: SongProps; }

//destructure the song into its properties
export default function SongLink({ songParam }: SongLinkProps) {

   const { id, name, artist, cover, isExplicit, tags } = songParam;

   const { song, setSong } = useSong();

   return (
      <button onClick={() => void setSong(song)} className='' tabIndex={1}>
         <Link to={`/player/${id}`} className='flex justify-between items-center w-full h-full px-5 py-2 gap-2'>
            <div className='flex gap-2'>
               <img
                  className='h-20 rounded-lg object-contain'
                  loading='lazy'
                  draggable={false}
                  src={cover}
                  alt={`cover of ${name}`} />
               <div className='text-start flex flex-col'>
                  <p className={`truncate w-60 text-xl flex gap-2 ${song.name === songParam.name ? "text-accent" : "text-white"}`}>
                     {isExplicit && (<img src={explicit} alt={`${song.name} is marked with explicit content`} />)}
                     {name}
                  </p>
                  <p className='text-stack-neutral' >
                     {artist}
                  </p>
                  <div className='w-full flex gap-2'>
                     {tags.map((tag: TagProps, i: number) =>
                        <span key={i} className='bg-stack-light text-white rounded-full px-2 py-1 text-sm'> {tag.label} </span>
                     )}
                  </div>
               </div>
            </div>
         </Link>
      </button>
   );
}