import { Link } from "react-router-dom";
import { artist, player, playlist } from "../../../images";

interface LibraryRouteProps {
   link: string;
   label: string;
   icon: string;
   index: number;
}

const libraryRoutes: LibraryRouteProps[] = [
   {
      link: "/library/songs",
      icon: player,
      label: "Songs",
      index: 0,
   }, {
      link: "/library/playlists",
      icon: playlist,
      label: "Playlists",
      index: 1,
   }, {
      link: "/library/artists",
      icon: artist,
      label: "Artists",
      index: 2,
   }
];

type RouteComponentParsedProps = {
   data: LibraryRouteProps;
}

const LibraryRoute: React.FunctionComponent<RouteComponentParsedProps> = ({ data }: RouteComponentParsedProps) => {
   const { link, icon, label } = data;
   return (
      <Link to={link} className=" bg-light-1 flex-col items-center gap-2 flex flex-1 p-2 rounded-xl">
         <img loading="lazy" className="h-8" draggable={false} src={icon} />
         <p> {label} </p>
      </Link>
   );
}

export default function LibraryRoutes() {
   return (
      <div className="w-full gap-4 flex">
         {libraryRoutes.map((route: LibraryRouteProps) => <LibraryRoute key={route.index} data={route} />)}
      </div>
   );
}