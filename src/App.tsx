import { Route, Routes } from "react-router-dom";
import Player from "./pages/Player";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useSong } from "./hooks/useSong";
import { Ref, useEffect, useRef } from 'react';
import { useAudioRef } from "./hooks/useAudioRef";
import Upload from "./pages/Upload";
import TabBar from "./components/TabBar";
import UserAgreement from "./pages/UserAgreement";
import Invalid from "./pages/Invalid";
import Library from "./pages/Library";
import Settings from "./pages/Settings";

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
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Invalid />} />

          {/* in-app routes */}
          <Route path="library" element={<Library />} />
          <Route path="upload" element={<Upload />} />
          <Route path="player/:songIndex" element={<Player />} />
          <Route path="user-Agreement" element={<UserAgreement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shop/:membershipID" element={<Shop />} />

          {/* Settings Routes */}
          <Route path="/settings/membership" element={<Memberships />} />
          <Route path="/settings/preferences" element={<Memberships />} />
          <Route path="/settings/account" element={<Account />} />

        </Routes>
      </div>
      <TabBar />
      <audio src={(song && song.audio) ? song.audio : ''} ref={audioRef} />
    </div>
  );
}