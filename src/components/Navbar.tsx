import getFormattedPath from '../functions/getFormattedPath';
import { back } from '../images';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
   const navigate: NavigateFunction = useNavigate();
   const location: Location = useLocation();

   const currentPathName: string = getFormattedPath(location.pathname);
   const isHomePath: boolean = location.pathname === "/";

   const goBack = (pathname: string) => {
      switch (pathname) {
         case "/": break;
         case "/settings/membership":
         case "/settings/preferences":
         case "/settings/account":
            navigate("/settings"); break;
         case "/shop/": navigate("/settings/membership"); break;
         default: navigate("/"); break;
      }
   };

   const isInPlayer = location.pathname.includes("player");

   return (
      <header className={`w-screen h-20 ${!isInPlayer && 'bg-stack-light'}`}>
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