import { useState, useEffect } from 'react';
import { android, battery, ios, language, windows } from '../images';

declare global {
   interface Navigator {
      getBattery?: () => Promise<BatteryManager>;
      userAgentData: any;
   }
   interface BatteryManager { level: number; }
}

export default function DeviceStatus() {
   const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
   const [agent, setAgent] = useState<string>("");
   const [lang, setLang] = useState<string>("");

   useEffect(() => {
      const localAgent = navigator.userAgentData?.platform || navigator.platform;
      setAgent(localAgent);
      setLang(navigator.language);

      const getBatteryLevel = async () => {
         try {
            if (navigator.getBattery) {
               const battery = await navigator.getBattery();
               setBatteryLevel(battery.level * 100);
            } else {
               console.error('Battery Status API is not supported on this browser.');
            }
         } catch (error) {
            console.error('Error getting battery level:', error);
         }
      };

      getBatteryLevel();
   }, []);

   const DeviceProperty = ({ icon, value }: { icon: string, value: string }): JSX.Element => {
      return (
         <div className="flex gap-2 items-center bg-light-1 flex-1 p-2 rounded-xl justify-center">
            <img className='h-6' src={icon} alt={`icon ${icon}`} loading='lazy' draggable={false} />
            <p>{value}</p>
         </div>
      );
   }

   const getPlatformIcon = (agent: string) => {
      if (/android/i.test(agent)) return android;
      if (/iPad|iPhone|iPod/.test(agent) || /Mac/i.test(agent)) return ios;
      if (/Win/i.test(agent)) return windows;
      return '';
   }

   return (
      <div className='text-white flex justify-evenly items-center gap-2'>
         <DeviceProperty icon={battery} value={batteryLevel !== null ? `${batteryLevel}%` : '...'} />
         <DeviceProperty icon={getPlatformIcon(agent)} value={agent} />
         <DeviceProperty icon={language} value={lang} />
      </div>
   );
}