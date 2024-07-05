import Page from '../components/Page';
import newsJSON from '../assets/libs/news.json';
import { useState } from 'react';
import { NewsArticleProps } from '../interfaces/interfaces';
import NewsArticle from '../components/NewsArticle';
import BackendStats from '../components/BackendStats';
import TabPlayer from '../components/TabPlayer';

export default function Home() {
   const [news] = useState<NewsArticleProps[]>([...newsJSON]);

   const NewsContainer = () => {
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

   return (
      <Page className='p-5 flex flex-col gap-5' scrollY>
         <TabPlayer />
         <BackendStats />
         <NewsContainer />
      </Page>
   );
}