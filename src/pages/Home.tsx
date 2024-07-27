import Page from '../components/Page';
import BackendStats from '../components/BackendStats';
import TabPlayer from '../components/TabPlayer';
import LatestSong from '../components/LatestSong';
import LibraryRoutes from '../components/LibraryRoutes';
import VolumeManager from '../components/VolumeManager';
import SuggestedSongs from '../components/SuggestedSongs';
import News from '../components/News';
import DeviceStatus from '../components/DeviceStatus';
import Finder from '../components/Finder';

export default function Home() {
   return (
      <Page className='p-5 flex flex-col gap-5' scrollY>
         <TabPlayer />
         <LibraryRoutes />
         <VolumeManager />
         <Finder />
         <LatestSong />
         <SuggestedSongs />
         <DeviceStatus />
         <BackendStats />
         <News />
      </Page>
   );
}