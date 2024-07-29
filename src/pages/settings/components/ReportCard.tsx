import { useState } from 'react';
import { expand } from '../../../images';
import { BugReportProps } from '../../../interfaces/interfaces';

export default function ReportCard({ report }: { report: BugReportProps }) {
   // Destructure report properties
   const { id, time, topic, body, state }: BugReportProps = report;

   // Local state for expansion
   const [isExpanded, setIsExpanded] = useState<boolean>(false);

   // Function to toggle expansion state
   const toggleState = (): void => {
      setIsExpanded(prevState => !prevState);
   }

   //returns the color weather the issue is fixed or not
   const getStateColor = (state: string): string => {
      switch (state) {
         case "fixed": return 'green'; break;
         case "unfixed": return "red"; break;
         default: return 'red';
      }
   }

   return (
      <article className='w-full bg-light-1 flex flex-col gap-2 rounded-xl p-2'>
         <button onClick={toggleState} className='w-full flex gap-2'>
            <img src={expand} loading='lazy' draggable={false} alt={`button icon`} />
            <p> {topic} </p>
         </button>
         {isExpanded && (
            <div className='w-full flex flex-col gap-2 pl-8'>
               <p> {body} </p>
               <div className='flex flex-col'>
                  <p className='text-stack'> {"time"} {time} </p>
                  <p className='text-stack'> {"id:"} {`#${id}`} </p>
                  <span className='flex gap-2'> {"State:"} <p style={{ color: getStateColor(state) }}> {state} </p> </span>
               </div>
            </div>
         )}
      </article>
   );
}