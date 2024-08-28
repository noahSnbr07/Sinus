import { ChangeEvent, useState } from 'react';
import Page from '../components/Page'
import { useData } from '../hooks/useData';
import { ref, set } from 'firebase/database';
import { database } from '../config/firebase';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function Message() {

   //retrieve the data
   const { data } = useData();

   //raw code 
   const code: string = import.meta.env.VITE_MESSAGE_KEY;

   //store values
   const [message, setMessage] = useState<string>(data.message || '');
   const [password, setPassword] = useState<string>('');

   //declare and initialize navigate function
   const navigate: NavigateFunction = useNavigate();

   const submitNewQuickMessage = () => {

      //prevent empty messages and unauthorized changes
      if (message.length < 1 || !message) return;
      if (password !== code) return;

      //else put the new value to the db
      const dbRef = ref(database, '/message');
      set(dbRef, message);

      //goto main screen
      navigate("/");
   }


   return (
      <Page className='p-5 flex flex-col gap-5 items-center'>
         <p className='text-xl'> {"Edit Quick Message On Home Screen"} </p>
         <textarea
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { setMessage(e.target.value) }}
            value={message}
            className='flex-1 bg-light-1 w-full rounded-xl p-5' />
         <input
            className='w-full bg-light-1 p-2 rounded-xl text-center'
            placeholder='Enter Submit Code'
            type='password'
            value={password}
            min={8}
            max={8}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
         <button
            onClick={(submitNewQuickMessage)}
            className='p-5 text-xl text-bold bg-accent w-full rounded-xl'> Submit </button>
      </Page>
   );
}