import { Link } from "react-router-dom";
import { usePlayer } from "../../../hooks/usePlayer";
import { useSong } from "../../../hooks/useSong";
import { next, pause_white, play_white, prev } from "../../../images";

export default function TabPlayer(): JSX.Element {
   const { song } = useSong();
   const { player } = usePlayer();

   const togglePlayerIconState = player.isPlaying ? pause_white : play_white;

   const togglePlayer = () => player.togglePlayer();

   return (
      <div className='w-full bg-light-1 rounded-xl p-2 flex justify-between'>
         <Link to={`/player/${song && song.id}`} className="flex gap-2">
            <img
               src={(song && song.cover) && song.cover}
               alt={`Cover of ${(song && song.name) && song.name}`}
               loading="lazy"
               draggable={false}
               className="h-14 rounded-md"
            />
            <div className="flex flex-col flex-1 justify-center items-start ">
               <p className="text-xl text-accent font-bold">{(song && song.name) && song.name}</p>
               <p className="italic text-sm">{(song && song.artist) && song.artist}</p>
            </div>
         </Link>
         <div className="flex gap-2">
            <button onClick={(player.skipPrev)}>
               <img src={prev} alt="Previous" />
            </button>
            <button onClick={togglePlayer}>
               <img src={togglePlayerIconState} alt="Toggle" />
            </button>
            <button onClick={(player.skipNext)}>
               <img src={next} alt="Next" />
            </button>
         </div>
      </div>
   );
}