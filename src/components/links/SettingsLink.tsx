
import { Link } from 'react-router-dom'
import { open } from '../../images';
import { SettingsLinkProps } from '../../interfaces/interfaces';

//link to a deeper nested Settings page
export default function SettingsLink({ label = "", url = "/" }: SettingsLinkProps) {
   return (
      <Link
         to={url}
         className='w-full p-5 flex gap-2 text-white justify-between border-light-1 border-b-2'>
         <p> {label} </p>
         <img src={open} draggable={false} loading='lazy' />
      </Link>
   );
}