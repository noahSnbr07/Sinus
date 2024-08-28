import { useParams } from 'react-router-dom';
import Page from '../components/Page';
import memberShipsJSON from '../assets/libs/memberships.json';
import { basic, premium, creator, mod, check, close } from '../images';
import { MembershipProps } from '../interfaces/interfaces';

export default function Shop() {
   const { membershipID } = useParams<{ membershipID: string }>();

   const membership: MembershipProps = memberShipsJSON[Number(membershipID)];

   const Information = () => {
      const InformationSingle = ({ label, value }: { label: string; value: boolean }) => (
         <div className='w-full flex justify-between items-center '>
            <p>{label}</p>
            <img src={value ? check : close} alt={value ? 'check' : 'close'} />
         </div>
      );

      return (
         <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
               <p className='text-center text-2xl'> {membership.name} </p>
               <p className='italic text-center'> {membership.description} </p>
            </div>
            <div className='flex flex-col gap-2'>
               <InformationSingle label='Can Publish Content?' value={membership.canPublishContent} />
               <InformationSingle label='Can Download Content?' value={membership.canDownloadSongs} />
               <InformationSingle label='Can Play Explicit Songs?' value={membership.canPlayExplicitSongs} />
               <InformationSingle label='Can Listen to Ad-free Music?' value={membership.adFree} />
               <InformationSingle label='Can Customize Preferences?' value={membership.canCustomizePreferences} />
               <InformationSingle label='Can Modify Database?' value={membership.canModifyDatabase} />
               <InformationSingle label='Can Skip Within Songs?' value={membership.canUseProgressBar} />
            </div>
         </div>
      );
   };

   const MembershipImage = () => {
      const getImage = () => {
         let img: string;
         switch (Number(membershipID)) {
            case 0: img = basic; break;
            case 1: img = premium; break;
            case 2: img = creator; break;
            case 3: img = mod; break;
            default: return;
         }
         return img;
      }

      const imageUrl = getImage();

      return (
         <div className='w-full p-10 grid place-content-center'>
            <img loading='lazy' draggable={false} src={imageUrl} alt={`${membership.name}'s icon`} />
         </div>
      );
   };

   const BuyButton = () => (
      <button className='w-full p-5 text-xl  bg-accent rounded-xl'>
         {"Buy Now"}
      </button>
   );

   return (
      <Page className=' flex flex-col gap-5 p-5'>
         <MembershipImage />
         <Information />
         <BuyButton />
      </Page>
   );
}