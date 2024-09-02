import { Link } from 'react-router-dom'
import { ArtistProps } from '../../interfaces/interfaces'

interface LocalArtistLinkProps {
   artist: ArtistProps
   className?: string;
}

export default function ArtistLink({ artist, className }: LocalArtistLinkProps) {
   const { id, name, image } = artist;
   return (
      <Link to={`/artist/${id}`} className={`flex items-center gap-4 py-2 ${className && className}`}>
         <img src={image} className='h-20 rounded-full' loading='lazy' draggable={false} alt={`image of artist ${name}`} />
         <p className='text-xl'> {name} </p>
      </Link>
   );
}