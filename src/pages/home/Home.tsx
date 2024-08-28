import Page from '../../components/Page';
import BackendStats from './components/BackendStats';
import TabPlayer from './components/TabPlayer';
import LatestSong from './components/LatestSong';
import LibraryRoutes from './components/LibraryRoutes';
import VolumeManager from './components/VolumeManager';
import SuggestedSongs from './components/SuggestedSongs';
import News from './components/News';
import DeviceStatus from './components/DeviceStatus';
import Finder from './components/Finder';
import ModeToggler from './components/ModeToggler';

import { motion } from 'framer-motion';
import { PuffLoader, } from 'react-spinners';
import { useData } from '../../hooks/useData';
import { useEffect, useState } from 'react';
import QuickMessage from './components/QuickMessage';

//render component as individual tabs
export default function Home() {

   //store the components in a list to render them
   const components: JSX.Element[] = [
      <TabPlayer />,
      <ModeToggler />,
      <LibraryRoutes />,
      <VolumeManager />,
      <Finder />,
      <LatestSong />,
      <SuggestedSongs />,
      <DeviceStatus />,
      <BackendStats />,
      <News />,
      <QuickMessage />,
   ];

   //import the data to
   const { data } = useData();
   const [clientReady, setClientReady] = useState<boolean>(false);

   //ensure contents are fully loaded to prevent navigation errors
   useEffect(() => { if (data.songs.length > 0 && data.artists.length > 0 && data.playlists.length > 0) setClientReady(true) }, [data]);

   const LoadingScreen = (): JSX.Element => {
      return (
         <div className='flex flex-1 justify-center items-center gap-8 flex-col'>
            <p className='text-xl'> Loading contents ... </p>
            <PuffLoader color='white' size={100} />
         </div>
      );
   }

   return (
      <Page className='p-5 flex flex-col gap-5' scrollY>
         {clientReady ? (
            components.map((component: JSX.Element, _: number) =>
               <motion.div
                  key={_}
                  initial={{ opacity: 0, y: `${_ * 100}px` }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: _ * .1 }}
               >
                  {component}
               </motion.div>
            )
         ) : <LoadingScreen />}
      </Page>
   );
}