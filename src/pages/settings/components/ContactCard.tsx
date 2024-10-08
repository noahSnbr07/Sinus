interface CardProps {
   value: string;
   label: string;
   icon: string;
}

//link to endpoint like contact
export default function ContactCard({ value, label, icon }: CardProps) {
   return (
      <a target="_blank" href={value} className="flex p-5 gap-5">
         <img draggable={false} loading="lazy" alt={`Icon ${label}`} src={icon} />
         <p className=""> {label} </p>
      </a>
   );
}