import { Link } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayer";
import { useSong } from "../hooks/useSong";
import { next, pause_white, play_white, prev } from "../images";

export default function TabPlayer(): JSX.Element {
   const { song } = useSong();
   const { player } = usePlayer();

   const togglePlayerIconState = player.isPlaying ? pause_white : play_white;

   const togglePlayer = () => player.togglePlayer();

   return (
      <div className='w-full bg-stack-light rounded-xl p-2 flex gap-2 justify-between'>
         <Link to={`/Player/${song.id}`} className="flex gap-2">
            <img
               src={song.cover}
               alt={`Cover of ${song.name}`}
               loading="lazy"
               draggable={false}
               className="h-14 rounded-md"
            />
            <div className="flex flex-col flex-1 justify-center items-start text-white">
               <p className="text-lg text-accent truncate w-36">{song.name}</p>
               <p className="italic text-sm">{song.artist}</p>
            </div>
         </Link>
         <div className="flex gap-2">
            <button>
               <img src={prev} alt="Previous" />
            </button>
            <button onClick={togglePlayer}>
               <img src={togglePlayerIconState} alt="Toggle" />
            </button>
            <button>
               <img src={next} alt="Next" />
            </button>
         </div>
      </div>
   );
}
