export interface SongProps {
   id: number;
   name: string;
   artist: string;
   cover: string;
   audio: string;
   length: number;
   isExplicit: boolean;
   release: string;
}

export interface PlayerProps {
   progress: number;
   isPlaying: boolean;
   isLooping: boolean;
   isShuffling: boolean;
   togglePlayer: () => void;
}

interface NewsArticlePublisher {
   name: string;
   date: string;
}

export interface NewsArticleProps {
   title: string;
   body: string;
   isExpanded: boolean;
   publisher: NewsArticlePublisher;
}

export interface TagProps {
   color: string;
   label: string;
}