import getFormattedPath from '../functions/getFormattedPath';
import { back } from '../images';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
   const navigate: NavigateFunction = useNavigate();
   const location: Location = useLocation();

   const currentPathName: string = getFormattedPath(location.pathname);
   const isHomePath: boolean = location.pathname === "/";

   const goBack = (path: string) => {
      const isInspecting: { song: boolean; playlist: boolean; artist: boolean } = {
         song: path.includes("/player/"),
         playlist: path.includes("/playlist/"),
         artist: path.includes("/artist/"),
      }
      const isInSettings = {
         base: path === "/settings",
         account: path === '/settings/account',
         preferences: path === '/settings/preferences',
         membership: path === '/settings/membership',
         upload: path === '/settings/upload',
      }
      const isInLibrary: boolean = path === '/library/songs' || path === '/library/playlists' || path == '/library/artists';
      const isInSlices: boolean = path.includes("/slices");
      const isInShop: boolean = path.includes("/shop/");

      if (isInSettings.base) navigate("/");
      if (isInShop) navigate("/settings/membership");
      if (isInSlices) navigate("/");
      if (isInSettings.account || isInSettings.membership || isInSettings.preferences || isInSettings.upload) navigate("/settings");

      if (isInspecting.song) navigate(`/library/${'songs'}`)
      if (isInspecting.playlist) navigate(`/library/${'playlists'}`)
      if (isInspecting.artist) navigate(`/library/${'artists'}`)
      if (isInLibrary) navigate("/");
   };

   return (
      <header className={`w-screen h-20 bg-light-1`}>
         <nav className='w-full h-full flex items-center px-5'>
            <div className='flex'>
               <button className='mr-2' onClick={() => goBack(location.pathname)}>
                  {!isHomePath && <img src={back} alt='back button icon' draggable={false} />}
               </button>
               <h1 className='text-white text-xl'>{currentPathName}</h1>
            </div>
         </nav>
      </header>
   );
}