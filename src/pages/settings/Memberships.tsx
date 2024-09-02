import Page from '../../components/Page'
import membershipsJSON from '../../assets/libs/memberships.json';
import { MembershipProps } from '../../interfaces/interfaces';
import MembershipLink from '../../components/links/MembershipLink';

export default function Memberships() {

   //declare and assign local memberships array as a copy of the json file
   const memberships: Array<MembershipProps> = [...membershipsJSON];

   return (
      <Page className=' p-4 flex flex-col gap-4 items-center' scrollY>
         {memberships.map((membership: MembershipProps) => <MembershipLink
            adFree={membership.adFree}
            key={membership.id}
            id={membership.id}
            name={membership.name}
            description={membership.description}
            canUseProgressBar={membership.canUseProgressBar}
            canPublishContent={membership.canPublishContent} //songs + playlists
            canDownloadSongs={membership.canDownloadSongs}
            canPlayExplicitSongs={membership.canPlayExplicitSongs}
            canCustomizePreferences={membership.canCustomizePreferences}
            canModifyDatabase={membership.canModifyDatabase}
            accent={membership.accent}
         />)}
      </Page>
   );
}