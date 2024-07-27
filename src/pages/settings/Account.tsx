import Page from '../../components/Page'
import { useUser } from '../../hooks/useUser';
import { placeholder } from '../../images';

export default function Account() {
   const { user } = useUser();

   return (
      <Page className='p-5 flex flex-col gap-5'>
         <div className='w-full grid place-content-center'>
            <img src={placeholder} alt='users image' loading='lazy' className='h-40' draggable={false} />
         </div>
         <div className='flex flex-col gap-2'>
            <input type='text' placeholder={user.name} className='bg-light-1 p-2 text-white rounded-xl' />
            <input type='password' placeholder={user.password} className='bg-light-1 p-2 text-white rounded-xl' />
         </div>
         <div className='flex flex-col gap-2 text-white items-center'>
            <span className='flex gap-5'>
               <i className='text-stack-neutral'> {"membership:"} </i>
               <p> {user.membership} </p>
            </span>
            <span className='flex gap-5'>
               <i className='text-stack-neutral'> {"Identity:"} </i>
               <p> {user.id} </p>
            </span>
         </div>
         <button className='bg-accent p-5 text-white text-xl rounded-xl'>
            {"Save"}
         </button>
      </Page>
   );
}