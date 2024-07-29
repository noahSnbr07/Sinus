import { ChangeEvent, useState } from "react";
import { useData } from "../../../hooks/useData";
import { search } from "../../../images";
import { SongProps } from "../../../interfaces/interfaces";
import SongLink from "../../../components/links/SongLink";

export default function Finder() {

   const { data } = useData();

   //users input string as query
   const [query, setQuery] = useState<string>("");

   const ResultDisplay = (): JSX.Element => {

      //filter songs which match the query
      const filteredSongs: SongProps[] = data.songs.filter((song: SongProps) =>
         song.name.toLowerCase().includes(query.toLowerCase())
      );

      //fallback if there is no match
      const fallback: JSX.Element = <i className="w-full text-center p-2 text-white"> {"no Match "}</i>;

      //prevent edge cases
      if (query.length < 1) return <></>;
      if (filteredSongs.length < 1) return fallback;

      return (
         <div className="w-full pl-8">
            {filteredSongs.slice(0, 3).map((song: SongProps) => <SongLink songParam={song} key={song.id} />)}
         </div>
      )
   }
   return (
      <div className='w-full bg-light-1 p-2 rounded-xl flex flex-col'>
         <div className="flex gap-2">
            <img src={search} alt="search icon" draggable={false} loading="lazy" />
            <input
               placeholder="song query"
               maxLength={50}
               className="flex-1 rounded-md bg-light-2 p-2 text-white"
               type="text"
               value={query}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            />
         </div>
         <ResultDisplay />
      </div>
   );
}