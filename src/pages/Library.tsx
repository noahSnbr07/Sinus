import { SongProps } from '../interfaces/interfaces';
import SongLink from '../components/SongLink';
import Page from '../components/Page';
import { Link } from 'react-router-dom';
import { add_white } from '../images';
import { useData } from '../hooks/useData';
export default function Library() {

   const { data } = useData();


   const UploadSongButton: React.FC = (): JSX.Element => {
      return (
         <button className='w-full' tabIndex={1}>
            <Link to={`/upload`} className='flex justify-between items-center w-full h-full px-5 py-2 gap-2'>
               <div className='flex gap-2'>
                  <img
                     className='h-20 rounded-lg object-contain bg-stack-light'
                     loading='lazy'
                     draggable={false}
                     src={add_white}
                     alt={`add your song to the collection}`} />
                  <div className='text-start flex items-center'>
                     <p className='text-white'> {"Add your own Song"} </p>
                  </div>
               </div>
            </Link>
         </button>
      )
   }

   return (
      <Page scrollY>
         {data.songs.map((song: SongProps) => <SongLink key={song.id} songParam={song} />)}
         <UploadSongButton />
      </Page>
   );
}