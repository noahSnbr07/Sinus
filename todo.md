## Tagging
* Save in tags.json
* each song up to 5 tags
* continue playing music based on previous tags
* new MusicMixer (tag based playing (Premium))
* Filter and sort based on tags
* settings page to toggle tag visibility
* Tags: genres, annotations, infos

```tsx
interface TagProps {
  label: string;
  color: string; //hex
  id: number;
}

interface SongProps {
  tags: Array<TagProps>;  // new prop
}
```

## Playlists
 * Save on firebase real time database
 * can be either public or private: Boolean
 * Playlist Interface => Song Interface
 * require auto play feature
tsx
interface PlaylistProps {
  id: number;
  name: string;
  length: number;
  isExplicit: boolean;
  cover: string; 
  release: string;
  owner: User; //new
}


## *Handling and UX*
  - swipe gesture in player and navigation
  - page transitions
  - parse images as divs with back ground
  - draggable progress bar thumb
  - Dynamic Theme Toggler

## *User system*
  -  partially shown and hidden for end user
  - optional and required data for profile
  - update user agreement and TOS
  - signing in -> premium account
  - User theme, accent, behavior, design 
  -  correct missing or wrong spacing 

```tsx
interface UserPreferenceProps {
  theme: string; //bright / dark
  accent: string; //hex value
  hideExplicit: boolean;
}
```