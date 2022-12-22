import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalStoreProvider from './stores/GlobalStore';
import App from './App';

import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStoreProvider>
        <App />
      </GlobalStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
