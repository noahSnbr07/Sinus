import { useData } from '../../hooks/useData';
import { PlaylistProps } from '../../interfaces/interfaces';
import PlaylistLink from '../../components/links/PlaylistLink';
import Page from '../../components/Page';

export default function Playlists() {
   const { data } = useData();
   return (
      <Page scrollY>
         {
            data.playlists.map((playlist: PlaylistProps) => (
               playlist.isPublic && <PlaylistLink key={playlist.id} playlistParam={playlist} />
            ))
         }
      </Page>
   );
}