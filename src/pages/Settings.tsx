import Page from '../components/Page'
import settingsLinksJSON from '../assets/libs/settingsLinks.json';
import { SettingsLinkProps } from '../interfaces/interfaces';
import SettingsLink from '../components/links/SettingsLink';

export default function Settings() {

   return (
      <Page>
         {settingsLinksJSON.map((settingsLink: SettingsLinkProps) =>
            <SettingsLink key={settingsLink.id} id={settingsLink.id} label={settingsLink.label} />)}
      </Page>
   );
}