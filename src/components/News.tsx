import { useState } from 'react';
import news from '../assets/libs/news.json';
import { NewsArticleProps } from '../interfaces/interfaces';
import { developer, expand, shrink } from '../images';
export default function News() {
   return (
      <div className='w-full flex flex-col gap-2'>
         {news.map((article: NewsArticleProps, index: number) => (
            <NewsArticle
               key={index}
               publisher={article.publisher}
               title={article.title}
               body={article.body}
               isExpanded={article.isExpanded}
            />
         ))}
      </div>
   );
}

function NewsArticle({ title, body, isExpanded, publisher }: NewsArticleProps): JSX.Element {

   const [shown, setShown] = useState<boolean>(isExpanded);
   const toggleArticle = () => setShown(prev => !prev);
   const currentIcon = shown ? shrink : expand;

   const { name, date } = publisher;

   const PublisherPart = (): JSX.Element => (
      <div className='flex gap-3 items-center flex-wrap'>
         <img
            className='h-10 rounded-full'
            src={developer}
            alt={`image of ${name}`}
            loading='lazy'
            draggable={false} />
         <p className='text-lg text-white'> {name} </p>
         <i className='text-sm text-white'> {date} </i>
      </div>
   );

   return (
      <div className='w-full bg-light-1 p-2 rounded-xl flex flex-col overflow-y-scroll'>
         <button
            onClick={() => void toggleArticle()}
            className='flex gap-2 text-stack-neutral items-center'>
            <img
               draggable={false}
               loading='lazy'
               src={currentIcon}
               alt={`${isExpanded ? 'shrink' : 'expand'} button icon`} />
            <p className='text-xl text-white'> {title} </p>
         </button>
         {shown && (
            <div className='flex flex-col gap-2 px-8'>
               <article className='text-white text-lg'>
                  {body}
               </article>
               <PublisherPart />
            </div>
         )}
      </div>
   );
}