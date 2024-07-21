import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SongProvider } from './context/SongProvider.tsx';
import { PlayerProvider } from './context/PlayerProvider.tsx';
import { AudioRefProvider } from './context/AudioRefProvider.tsx';
import { DataProvider } from './context/DataProvider.tsx';
import { UserProvider } from './context/UserProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <SongProvider>
          <AudioRefProvider>
            <PlayerProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </PlayerProvider>
          </AudioRefProvider>
        </SongProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
);