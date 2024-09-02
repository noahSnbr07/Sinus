import { useNavigate } from 'react-router-dom';
import getCurrentTime from '../functions/getCurrentTime';
import Page from './Page';

type ErrorFallbackProps = {
   error: Error;
   resetErrorBoundary?: () => void;
};

export default function Error({ error, resetErrorBoundary }: ErrorFallbackProps) {
   console.error(error); // Log the error to the console

   const navigate = useNavigate()

   const refreshApp = (): void => {
      navigate('/')
      navigate(0);
   }

   return (
      <Page className='p-4 flex flex-col gap-8 justify-start'>
         <p className='text-xl text-center text-red-600 font-black'> An Error occured - {getCurrentTime()} </p>

         {resetErrorBoundary && (
            <button
               className='bg-accent p-5 rounded-xl font-bold text-xl'
               onClick={refreshApp}>
               Reload App
            </button>
         )}
         <p>
            consider reporting your error in the settings
         </p>

         <div className='flex flex-col gap-4'>
            <p className='font-bold text-xl'> Type </p>
            <p> {error.name} </p>
         </div>

         <div className='flex flex-col gap-4'>
            <p className='font-bold text-xl'> Message </p>
            <p> {error.message} </p>
         </div>

         <div className='flex flex-col gap-4'>
            <p className='font-bold text-xl'> Stack </p>
            <p> {error.stack} </p>
         </div>
      </Page>
   );
}
