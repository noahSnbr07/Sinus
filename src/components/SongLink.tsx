import { useSong } from '../hooks/useSong';
import { SongProps } from '../interfaces/interfaces';
import { Link } from 'react-router-dom';

type SongLinkProps = { songParam: SongProps; }

//destructure the song into its properties
export default function SongLink({ songParam }: SongLinkProps) {

   const { id, name, artist, cover, /* isExplicit, /* audio, length, release */ } = songParam;

   const { song, setSong } = useSong();

   return (
      <button onClick={() => void setSong(song)} className='w-full bg-stack-dark' tabIndex={1}>
         <Link to={`/Player/${id}`} className='flex justify-between items-center w-full h-full px-5 py-2 gap-2'>
            <div className='flex gap-2'>
               <img
                  className='h-20 rounded-lg object-contain'
                  loading='lazy'
                  draggable={false}
                  src={cover}
                  alt={`cover of ${name}`} />
               <div className='text-start'>
                  <b className={` text-xl ${song.name === songParam.name ? "text-accent" : "text-white"}`}> {name} </b>
                  <p className='text-stack-neutral' >
                     {artist}
                  </p>
               </div>
            </div>
         </Link>
      </button>
   );
}