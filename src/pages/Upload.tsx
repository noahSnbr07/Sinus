import { ChangeEvent, useRef, useState } from 'react';
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
import { secondsToTimeString } from '../functions/timeConverter';

export default function Upload() {
   const { data } = useData();
   const [tags] = useState<TagProps[]>([...tagsJSON]);
   const [activeTags, setActiveTags] = useState<TagProps[]>([]);
   const audioRef = useRef<HTMLAudioElement>(null);

   const currentTime: string = getCurrentTime();

   const [termsAgreed, setTermsAgreed] = useState<boolean>(false);

   const initialNewSong: SongProps = {
      id: data.songs.length,
      name: "",
      artist: "",
      cover: "",
      highlight: 0,
      audio: "",
      length: 0,
      isExplicit: false,
      release: currentTime,
      publisher: "User #2345",
      tags: [],
   }

   const [newSong, setNewSong] = useState<SongProps>(initialNewSong);

   const storage = getStorage(app);
   const database = getDatabase(app);

   async function updateAudioFile(e: ChangeEvent<HTMLInputElement>): Promise<void> {
      const file = e.target.files?.[0];

      async function processAudioFile(audioFile: File): Promise<void> {
         try {
            const duration = await getAudioDuration(audioFile);
            if (duration >= 600) {
               alert("File too large, cap at: 600 seconds");
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

      if (newSong.name.length < 1) { alert(`song name (${newSong.name.length}) Characters to short`); return; }
      if (newSong.artist.length < 1) { alert(`song artist name (${newSong.artist.length}) Characters to short`); return; }
      if (newSong.audio.length < 1) { alert(`song name (${newSong.audio.length}) Characters to short`); return; }
      if (activeTags.length < 1) { alert(`select at least one tag`); return; }

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
            className='bg-light-1 p-2 text-sm rounded-full'>
            {label}
         </button>
      );
   }

   const handleHighlightChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      console.log(e.target.value);
      setNewSong((prev: SongProps) => ({ ...prev, highlight: Number(newValue) }));
      if (audioRef && audioRef.current) {
         audioRef.current.currentTime = parseFloat(newValue);
      }
   }

   return (
      <Page scrollY className='flex flex-col gap-5 p-5'>
         <audio autoPlay ref={audioRef} src={newSong.audio && newSong.audio} />
         <div className='flex flex-col gap-2'>
            <p className='text-white italic'>Naming</p>
            <input
               placeholder={`New Song's Name`}
               className='bg-light-1 p-2 text-white rounded-lg'
               type="text"
               value={newSong.name}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSong((prev) => ({ ...prev, name: e.target.value }))}
            />

            <input
               placeholder={`New Song's Artist`}
               className='bg-light-1 p-2 text-white rounded-lg'
               type="text"
               value={newSong.artist}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSong((prev) => ({ ...prev, artist: e.target.value }))}
            />
         </div>
         <div className='flex flex-col gap-2'>
            <p className='text-white italic'>Representation</p>
            <input
               placeholder={`New Cover Image URL`}
               className='bg-light-1 p-2 text-white rounded-lg'
               type="url"
               value={newSong.cover}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSong((prev) => ({ ...prev, cover: e.target.value }))}
            />
            <input
               placeholder={`New Cover Audio File`}
               className='bg-light-1 p-2 text-white rounded-lg file:appearance-none'
               type="file"
               accept='audio/mp3'
               onChange={(e: ChangeEvent<HTMLInputElement>) => updateAudioFile(e)}
            />
         </div>
         <div className='flex flex-col gap-2'>
            <i className='text-white'> {"Tag Your Song"} </i>
            <div className='bg-light-1 p-2 flex flex-wrap gap-2 rounded-xl'>
               {tags.map((tag: TagProps, key: number) => <Tag key={key} id={tag.id} label={tag.label} color={tag.color} />)}
            </div>
         </div>
         <div className='flex flex-col gap-2'>
            <i className='text-white'>
               {"Select Song Highlight"}
            </i>
            <div className='flex gap-5'>
               <div className='flex gap-2 w-full items-center'>
                  <input
                     className='flex-1 accent-white appearance-none bg-stack rounded-full h-2'
                     type='range'
                     min={0}
                     max={newSong.length && newSong.length}
                     value={newSong.highlight}
                     onChange={(e) => handleHighlightChange(e)} />
                  <span className='text-white'> {secondsToTimeString(newSong.highlight)} </span>
               </div>
            </div>
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
            {" Publish to Sinus"}
         </button>
      </Page>
   );
}