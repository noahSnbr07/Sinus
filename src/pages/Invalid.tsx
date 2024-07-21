import { BarLoader } from 'react-spinners'
import Page from '../components/Page'
import { Link } from 'react-router-dom'
import useColorPalette from '../hooks/useColorPalette'

export default function Invalid() {
   const palette = useColorPalette();
   return (
      <Page className='flex flex-col text-white justify-center items-center '>
         <Link to={"/"} className="flex flex-col items-center gap-5">
            {"This site is currently under construction"}
            <BarLoader color={palette.accent} />
         </Link>
      </Page>
   );
}