import { ChangeEvent, RefObject, useRef, useState } from "react";
import { useData } from "../../../hooks/useData";
import { search } from "../../../images";
import { ArtistProps, PlaylistProps, SongProps } from "../../../interfaces/interfaces";
import SongLink from "../../../components/links/SongLink";
import ArtistLink from "../../../components/links/ArtistLink";
import PlaylistLink from "../../../components/links/PlaylistLink";

export default function Finder() {

   const { data } = useData();

   //users input string as query
   const [query, setQuery] = useState<string>("");

   const barRef: RefObject<HTMLInputElement> = useRef(null);

   const scrollBarIntoView = (): void => {
      if (barRef && barRef.current) {
         barRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
   };


   const ResultDisplay = (): JSX.Element => {

      //filter songs which match the query
      const filteredSongs: SongProps[] = data.songs.filter((song: SongProps) =>
         song.name.toLowerCase().includes(query.toLowerCase())
      );
      const filteredArtists: ArtistProps[] = data.artists.filter((artist: ArtistProps) =>
         artist.name.toLowerCase().includes(query.toLowerCase())
      );
      const filteredPlaylists: PlaylistProps[] = data.playlists.filter((playlist: PlaylistProps) =>
         playlist.name.toLowerCase().includes(query.toLowerCase())
      );

      //fallback if there is no match
      const fallback: JSX.Element = <p className="w-full font-italic text-center p-2 "> {"no Match"}</p>;

      //prevent cases
      if (query.length < 1) return <></>;

      if (filteredSongs.length < 1 &&
         filteredArtists.length < 1 &&
         filteredPlaylists.length < 1) return fallback;

      return (
         <div className="w-full flex flex-col gap-4">
            {filteredSongs.length > 0 && <p className="font-italic" > Songs </p>}
            {filteredSongs.slice(0, 3).map((a: SongProps, _: number) =>
               <SongLink
                  delayIndex={_}
                  songParam={a}
                  key={a.id} />)}

            {filteredArtists.length > 0 && <p className="font-italic" > Artists </p>}
            {filteredArtists.slice(0, 3).map((a: ArtistProps, _: number) =>
               <ArtistLink
                  artist={a}
                  key={a.id} />)}

            {filteredPlaylists.length > 0 && <p className="font-italic" > Playlists </p>}
            {filteredPlaylists.slice(0, 3).map((a: PlaylistProps, _: number) =>
               <PlaylistLink
                  playlistParam={a}
                  key={a.id} />)}
         </div>
      );
   }

   return (
      <div className='w-full bg-light-1 rounded-xl px-4 flex flex-col'>
         <div className="flex gap-4">
            <img src={search} alt="search icon" draggable={false} loading="lazy" />
            <input
               ref={barRef}
               onFocus={scrollBarIntoView}
               placeholder="query"
               maxLength={50}
               className="flex-1 rounded-md py-4 text-xl bg-transparent"
               type="text"
               value={query}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            />
         </div>
         <ResultDisplay />
      </div>
   );
}