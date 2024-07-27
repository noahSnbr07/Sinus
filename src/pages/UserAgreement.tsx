import Page from '../components/Page'
import userAgreementJSON from '../assets/libs/agreement.json';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserAgreement() {
   const agreement = userAgreementJSON;
   const [langIsEn, setLangIsEn] = useState<boolean>(true);

   const LanguageToggler = (): JSX.Element => {
      return (
         <button onClick={() => void setLangIsEn(prev => !prev)} className='rounded-xl bg-light-1 p-5 text-white text-xl'>
            {!langIsEn ? 'Switch To german' : 'Wechsle auf English'}
         </button>
      )
   }
   return (
      <Page className='text-white p-5 flex flex-col gap-5'>
         <p className='text-center text-xl'> {langIsEn ? agreement.de.header : agreement.en.header}</p>
         <ol className='flex flex-col gap-5'>
            {langIsEn ?
               agreement.de.rules.map((rule: string, index: number) => <li key={index}> {rule} </li>) :
               agreement.en.rules.map((rule: string, index: number) => <li key={index}> {rule} </li>)}
         </ol>
         <LanguageToggler />
         <Link to={"/"} className='bg-light-1 text-center p-5 rounded-xl'> {"Home"} </Link>
      </Page>
   );
}