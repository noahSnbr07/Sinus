import { PlaylistProps } from '../../interfaces/interfaces'
import { Link } from 'react-router-dom';

type PlaylistLinkProps = {
   playlistParam: PlaylistProps;
}
export default function PlaylistLink({ playlistParam }: PlaylistLinkProps) {

   //extract the properties of playlist
   const { id, name, cover, songs, publication }: PlaylistProps = playlistParam;

   return (
      <button className='border-light-1 border-b-2 px-5 py-2 w-full'>
         <Link to={`/playlist/${id}`} className='flex gap-2'>
            <img src={cover} alt={`cover of the playlist: ${name}`} loading='lazy' draggable={false} className='h-20 rounded-xl' />
            <div className='flex flex-col gap-1 text-white items-start'>
               <p className='text-xl'> {name} </p>
               <p> {songs.length} {"Songs"} {"·"} {publication} </p>
            </div>
         </Link>
      </button>
   );
}