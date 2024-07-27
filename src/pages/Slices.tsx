import { useState, useEffect, useRef } from 'react';
import Page from '../components/Page';
import { useData } from '../hooks/useData';
import { SongProps } from '../interfaces/interfaces';
import Slice from '../components/Slice';

export default function Slices() {
   const { data } = useData();
   const [slices] = useState<Array<SongProps>>(data?.songs ? [...data.songs] : []);
   const observers = useRef<IntersectionObserver[]>([]);

   useEffect(() => {
      const observerOptions = {
         root: null,
         rootMargin: '0px',
         threshold: .1
      };

      observers.current = slices.map((_,) => {
         return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
               const audio = entry.target.querySelector('audio');
               if (entry.isIntersecting) {
                  audio && audio.play();
               } else {
                  audio && audio.pause();
               }
            });
         }, observerOptions);
      });

      slices.forEach((_, index) => {
         const sliceElement = document.getElementById(`slice-${index}`);
         if (sliceElement) {
            observers.current[index].observe(sliceElement);
         }
      });

      return () => {
         observers.current.forEach((observer, index) => {
            const sliceElement = document.getElementById(`slice-${index}`);
            if (sliceElement) {
               observer.unobserve(sliceElement);
            }
         });
      };
   }, [slices]);

   return (
      <Page className='snap-y text-white snap-mandatory' scrollY style={{ scrollSnapType: 'y mandatory' }}>
         {slices.map((slice: SongProps, index: number) => (
            <div className='h-full w-full' key={slice.id} id={`slice-${index}`}>
               <Slice slice={slice} />
            </div>
         ))}
      </Page>
   );
}