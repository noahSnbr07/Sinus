import { ChangeEvent, useEffect, useState } from 'react';
import Page from '../components/Page';
import { SongProps, TagProps } from '../interfaces/interfaces';
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { set, getDatabase, ref as databaseRef } from 'firebase/database';
import { app } from '../config/firebase';
import getCurrentTime from '../functions/getCurrentTime';
import getAudioDuration from '../functions/getAudioDuration';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import tagsJSON from '../assets/libs/tags.json';

export default function Upload() {
   const { data } = useData();
   const [tags] = useState<TagProps[]>([...tagsJSON]);
   const [activeTags, setActiveTags] = useState<TagProps[]>([]);

   const currentTime: string = getCurrentTime();

   const [termsAgreed, setTermsAgreed] = useState<boolean>(false);

   const initialNewSong: SongProps = {
      id: data.songs.length,
      name: "",
      artist: "",
      cover: "",
      audio: "",
      length: 0,
      isExplicit: false,
      release: currentTime,
      publisher: "User #2345",
      tags: [],
   }

   const [newSong, setNewSong] = useState<SongProps>(initialNewSong);

   useEffect(() => console.table(newSong), [newSong]);

   const storage = getStorage(app);
   const database = getDatabase(app);

   async function updateAudioFile(e: ChangeEvent<HTMLInputElement>): Promise<void> {
      const file = e.target.files?.[0];

      async function processAudioFile(audioFile: File): Promise<void> {
         try {
            const duration = await getAudioDuration(audioFile);
            if (duration >= 300) {
               alert("File too large, cap at: 300 seconds");
               return;
            }
            else setNewSong((prev) => ({ ...prev, length: duration }));
         } catch (error) {
            console.error('Error calculating audio duration:', error);
         }
      }

      if (file) {
         const storageRef = ref(storage, `audio/${newSong.id}.mp3`);

         processAudioFile(file);

         try {
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
               (snapshot) => {
                  const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                  console.log(`Upload is ${progress}% done`);
               },
               (error) => {
                  console.error('Error uploading file:', error);
               },
               () => {

                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                     console.log('File available at', downloadURL);
                     setNewSong((prev) => ({
                        ...prev,
                        audio: downloadURL
                     }));
                  });
               }
            );
         } catch (error) {
            console.error('Error uploading file:', error);
         }
      }
   }

   function upload(): void {
      if (newSong.name.length < 5 || newSong.artist.length < 5 || newSong.audio.length < 1 || activeTags.length <= 0) {
         alert("All Fields must contain a value");
         return;
      }

      if (!termsAgreed) {
         alert("Must Agree with terms of service in order to publish");
         return;
      }

      try {
         set(databaseRef(database, `/songs/${newSong.id}`), newSong);

         setNewSong(initialNewSong);
         setActiveTags([]);

         console.log('Song uploaded successfully!');
      } catch (error) {
         console.error('Error uploading song:', error);
      }
   }

   const Tag = ({ id, label }: TagProps): JSX.Element => {
      const isActive = activeTags.some(tag => tag.id === id);

      function handleTagClick() {
         let updatedTags: TagProps[];
         setActiveTags((prev: TagProps[]) => {
            if (isActive) {
               updatedTags = prev.filter(tag => tag.id !== id);
            } else {
               if (prev.length < 3) {
                  const selectedTag = tags.find(tag => tag.id === id);
                  if (selectedTag) {
                     updatedTags = [...prev, selectedTag];
                  }
               } else return prev;
            }
            setNewSong((prev) => ({ ...prev, tags: updatedTags }));
            return updatedTags;
         });
      }

      return (
         <button
            style={{ border: `${isActive ? '1px solid white' : '1px solid transparent'}`, color: `${isActive ? 'white' : 'rgba(127, 127, 127, 0.5'}` }}
            onClick={handleTagClick}
            className='bg-stack-light p-2 text-sm rounded-full'>
            {label}
         </button>
      );
   }

   return (
      <Page className='flex flex-col gap-5 p-5'>
         <div className='flex flex-col gap-2'>
            <p className='text-white italic'>Naming</p>
            <input
               placeholder={`New Song's Name`}
               className='bg-stack-light p-2 text-white rounded-lg'
               type="text"
               value={newSong.name}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSong((prev) => ({ ...prev, name: e.target.value }))}
            />

            <input
               placeholder={`New Song's Artist`}
               className='bg-stack-light p-2 text-white rounded-lg'
               type="text"
               value={newSong.artist}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSong((prev) => ({ ...prev, artist: e.target.value }))}
            />
         </div>
         <div className='flex flex-col gap-2'>
            <p className='text-white italic'>Representation</p>
            <input
               placeholder={`New Cover Image URL`}
               className='bg-stack-light p-2 text-white rounded-lg'
               type="url"
               value={newSong.cover}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSong((prev) => ({ ...prev, cover: e.target.value }))}
            />
            <input
               placeholder={`New Cover Audio File`}
               className='bg-stack-light p-2 text-white rounded-lg file:appearance-none'
               type="file"
               accept='audio/mp3'
               onChange={(e: ChangeEvent<HTMLInputElement>) => updateAudioFile(e)}
            />
         </div>
         <div className='bg-stack-light p-2 flex flex-wrap gap-2 rounded-xl'>
            {tags.map((tag: TagProps, key: number) => <Tag key={key} id={tag.id} label={tag.label} color={tag.color} />)}
         </div>
         <div className='flex flex-col gap-2'>
            <span className='flex gap-2'>
               <input
                  onChange={(e) => setNewSong((prev: SongProps) => ({ ...prev, isExplicit: !(e.target.value === 'checked') }))}
                  className='accent-accent'
                  value={newSong.isExplicit ? 'checked' : 'unchecked'}
                  type='checkbox'
               />
               <p className='text-white'> {"Mark This Song as Explicit"} </p>
            </span>
            <span className='flex gap-2'>
               <input
                  onChange={(e) => setTermsAgreed(!(e.target.value === "checked"))}
                  className='accent-accent'
                  value={termsAgreed ? 'checked' : 'unchecked'}
                  type='checkbox'
               />
               <p className='text-white'>
                  {" I Agree with Sinus's"} &nbsp;
                  <Link className='text-accent underline' to={"/user-Agreement"}>{"User Agreement"}</Link>
               </p>
            </span>
         </div>
         <button onClick={upload} className='bg-accent text-white p-5 rounded-xl text-xl'>
            Publish to Sinus
         </button>
      </Page>
   );
}
