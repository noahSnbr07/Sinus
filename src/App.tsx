import { Route, Routes } from "react-router-dom";
import Library from "./pages/Library";
import Player from "./pages/Player";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useSong } from "./hooks/useSong";
import { Ref, useEffect, useRef } from 'react';
import { useAudioRef } from "./hooks/useAudioRef";
import Upload from "./pages/Upload";
import TabBar from "./components/TabBar";
// import { PlayerProps } from "./interfaces/interfaces";
// import { usePlayer } from "./hooks/usePlayer";

export default function App() {
  const { setReference } = useAudioRef();
  const audioRef: Ref<HTMLAudioElement> = useRef<HTMLAudioElement>(null);
  const { song } = useSong();
  // const { setPlayer } = usePlayer();

  //infinite loop ??

  // useEffect(() => {
  //   const updateProgress = () => {
  //     if (audioRef.current) {
  //       setPlayer((prev: PlayerProps) => ({ ...prev, progress: audioRef.current!.currentTime }));
  //     }
  //   };

  //   const intervalID = setInterval(updateProgress, 1000);

  //   return () => clearInterval(intervalID);
  // }, [audioRef, setPlayer]);

  // useEffect(() => {
  //   setReference(audioRef);
  // }, [song, audioRef, setReference]);

  useEffect(() => { setReference(audioRef) }, [setReference]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="h-[calc(100%-10rem)] flex flex-col">
        <Routes>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Library" element={<Library />} />
          <Route path="Upload" element={<Upload />} />
          <Route path="Player/:songIndex" element={<Player />} />
        </Routes>
      </div>
      <TabBar />
      <audio src={song.audio} ref={audioRef} />
    </div>
  );
}