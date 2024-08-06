import { usePlayer } from "../../../hooks/usePlayer";
import { autoplay, repeat, shuffle } from "../../../images";
import { PlayerProps } from "../../../interfaces/interfaces";

export default function ModeToggler() {
   const { player, setPlayer } = usePlayer();

   interface ModeProps {
      id: number;
      label: string;
      icon: string;
   }

   const modes: ModeProps[] = [
      { id: 0, label: 'auto', icon: autoplay },
      { id: 1, label: 'shuffle', icon: shuffle },
      { id: 2, label: 'repeat', icon: repeat },
   ];

   const ModePill = ({ mode }: { mode: ModeProps }): JSX.Element => {

      const { label, icon } = mode;

      const setMode = () => {
         setPlayer((prev: PlayerProps) => ({ ...prev, mode: label }));
      }

      return (
         <button
            onClick={setMode}
            className={`rounded-xl flex-1 p-5 grid place-content-center ${(player.mode === label) && 'bg-light-2'}`}>
            <img src={icon} loading="lazy" draggable={false} title={`${label} icon`} />
         </button>
      )
   }

   return (
      <div className='bg-light-1 flex rounded-xl'>
         {modes.map((mode: ModeProps) => <ModePill mode={mode} key={mode.id} />)}
      </div>
   );
}