import { Link } from "react-router-dom";
import { useSong } from "../hooks/useSong";
import { usePlayer } from "../hooks/usePlayer";
import { pause_white, play_white } from "../images";

export default function MiniPlayer() {
   const { song } = useSong();

   const { player } = usePlayer();

   function skipNextSong(): void {
   }

   function skipPrevSong(): void {
   }

   function togglePlayer() {
      player.togglePlayer()
   }

   return (
      <div className='px-5 py-2 gap-5 absolute bottom-20 text-white w-full flex justify-between items-center'>
         <Link to={`Player/${song.id}`} className="flex gap-2 items-center">
            <img
               className="h-10 rounded-lg"
               src={song.cover}
               alt={`cover of ${song.name}`}
               loading="lazy"
               draggable={false} />
            <div className="flex flex-col">
               <b className="text-sm text-accent"> {song.name} </b>
               <p className="text-stack-neutral text-xs"> {song.artist} </p>
            </div>
         </Link>
         <input
            type="range"
            min={0}
            max={song.length}
            value={song.length / 3}
            onChange={(e) => console.log(e.target.value)}
            className="appearance-none bg-stack-light rounded-full h-2 flex-grow accent-white"
         />
         <div className="flex gap-5">
            <button onClick={() => void skipPrevSong()}>
               {"<"}
            </button>
            <button onClick={() => void togglePlayer()}>
               <img src={player.isPlaying ? pause_white : play_white} loading="lazy" draggable={false} alt="toggle the player" />
            </button>
            <button onClick={() => void skipNextSong()}>
               {">"}
            </button>
         </div>
      </div>
   );
}