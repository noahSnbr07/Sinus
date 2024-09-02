import Page from '../../components/Page'
import ReportCard from './components/ReportCard';
import { useData } from '../../hooks/useData';
import { BugReportProps } from '../../interfaces/interfaces';

export default function Issues() {
   const { data } = useData();

   return (
      <Page scrollY className='p-4 flex flex-col gap-4 '>
         {data.reports.map((report: BugReportProps) =>
            <ReportCard key={report.id} report={report} />
         )}
      </Page>
   );
}