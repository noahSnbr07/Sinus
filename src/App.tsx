import { Route, Routes } from "react-router-dom";
import { useSong } from "./hooks/useSong";
import { Ref, useEffect, useRef } from 'react';
import { useAudioRef } from "./hooks/useAudioRef";
import Player from "./pages/Player";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import TabBar from "./components/TabBar";
import UserAgreement from "./pages/UserAgreement";
import Invalid from "./pages/Invalid";
import Settings from "./pages/Settings";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import Songs from "./pages/library/Songs";
import Artists from "./pages/library/Artists";
import Playlists from "./pages/library/Playlists";

//Settings Pages
import Memberships from "./pages/settings/Memberships";
import Shop from "./pages/Shop";
import Account from "./pages/settings/Account";
import Contact from "./pages/settings/Contact";
import Report from "./pages/settings/Report";
import Issues from "./pages/settings/Issues";
import UploadSong from "./pages/UploadSong";
import UploadPlaylist from "./pages/UploadPlaylist";
import Message from "./pages/Message";
import { getProfile, initialize, isInitialized } from "./functions/preferenceManager";

export default function App() {
  const { setReference } = useAudioRef();
  const audioRef: Ref<HTMLAudioElement> = useRef<HTMLAudioElement>(null);
  const { song } = useSong();

  useEffect(() => {
    const isPresent: boolean = isInitialized();
    if (!isPresent) initialize();
    else {
      console.log("Preference Profile Present in LS");
      const profile = getProfile();
      console.log(`profile: ${profile}`);
    }
  });

  useEffect(() => { setReference(audioRef) }, [setReference]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex flex-1 flex-col overflow-y-scroll">
        <Routes>
          {/* config routes */}
          <Route index element={<Home />} />
          <Route path="*" element={<Invalid />} />

          {/* media routes routes */}
          <Route path="/library">
            <Route path="songs/" element={<Songs />} />
            <Route path="playlists/" element={<Playlists />} />
            <Route path="artists/" element={<Artists />} />
          </Route>

          {/* media inspect routes */}
          <Route path="/player/:songIndex" element={<Player />} />
          <Route path="/playlist/:playlistIndex" element={<Playlist />} />
          <Route path="/artist/:artistIndex" element={<Artist />} />

          {/*  */}
          <Route path="/user-Agreement" element={<UserAgreement />} />
          <Route path="/shop/:membershipID" element={<Shop />} />

          {/* settings tabs */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings">
            <Route path="membership/" element={<Memberships />} />
            <Route path="message/" element={<Message />} />
            <Route path="account/" element={<Account />} />
            <Route path="publish/">
              <Route path="song/" element={<UploadSong />} />
              <Route path="playlist/:publishPlaylistIndex" element={<UploadPlaylist />} />
            </Route>
            <Route path="contact/" element={<Contact />} />
            <Route path="report/" element={<Report />} />
            <Route path="issues/" element={<Issues />} />
          </Route>
        </Routes>
      </div>
      <TabBar />
      <audio src={(song && song.audio) ? song.audio : ''} ref={audioRef} />
    </div>
  );
}