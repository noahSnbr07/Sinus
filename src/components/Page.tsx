import { CSSProperties, ReactNode } from 'react';
type PageProps = {
   children: ReactNode;
   className?: string;
   style?: CSSProperties;
   scrollY?: boolean;
};

export default function Page({ children, className, style, scrollY }: PageProps) {
   return (
      <main style={style} className={`flex-1 ${className} ${scrollY && 'overflow-y-scroll'}`}>
         {children}
      </main>
   );
}