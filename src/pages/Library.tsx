import { useEffect, useState } from 'react'
import { DataSnapshot, getDatabase, onValue, ref as databaseRef } from "firebase/database";
import { SongProps } from '../interfaces/interfaces';
import { app } from '../config/firebase';
import SongLink from '../components/SongLink';
import Page from '../components/Page';
import { Link } from 'react-router-dom';
import { add_white } from '../images';
export default function Library() {
   const db = getDatabase(app);

   const [data, setData] = useState<Array<SongProps>>([]);

   //retrieve the data from the database
   useEffect(() => {
      const dbRef = databaseRef(db, '/');
      onValue(dbRef, (snap: DataSnapshot) => {
         const data = snap.val();
         setData(data);
         console.log(data)
      });
   }, [db,]);

   const UploadSongButton: React.FC = (): JSX.Element => {
      return (
         <button className='w-full bg-stack-dark' tabIndex={1}>
            <Link to={`/Upload`} className='flex justify-between items-center w-full h-full px-5 py-2 gap-2'>
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
      <Page className='overflow-y-scroll'>
         {data.map((song: SongProps) => <SongLink key={song.id} songParam={song} />)}
         <UploadSongButton />
      </Page>
   );
}