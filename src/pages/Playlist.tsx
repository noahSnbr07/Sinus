import { Link, NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom';
import Page from '../components/Page';
import { useData } from '../hooks/useData';
import { PlaylistProps, SongProps } from '../interfaces/interfaces';
import getTotalLength from '../functions/getTotalLength';
import { bin, edit, play } from '../images';
import SongLink from '../components/links/SongLink';
import { useSong } from '../hooks/useSong';
import { useEffect, useState } from 'react';
import { ref, remove } from 'firebase/database';
import { database } from '../config/firebase';

export default function Playlist() {

   //get global context values
   const { data } = useData();
   const { setSong } = useSong();

   //get the id by the url params
   const { playlistIndex }: Readonly<Params<string>> = useParams();

   //hold the playlist by extracting it from the array
   const playlist: PlaylistProps = data.playlists[Number(playlistIndex)];

   const [songs, setSongs] = useState<SongProps[]>([]);

   //calculate the total playlist duration with custom function
   const totalDuration: string = getTotalLength(songs);

   const navigate: NavigateFunction = useNavigate();

   //update the local songs array
   useEffect(() => {
      const newList: SongProps[] = playlist.songs.map((songId: number): SongProps => {
         return data.songs[songId];
      });
      setSongs(newList);
   }, [data.songs, playlist.songs]);

   const PlaylistImage = (): JSX.Element => {
      return (
         <div className='w-full grid place-items-center'>
            <img
               className='w-1/2 rounded-xl'
               src={playlist.cover}
               alt={`cover of ${playlist.name}`}
               draggable={false}
               loading='lazy'
            />
         </div>
      );
   }

   const PlaylistInformation = (): JSX.Element => {
      return (
         <div className='flex flex-col '>
            <p className='text-3xl'> {playlist.name} </p>
            <i> {totalDuration} </i>
         </div>
      );
   }

   const PlaylistDivider = (): JSX.Element => {
      const startPlayList = (): void => {
         setSong(songs[0]);
      }
      const deletePlaylist = (): void => {
         remove(ref(database, `/playlists/${playlist.id}`));
         navigate("/");
      }

      return (
         <div className='flex gap-5 items-center '>
            <Link to={`/settings/publish/playlist/${playlist.id}`}>
               <img src={edit} alt='edit icon' loading='lazy' draggable={false} />
            </Link>
            <button onClick={deletePlaylist}>
               <img src={bin} alt='delete icon' loading='lazy' draggable={false} />
            </button>
            <span className='flex-1 h-[2px] rounded-full bg-stack' />
            <button onClick={startPlayList} className='bg-white p-2 rounded-full border-none'>
               <img src={play} alt='play playlist' loading='lazy' className='h-10' draggable={false} />
            </button>
         </div>
      );
   }

   const PlaylistQueue = (): JSX.Element => {
      return (
         <div className='flex flex-col'>
            {songs.map((song: SongProps, index: number) => (
               <SongLink key={index} songParam={song} delayIndex={index} />
            ))}
         </div>
      );
   }

   return (
      <Page className='p-5 flex flex-col gap-5 overflow-y-scroll'>
         <PlaylistImage />
         <PlaylistInformation />
         <PlaylistDivider />
         <PlaylistQueue />
      </Page>
   );
}