import { useEffect, useRef, useMemo } from 'react';
import Page from '../../components/Page';
import { useData } from '../../hooks/useData';
import { PlayerProps, SongProps } from '../../interfaces/interfaces';
import Slice from './components/Slice';
import { usePlayer } from '../../hooks/usePlayer';

export default function Slices() {
   const { data } = useData();
   const observers = useRef<IntersectionObserver[]>([]);
   const { setPlayer } = usePlayer();

   const shuffledSlices = useMemo(() => {
      const slicesCopy = data?.songs ? [...data.songs] : [];
      return slicesCopy.sort(() => Math.random() - 0.5);
   }, [data]);

   useEffect(() => {
      setPlayer((prev: PlayerProps) => ({ ...prev, isPlaying: false }));

      const observerOptions = {
         root: null,
         rootMargin: '0px',
         threshold: .1
      };

      observers.current = shuffledSlices.map(() => {
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

      shuffledSlices.forEach((_, index) => {
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
   }, [shuffledSlices, setPlayer]);

   return (
      <Page className='snap-y  snap-mandatory' scrollY style={{ scrollSnapType: 'y mandatory' }}>
         {shuffledSlices.map((slice: SongProps, index: number) => (
            <div className='h-full w-full' key={slice.id} id={`slice-${index}`}>
               <Slice slice={slice} />
            </div>
         ))}
      </Page>
   );
}