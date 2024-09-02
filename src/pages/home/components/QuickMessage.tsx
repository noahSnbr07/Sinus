import { useData } from "../../../hooks/useData";

export default function QuickMessage() {
   const { data } = useData();

   return (
      <div className="p-4 bg-light-1 rounded-xl text-center">
         <p className="text-xl font-italic">
            {data.message}
         </p>
      </div>
   );
}