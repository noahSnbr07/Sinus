import { Params, useParams } from 'react-router-dom';
import { useData } from '../hooks/useData';
import Page from '../components/Page';
import { play, verified } from '../images';
import { CSSProperties, useState } from 'react';
import { SongProps } from '../interfaces/interfaces';
import SongLink from '../components/links/SongLink';

export default function Artist() {

   //grab the data from the backend
   const { data } = useData();

   //retrieve the index from the params
   const { artistIndex }: Readonly<Params<string>> = useParams();

   //get the artist
   const artist = data.artists[Number(artistIndex)];

   //extract the propertie sof artist
   const { /* id */ name, image, isVerified, /* songs */ } = artist;

   //predefine the styles for the banner image
   const headerImageStyle: CSSProperties = {
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
   };


   const QuickActionsPanel = () => {
      const [isFollowing, setFollowing] = useState<boolean>(false);

      //toggles the follow button locally
      const toggleFollow = () => setFollowing((prev: boolean) => !(prev));

      return (
         <div className='flex justify-between'>
            <div className='flex gap-5'>
               <button onClick={toggleFollow} className='text-white border-2 border-white py-1 px-2 rounded-lg'>
                  {isFollowing ? 'Unfollow' : 'Follow'}
               </button>
               {isVerified && <div className='flex gap-1 items-center'>
                  <img src={verified} draggable={false} loading='lazy' alt="verified icon w-full" />
                  <i className='text-white'> verified </i>
               </div>}
            </div>

            <button className='bg-accent aspect-square grid place-content-center rounded-full'>
               <img className='size-10' src={play} loading='lazy' draggable={false} alt="play icon" />
            </button>
         </div>
      );
   };

   //filter the songs and only return the ones by the artist
   const ArtistFilteredSongs = () => {
      const filteredSongs = [...data.songs].filter((song: SongProps) => song.artist === name);
      return (
         <div>
            {filteredSongs.map((song: SongProps) => <SongLink key={song.id} songParam={song} />)}
         </div>
      );
   };

   return (
      <Page scrollY className='flex flex-col gap-5'>
         <div style={headerImageStyle} className='h-64 bg-stack flex items-end px-5 py-2 pt-64'>
            <p className='text-5xl text-white'> {name} </p>
         </div>
         <div className='px-5 flex flex-col gap-5'>
            <QuickActionsPanel />
            <ArtistFilteredSongs />
         </div>
      </Page>
   );
}
