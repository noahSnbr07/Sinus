import { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';


type PageProps = {
   children?: ReactNode;
   className?: string;
   style?: CSSProperties;
   scrollY?: boolean;
};

//Page is used as a frame for all the page sin the app
export default function Page({ children, className, style, scrollY }: PageProps) {
   return (
      <motion.main
         initial={{ opacity: 0, x: '-25%' }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ x: '25%', opacity: 0 }}
         transition={{ duration: .25, type: 'just' }}
         style={style} className={`flex-1 ${className} ${scrollY && 'overflow-y-scroll'}`}>
         {children}
      </motion.main>
   );
}