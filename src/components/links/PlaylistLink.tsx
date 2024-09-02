import { PlaylistProps } from '../../interfaces/interfaces'
import { Link } from 'react-router-dom';

type PlaylistLinkProps = {
   playlistParam: PlaylistProps;
}
export default function PlaylistLink({ playlistParam }: PlaylistLinkProps) {

   //extract the properties of playlist
   const { id, name, cover, songs, publication }: PlaylistProps = playlistParam;

   return (
      <button className='py-2 px-4 w-full'>
         <Link to={`/playlist/${id}`} className='flex gap-4'>
            <img src={cover} alt={`cover of the playlist: ${name}`} loading='lazy' draggable={false} className='h-20 rounded-xl' />
            <div className='flex items-start flex-col gap-1'>
               <p className='text-xl'> {name} </p>
               <p> {songs.length} {"Songs"} {"·"} {publication} </p>
            </div>
         </Link >
      </button >
   );
}