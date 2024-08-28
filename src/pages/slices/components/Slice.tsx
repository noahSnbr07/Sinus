import { useEffect, useRef } from "react";
import { SongProps } from "../../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { useAudioRef } from "../../../hooks/useAudioRef";

type LocalSliceProps = {
   slice: SongProps;
};

export default function Slice({ slice }: LocalSliceProps) {
   const { id, name, cover, audio, highlight } = slice;
   const audioRef = useRef<HTMLAudioElement>(null);
   const { reference } = useAudioRef();

   const togglePlayer = (): void => {
      if (audioRef.current) {
         if (audioRef.current.paused) {
            audioRef.current.play();
         } else {
            audioRef.current.pause();
         }
      }
   };

   useEffect(() => {
      if (audioRef.current) {
         audioRef.current.currentTime = parseFloat(String(highlight));
         if (reference && reference.current) audioRef.current.volume = reference.current.volume;
      }
   }, [highlight, reference]);

   return (
      <div
         className="flex flex-col justify-center items-center gap-5 h-full w-full backdrop-blur-3xl  p-5"
         style={{ scrollSnapAlign: 'start' }}>
         <Link to={`/player/${id}`} className="text-3xl flex-col justify-center items-center flex gap-2">
            <p>{`${name}`}</p>
         </Link>
         <img onClick={togglePlayer} style={{ backgroundSize: 'cover' }} className="rounded-xl" draggable={false} loading="lazy" src={cover} />

         <audio ref={audioRef} autoPlay src={audio} />
      </div>
   );
}