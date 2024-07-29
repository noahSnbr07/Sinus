import { useData } from '../../hooks/useData';
import { SongProps } from '../../interfaces/interfaces';
import SongLink from '../../components/links/SongLink';
import Page from '../../components/Page';

export default function Songs() {
   const { data } = useData();
   return (
      <Page scrollY>
         {
            data.songs.map((song: SongProps) => (
               <SongLink className='px-5' key={song.id} songParam={song} />
            ))
         }
      </Page>
   )
}
