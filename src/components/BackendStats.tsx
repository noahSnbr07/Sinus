import getTotalLength from "../functions/getTotalLength";
import { useSongQueue } from "../hooks/useSongQueue";
import { folder } from "../images";

export default function BackendStats() {
   const queue = useSongQueue();
   const totalLength = getTotalLength(queue.songQueue);

   return (
      <div className="bg-stack-light p-2 text-white rounded-xl flex flex-col gap-2">
         <div className="flex gap-2 text-stack-neutral">
            <img alt="folder icon" draggable={false} loading="lazy" src={folder} />
            <p className="text-xl">{"App Statistiken"}</p>
         </div>
         <ul className="list-none flex flex-col gap-1 px-7">
            <li> {`Total Songs: ${queue.songQueue.length}`} </li>
            <li> {`Total Playtime: ${totalLength}`} </li>
         </ul>
      </div>
   );
}