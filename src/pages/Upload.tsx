import Page from '../components/Page';
import { file } from '../images';

export default function Upload() {
   const FileInputSection: React.FunctionComponent = (): JSX.Element => {

      const handleAudioFileChange = (input: HTMLInputElement) => {
         const file: File | undefined = input.files?.[0];
         if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
               const audioData = event.target?.result;
               if (audioData) {
                  console.log('Audio file data:', audioData);
               }
            }

            reader.onerror = (error: unknown) => {
               if (error instanceof Error) {
                  console.error('Error reading audio file:', error);
               } else {
                  console.error('Unexpected error:', error);
               }
            }

            reader.readAsDataURL(file);
         }
      };

      const handleImageFileChange = (input: HTMLInputElement) => {
         const file = input.files?.[0];
         if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
               const imageData = event.target?.result;
               if (imageData) {
                  console.log('Image file data:', imageData);
               }
            }

            reader.onerror = (error) => {
               console.error('Error reading image file:', error);
            }

            reader.readAsDataURL(file); // Changed to read as DataURL for easier handling
         }
      }

      return (
         <div className='flex gap-2 h-20'>
            <div className="overflow-hidden relative bg-stack-light text-white">
               <input onChange={(e) => handleAudioFileChange(e.target)} className="h-full top-0 left-0 z-50 opacity-0" accept='audio/mp3' type="file" />
               <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{"audio"}</p>
            </div>

            <div className="overflow-hidden relative bg-stack-light text-white">
               <input onChange={(e) => handleImageFileChange(e.target)} className="h-full top-0 left-0 z-50 opacity-0" accept='image/png, image/jpeg' type="file" />
               <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{"image"}</p>
            </div>
         </div>
      );
   };

   interface CustomInputFieldProps {
      placeholder: string;
   }

   const SongInfos = (): JSX.Element => {
      const CustomInputField: React.FunctionComponent<CustomInputFieldProps> = ({ placeholder }: CustomInputFieldProps): JSX.Element => {
         return (
            <div className='w-full flex'>
               <input className='bg-stack-light flex-1 p-2 border-b-2 border-stack-neutral' type='text' min={2} max={75} placeholder={placeholder} />
            </div>
         );
      }

      interface ConditionalBoxProps {
         label: string;
      }

      const ConditionalBox = ({ label, }: ConditionalBoxProps): JSX.Element => {
         return (
            <div className='w-full flex gap-2 text-white'>
               <input type='checkbox' className='accent-accent' />
               <p> {label} </p>
            </div>
         );
      }

      return (
         <div className='flex flex-col gap-2'>
            <CustomInputField placeholder='name' />
            <CustomInputField placeholder='artist' />
            <ConditionalBox label='Mark This Song as Explicit' />
            <ConditionalBox label='I accept the User Agreement' />
         </div>
      );
   }

   const PublishButton = (): JSX.Element => {
      return (
         <button className='w-full p-5 text-white bg-stack-light flex gap-5 justify-center'>
            <p> {"Publish to Sinus"}</p>
            <img src={file} alt='file icon' loading='lazy' draggable={false} />
         </button>
      );
   }

   return (
      <Page className='flex flex-col p-5 gap-5'>
         <FileInputSection />
         <SongInfos />
         <PublishButton />
      </Page>
   );
}
