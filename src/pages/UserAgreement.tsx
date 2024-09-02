import Page from '../components/Page'
import userAgreementJSON from '../assets/libs/agreement.json';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserAgreement() {
   const agreement = userAgreementJSON;
   const [langIsEn, setLangIsEn] = useState<boolean>(true);

   const LanguageToggler = (): JSX.Element => {
      return (
         <button onClick={() => void setLangIsEn(prev => !prev)} className='rounded-xl bg-light-1 p-4  text-xl'>
            {!langIsEn ? 'Switch To german' : 'Wechsle auf English'}
         </button>
      )
   }
   return (
      <Page className=' p-4 flex flex-col gap-4'>
         <p className='text-center text-xl'> {langIsEn ? agreement.de.header : agreement.en.header}</p>
         <ol className='flex flex-col gap-4'>
            {langIsEn ?
               agreement.de.rules.map((rule: string, index: number) => <li key={index}> {rule} </li>) :
               agreement.en.rules.map((rule: string, index: number) => <li key={index}> {rule} </li>)}
         </ol>
         <LanguageToggler />
         <Link to={"/"} className='bg-light-1 text-center p-4 rounded-xl'> {"Home"} </Link>
      </Page>
   );
}