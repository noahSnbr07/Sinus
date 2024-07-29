import { useData } from '../../hooks/useData';
import { ArtistProps } from '../../interfaces/interfaces';
import ArtistLink from '../../components/links/ArtistLink';
import Page from '../../components/Page';

export default function Artists() {
   const { data } = useData();
   return (
      <Page scrollY>
         {
            data.artists.map((artist: ArtistProps) => (
               <ArtistLink key={artist.id} artist={artist} />
            ))
         }
      </Page>
   )
}
