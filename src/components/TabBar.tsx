import { Link, useMatch, useResolvedPath, } from "react-router-dom";
import { home, library, player, upload } from "../images";
import { useSong } from "../hooks/useSong";

export default function TabBar() {
   interface TabBarLinkProps {
      destination: string;
      label: string;
      icon: string;
   }

   const { song } = useSong();

   const TabBarLink = ({ destination, label, icon }: TabBarLinkProps) => {
      const resolvedPath = useResolvedPath(destination);
      const isMatch = useMatch({ path: resolvedPath.pathname, end: true });
      return (
         <button className={`flex-1 ${isMatch && "text-white"}`}>
            <Link className="flex flex-col items-center justify-center"
               to={destination}>
               <img src={icon} alt={`link to ${label}`} loading="lazy" draggable={false} />
               <p> {label} </p>
            </Link>
         </button>
      );
   }

   const tabBarLinks: TabBarLinkProps[] = [
      { destination: "Home", label: "Home", icon: home },
      { destination: "Library", label: "Library", icon: library },
      { destination: `Player/${song.id}`, label: "Player", icon: player },
      { destination: "Upload", label: "Upload", icon: upload },
   ];

   return (
      <div className="w-full h-20 bg-stack-light text-stack-neutral p-2 flex">
         {tabBarLinks.map((link: TabBarLinkProps, index: number) => <TabBarLink
            key={index}
            destination={link.destination}
            label={link.label}
            icon={link.icon}
         />)}
      </div>
   );
}