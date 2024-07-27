import { Link } from "react-router-dom";
import { MembershipProps } from "../interfaces/interfaces";

export default function MembershipLink({ id, name, accent, description }: MembershipProps) {
   return (
      <article className="w-full bg-light-1 flex flex-col p-5 gap-10 rounded-xl border-stack-light">
         <div>
            <h2 className="text-2xl" style={{ color: accent }}> {name} </h2>
            <p> {description} </p>
         </div>
         <button style={{ background: accent }} className="p-2 rounded-lg h-full w-full">
            <Link to={`/shop/${id}`}>
               {"Get"}
            </Link>
         </button>
      </article>
   );
}