import { ChangeEvent, useEffect, useState } from "react";
import Page from "../components/Page";
import { PlaylistProps, SongProps, TagProps } from "../interfaces/interfaces";
import getCurrentTime from "../functions/getCurrentTime";
import { useData } from "../hooks/useData";
import { ref, set } from "firebase/database";
import { database } from '../config/firebase.ts';
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";

export default function UploadPlaylist() {

   const date = getCurrentTime();
   const { data } = useData();
   const navigate: NavigateFunction = useNavigate();

   //get the id
   const { publishPlaylistIndex }: Readonly<Params<string>> = useParams();

   const initialPlaylist = {
      id: data.playlists.length,
      name: "",
      cover: "",
      isPublic: true,
      songs: [],
      publication: date,
   }

   //the current playlist
   const playlist = data.playlists[Number(publishPlaylistIndex)];

   const [newPlaylist, setNewPlaylist] = useState<PlaylistProps>(initialPlaylist);

   useEffect(() => {
      if (playlist) {
         setNewPlaylist({
            id: Number(publishPlaylistIndex),
            name: playlist.name,
            cover: playlist.cover,
            isPublic: playlist.isPublic,
            songs: data.playlists[Number(publishPlaylistIndex)].songs,
            publication: date,
         });
      } else {
         setNewPlaylist(initialPlaylist);
      }
   }, []);

   //function to change the new Playlist's values
   const changeName = (e: ChangeEvent<HTMLInputElement>): void =>
      setNewPlaylist((prev) => ({ ...prev, name: e.target.value }));

   const changeCover = (e: ChangeEvent<HTMLInputElement>): void =>
      setNewPlaylist((prev) => ({ ...prev, cover: e.target.value }));

   const changePublicity = (e: ChangeEvent<HTMLInputElement>): void =>
      setNewPlaylist((prev) => ({ ...prev, isPublic: e.target.checked }));

   //push it to the database
   const uploadPlaylist = (): void => {
      if (newPlaylist.name.length < 6) return;
      if (newPlaylist.cover.length < 1) return;
      if (newPlaylist.songs.length < 1) return;

      const dbRef = ref(database, `/playlists/${newPlaylist.id}`);
      set(dbRef, newPlaylist);
      navigate("/");
   }

   const LocalSongCard = ({ songParam }: { songParam: SongProps }): JSX.Element => {

      //extract props
      const { id, name, cover, artist, tags } = songParam;

      const editPlaylistState = (): void => {
         setNewPlaylist((prev) => {
            const isSongInPlaylist = prev.songs.includes(id);
            return {
               ...prev,
               songs: isSongInPlaylist
                  ? prev.songs.filter(songId => songId !== id)
                  : [...prev.songs, id]
            };
         });
      }

      return (
         <button
            onClick={editPlaylistState}
            className="flex gap-2 w-full">
            <img
               className="w-20 aspect-square rounded-xl"
               src={cover}
               alt={`cover of ${name} by ${artist}`}
               loading="lazy"
               draggable={false} />
            <div className="flex flex-col items-start">
               <p className="font-bold text-xl"> {name} </p>
               <p className="font-italic text-stack"> {artist} </p>
               <div className="w-full flex gap-2">
                  {tags.map((tag: TagProps) =>
                     <span className="bg-light-1 text-sm px-2 py-0.5 rounded-full" key={tag.id}> {tag.label} </span>)}
               </div>
            </div>
         </button>
      )
   }

   const SongInPlaylistMapped = (): JSX.Element => {
      return (
         <div className="flex flex-col gap-2">
            <p> {`Songs In My Playlist: ${newPlaylist.songs.length}`} </p>
            {
               newPlaylist.songs.map((songId: number) => {
                  const song = data.songs.find(song => song.id === songId);
                  return song ? <LocalSongCard songParam={song} key={songId} /> : null;
               })
            }
         </div>
      );
   }

   const MappedSongs = (): JSX.Element =>
   (
      <div className="flex flex-col gap-2">
         <p> {`All Songs: ${data.songs.length}`} </p>
         {
            data.songs.map((song: SongProps) =>
               !(newPlaylist.songs.includes(song.id)) && <LocalSongCard key={song.id} songParam={song} />)
         }
      </div>
   );

   return (
      <Page scrollY className="flex flex-col gap-4 p-4 ">
         <div className="flex flex-col gap-2">
            <p> Name your Playlist </p>
            <input
               className="p-2 rounded-xl bg-light-1 "
               type="text"
               placeholder="name"
               value={newPlaylist.name}
               onChange={(e: ChangeEvent<HTMLInputElement>) => changeName(e)}
            />
            <input
               className="p-2 rounded-xl bg-light-1 "
               type="text"
               placeholder="image url"
               value={newPlaylist.cover}
               onChange={(e: ChangeEvent<HTMLInputElement>) => changeCover(e)}
            />
         </div>
         <div className="flex gap-2">
            <input
               className="accent-accent"
               type="checkbox"
               checked={newPlaylist.isPublic}
               onChange={(e: ChangeEvent<HTMLInputElement>) => changePublicity(e)}
            />
            <p> Make My Playlist Public </p>
         </div>
         <button onClick={uploadPlaylist} className="p-4 bg-accent  rounded-xl">
            {"Create"}
         </button>
         <div className="flex flex-col gap-2">
            <SongInPlaylistMapped />
            <MappedSongs />
         </div>
      </Page>
   );
}