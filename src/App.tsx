import { Route, Routes } from "react-router-dom";
import { useSong } from "./hooks/useSong";
import { Ref, useEffect, useRef } from 'react';
import { useAudioRef } from "./hooks/useAudioRef";
import Upload from "./pages/Upload";
import Player from "./pages/Player";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TabBar from "./components/TabBar";
import UserAgreement from "./pages/UserAgreement";
import Invalid from "./pages/Invalid";
import Settings from "./pages/Settings";
import Slices from "./pages/Slices";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import Songs from "./pages/library/Songs";
import Artists from "./pages/library/Artists";
import Playlists from "./pages/library/Playlists";

//Settings Pages
import Memberships from "./pages/settings/Memberships";
import Shop from "./pages/Shop";
import Account from "./pages/settings/Account";

export default function App() {
  const { setReference } = useAudioRef();
  const audioRef: Ref<HTMLAudioElement> = useRef<HTMLAudioElement>(null);
  const { song } = useSong();

  useEffect(() => { setReference(audioRef) }, [setReference]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="h-[calc(100%-10rem)] flex flex-col">
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
          <Route path="/slices" element={<Slices />} />

          {/* settings tabs */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings">
            <Route path="membership/" element={<Memberships />} />
            <Route path="account/" element={<Account />} />
            <Route path="upload/" element={<Upload />} />
          </Route>
        </Routes>
      </div>
      <TabBar />
      <audio src={(song && song.audio) ? song.audio : ''} ref={audioRef} />
    </div >
  );
}