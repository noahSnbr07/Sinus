import { Params, useParams } from 'react-router-dom';
import Page from '../components/Page';
import { useData } from '../hooks/useData';
import { PlaylistProps, SongProps } from '../interfaces/interfaces';
import getTotalLength from '../functions/getTotalLength';
import { play } from '../images';
import SongLink from '../components/SongLink';
import { useSong } from '../hooks/useSong';
import { useEffect, useState } from 'react';

export default function Playlist() {

   const { data } = useData();
   const { playlistIndex }: Readonly<Params<string>> = useParams();
   const playlist: PlaylistProps = data.playlists[Number(playlistIndex)];
   const { setSong } = useSong();

   const [songs, setSongs] = useState<SongProps[]>([]);
   const totalDuration: string = getTotalLength(songs);

   useEffect(() => {
      const newList: SongProps[] = playlist.songs.map((songId: number): SongProps => {
         return data.songs[songId];
      });
      setSongs(newList);
   }, [data.songs, playlist.songs]);

   const PlaylistImage = (): JSX.Element => {
      return (
         <div className='w-full aspect-square grid place-items-center'>
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
         <div className='flex flex-col text-white'>
            <p className='text-3xl'> {playlist.name} </p>
            <i> {totalDuration} </i>
         </div>
      );
   }

   const PlaylistDivider = (): JSX.Element => {
      const startPlayList = (): void => {
         setSong(songs[0]);
         console.log(songs[0])
      }

      return (
         <div className='flex gap-5 items-center'>
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
               <SongLink key={index} songParam={song} />
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
