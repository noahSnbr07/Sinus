import Page from '../components/Page'
import { SettingsLinkProps } from '../interfaces/interfaces';
import SettingsLink from '../components/links/SettingsLink';
import { useData } from '../hooks/useData';

export default function Settings() {

   const data = useData();

   const links: SettingsLinkProps[] = [
      { id: 0, label: "Account", url: "account" },
      { id: 1, label: "Customize Appearance", url: "preferences" },
      { id: 2, label: "Membership", url: "membership" },
      { id: 3, label: "Publish Song", url: "publish/song" },
      { id: 4, label: "Create Playlist", url: `publish/playlist/${data.data.playlists.length}` },
      { id: 5, label: "Contact Me", url: "contact" },
      { id: 6, label: "Report a Problem", url: "report" },
      { id: 7, label: "See Issues", url: "issues" },
      { id: 8, label: "Edit Quick Update", url: "message" },
   ]

   return (
      <Page className='flex flex-col'>
         {links.map((settingsLink: SettingsLinkProps) =>
            <SettingsLink
               key={settingsLink.id}
               id={settingsLink.id}
               label={settingsLink.label}
               url={settingsLink.url} />)}
      </Page>
   );
}