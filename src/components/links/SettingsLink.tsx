
import { Link } from 'react-router-dom'
import { open } from '../../images';
import { SettingsLinkProps } from '../../interfaces/interfaces';

//link to a deeper nested Settings page
export default function SettingsLink({ label = "", url = "/" }: SettingsLinkProps) {
   return (
      <Link
         to={url}
         className='w-full justify-between p-5 flex gap-2 even:border-b-2 even:bg-light-1 border-stack'>
         <p> {label} </p>
         <img src={open} draggable={false} loading='lazy' />
      </Link >
   );
}