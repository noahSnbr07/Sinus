import { Link } from "react-router-dom";
import { playlist, settings } from "../images";

interface LibraryRouteProps {
   link: string;
   label: string;
   icon: string;
   index: number;
}

const libraryRoutes: LibraryRouteProps[] = [
   {
      link: "/library",
      icon: playlist,
      label: "Library",
      index: 0,
   }, {
      link: "/Settings",
      icon: settings,
      label: "Settings",
      index: 1,
   }
];

type RouteComponentParsedProps = {
   data: LibraryRouteProps;
}

const LibraryRoute: React.FunctionComponent<RouteComponentParsedProps> = ({ data }: RouteComponentParsedProps) => {
   const { link, icon, label } = data;
   return (
      <Link to={link} className=" bg-stack-light flex-col items-center gap-2 flex flex-1 p-2 rounded-xl">
         <img loading="lazy" className="h-8" draggable={false} src={icon} />
         <p> {label} </p>
      </Link>
   );
}

export default function LibraryRoutes() {
   return (
      <div className="w-full gap-2 flex text-white">
         {libraryRoutes.map((route: LibraryRouteProps) => <LibraryRoute key={route.index} data={route} />)}
      </div>
   );
}