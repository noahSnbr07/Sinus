import getFormattedPath from '../functions/getFormattedPath';
import { back } from '../images'
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {

   //react router variables
   const navigate: NavigateFunction = useNavigate();
   const location: Location = useLocation();

   const currentPathName: string = getFormattedPath(location.pathname);
   const isHomePath: boolean = location.pathname === "/Home";
   const goBack = () => void navigate("/Home");

   const isInPlayer = location.pathname.includes("Player");

   return (
      <header className={`w-screen h-20 ${!isInPlayer && 'bg-stack-light'}`}>
         <nav className='w-full h-full flex justify-between items-center p-5 gap-5'>
            <div className='flex'>
               <button onClick={() => void goBack()}>
                  {!isHomePath && <img src={back} alt='back button icon' draggable={false} />}
               </button>
               <h1 className='text-white text-xl'> {currentPathName} </h1>
            </div>
         </nav>
      </header>
   );
}