import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SongProvider } from './context/SongProvider.tsx';
import { PlayerProvider } from './context/PlayerProvider.tsx';
import { AudioRefProvider } from './context/AudioRefProvider.tsx';
import { SongQueueProvider } from './context/SongQueueProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>






      <SongQueueProvider>

        <AudioRefProvider>

          <SongProvider>

            <PlayerProvider>

              <App />

            </PlayerProvider>

          </SongProvider>

        </AudioRefProvider>

      </SongQueueProvider>






    </BrowserRouter>
  </React.StrictMode>,
);