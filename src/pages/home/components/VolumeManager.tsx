import { ChangeEvent, useState, useEffect } from "react";
import { useAudioRef } from "../../../hooks/useAudioRef";
import { volume_low, volume_high, volume_mute } from "../../../images";

export default function VolumeManager() {
   const { reference } = useAudioRef();

   // Initialize volume with the current volume of the reference or a default value
   const [volume, setVolume] = useState<number>(reference?.current?.volume ?? .25);

   //update the reference with the new volume
   useEffect(() => {
      if (reference && reference.current) {
         reference.current.volume = volume || 0;
      }
   }, [volume, reference]);

   //change the volume of the audio
   const changeVolume = (e: ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value));

   //set the correct volume icon
   const volumeIcon = (): string => volume < .01 ? volume_mute : volume >= .5 ? volume_high : volume_low;

   //display the volume value
   const displayVolumeNumber = (): string => (volume * 100).toFixed(0)

   return (
      <div className="bg-light-1 p-4 flex gap-4 rounded-xl items-center">
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
            className="flex-1 appearance-none bg-light-2 rounded-full h-3 accent-white"
            onChange={changeVolume}
         />
         <span className=""> {displayVolumeNumber()} </span>
      </div>
   );
}