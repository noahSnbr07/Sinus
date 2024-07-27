export interface TagProps {
   id: number;
   color: string;
   label: string;
}

export interface SongProps {
   id: number;
   name: string;
   artist: string;
   cover: string;
   audio: string;
   length: number;
   isExplicit: boolean;
   release: string;
   publisher: string;
   tags: TagProps[];
   highlight: number;
}

export interface PlayerProps {
   progress: number;
   isPlaying: boolean;
   isLooping: boolean;
   isShuffling: boolean;
   togglePlayer: () => void;
   play: () => void;
   pause: () => void;
   skipPrev: () => void;
   skipNext: () => void;
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


export interface SettingsLinkProps {
   id: number;
   label: string;
}

export interface UserProps {
   id: number;
   name: string;
   password: string;
   image: string;
   membership: string;
}

export interface MembershipProps {
   id: number;
   name: string;
   description: string;
   canUseProgressBar: boolean;
   canPublishContent: boolean;
   canDownloadSongs: boolean;
   canPlayExplicitSongs: boolean;
   canCustomizePreferences: boolean;
   canModifyDatabase: boolean;
   accent: string;
   adFree: boolean;
}

export interface PlaylistProps {
   id: number;
   name: string;
   cover: string;
   isPublic: boolean;
   songs: number[];
   publication: string;
}

export interface ArtistProps {
   id: number;
   name: string;
   isVerified: boolean;
   image: string;
}