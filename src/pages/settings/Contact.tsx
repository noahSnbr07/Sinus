import Page from "../../components/Page";
import { camera, code, controller, mail } from "../../images";
import ContactCard from "./components/ContactCard";

export default function Contact() {

   //list all contact endpoints
   return (
      <Page scrollY>
         <ContactCard icon={camera} label="Instagram" value="https://www.instagram.com/noahsnbr/" />
         <ContactCard icon={controller} label="Discord" value="https://discord.gg/PfKbpFXr" />
         <ContactCard icon={mail} label="E-Mail" value="mailto:nur.noah.saschenbrecker@gmail.com" />
         <ContactCard icon={code} label="GitHub" value="https://www.github.com/noahSnbr07/Sinus" />
      </Page>
   );
}