import { RefObject } from "react";
import { useAudioRef } from "../../../hooks/useAudioRef";
import { useSong } from "../../../hooks/useSong";
import { equalizer, share } from "../../../images";

export default function SongActions() {

   const { song } = useSong();
   const { setReference } = useAudioRef();

   //jump to the songs highlight
   const jumpHighlight = (): void => {
      setReference((prev: RefObject<HTMLAudioElement> | null) => {
         if (prev && prev.current) {
            prev.current.currentTime = song.highlight;
         }
         return prev;
      });
   }

   //copy the songs url to clipboard
   const shareSong = (): void => {
      try {
         if ("clipboard" in navigator) {
            navigator.clipboard.writeText(`https://sinus-app.web.app/player/${song.id}`);
         }
      }
      catch (e: any) {
         console.error(e);
      }
      finally {
         console.log("finished");
      }
   }

   const ActionButton = ({ icon, text, clickFn }: { icon: string; text: string; clickFn: () => void }): JSX.Element => {

      return (
         <button className="bg-light-1 rounded-xl p-4 flex-1 flex gap-4 justify-center items-center"
            onClick={clickFn}>
            <img
               draggable={false}
               alt={icon + ' icon'}
               loading="lazy"
               src={icon} />
            <p className="text-stack font-bold text-xl">
               {text}
            </p>
         </button>
      )
   }

   return (
      <div className="w-full flex gap-4">

         <ActionButton
            icon={equalizer}
            text="Play Highlight"
            clickFn={jumpHighlight}
         />

         <ActionButton
            icon={share}
            text="Copy Song Link"
            clickFn={shareSong}
         />

      </div>
   );
}