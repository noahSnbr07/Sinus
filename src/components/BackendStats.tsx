import getTotalLength from "../functions/getTotalLength";
import { useData } from "../hooks/useData";
import { folder } from "../images";

export default function BackendStats() {
   const { data } = useData();
   const totalLength = getTotalLength(data.songs);

   return (
      <div className="bg-stack-light p-2 text-white rounded-xl flex flex-col gap-2">
         <div className="flex gap-2 text-stack-neutral">
            <img alt="folder icon" draggable={false} loading="lazy" src={folder} />
            <p className="text-xl">{"App Statistics"}</p>
         </div>
         <ul className="list-none flex flex-col gap-1 px-8">
            <li> {`Total Songs: ${data.songs.length}`} </li>
            <li> {`Total Playtime: ${totalLength}`} </li>
         </ul>
      </div>
   );
}