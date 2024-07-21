import { SongProps } from '../interfaces/interfaces';
import { secondsToTimeString } from '../functions/timeConverter';
export default function getTotalLength(queue: SongProps[]) {
   let value: number = 0;
   if (!queue || queue.length <= 0) return 0;
   for (let i = 0; i < queue.length; i++) {
      value += queue[i].length;
   }
   //parse the seconds to a readable string
   return secondsToTimeString(value, true);
}