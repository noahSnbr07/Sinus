import { ChangeEvent, useState, useEffect } from "react";
import { useAudioRef } from "../hooks/useAudioRef";
import { volume_low, volume_high, volume_mute } from "../images";

export default function VolumeManager() {
   const { reference } = useAudioRef();

   // Initialize volume with the current volume of the reference or a default value
   const [volume, setVolume] = useState<number>(reference?.current?.volume ?? .25);

   useEffect(() => {
      if (reference && reference.current) {
         reference.current.volume = volume || 0.5;
      }
   }, [volume, reference]);

   const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setVolume(newValue);
   };

   const volumeIcon = (): string => {
      return volume < .1 ? volume_mute : volume >= .5 ? volume_high : volume_low;
   }

   const displayVolumeNumber = (): string => {
      return (volume * 100).toFixed(0)
   }

   return (
      <div className="bg-stack-light p-2 flex gap-2 rounded-xl items-center">
         <img
            src={volumeIcon()}
            title="volume icon"
            alt="volume icon"
            loading="lazy"
            draggable={false}
         />
         <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            className="flex-1 appearance-none bg-stack-light rounded-full h-3 accent-white"
            onChange={changeVolume}
         />
         <span className="w-5 text-stack-neutral"> {displayVolumeNumber()} </span>
      </div>
   );
}