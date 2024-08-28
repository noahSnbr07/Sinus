import { useData } from "../../../hooks/useData";

export default function QuickMessage() {
   const { data } = useData();

   return (
      <div className="p-2 bg-light-1 rounded-xl text-center">
         {data.message}
      </div>
   );
}