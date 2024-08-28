import { ChangeEvent, useState } from 'react'
import Page from '../../components/Page'
import { BugReportProps } from '../../interfaces/interfaces'
import getCurrentTime from '../../functions/getCurrentTime'
import { Database, DatabaseReference, getDatabase, ref, set } from 'firebase/database';
import { app } from '../../config/firebase';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useData } from '../../hooks/useData';

export default function Report() {
   const { data } = useData();

   //initial report object
   const [report, setReport] = useState<BugReportProps>({
      id: String(data.reports.length),
      sendFromDevice: navigator.userAgent,
      time: getCurrentTime(),
      topic: "",
      body: "",
      state: "unfixed",
   });

   //reference to the database
   const db: Database = getDatabase(app);

   //navigate function
   const goto: NavigateFunction = useNavigate();

   //functions to update the reports properties
   const updateTopic = (e: string) => setReport((prev: BugReportProps) => ({ ...prev, topic: e }));
   const updateBody = (e: string) => setReport((prev: BugReportProps) => ({ ...prev, body: e }));

   const sendReport = (): void => {

      //define conditions need to be fulfilled for sending the report
      const titleTooShort: boolean = report.topic.length < 5;
      const bodyTooShort: boolean = report.body.length < 10;

      if (titleTooShort || bodyTooShort) {
         alert(`input too short, provide more details`);
         return;
      }

      //reference the db
      const dbReference: DatabaseReference = ref(db, `/reports/${report.id}`);

      //set the doc
      set(dbReference, report);

      //leave page
      goto("/");
   }

   return (
      <Page className='flex flex-col gap-5 p-5'>
         <input
            className='bg-light-1  rounded-xl p-2'
            placeholder='Topic'
            maxLength={50}
            minLength={5}
            value={report.topic}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateTopic(e.target.value)}
         />
         <textarea
            minLength={10}
            maxLength={500}
            className='flex-1 rounded-xl p-2 bg-light-1 '
            value={report.body}
            placeholder='describe your issue here'
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateBody(e.target.value)}
         />
         <button className='bg-accent p-5  rounded-xl' onClick={sendReport}>
            {"Send Report"}
         </button>
      </Page>
   );
}