import { Link } from 'react-router-dom'
import { ArtistProps } from '../../interfaces/interfaces'

interface LocalArtistLinkProps {
   artist: ArtistProps
}

export default function ArtistLink({ artist }: LocalArtistLinkProps) {
   const { id, name, image } = artist;
   return (
      <Link to={`/artist/${id}`} className='flex items-center gap-5 p-5'>
         <img src={image} className='h-20 rounded-full' loading='lazy' draggable={false} alt={`image of artist ${name}`} />
         <p className='text-white font-bold text-xl'> {name} </p>
      </Link>
   );
}