import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobalStoreProvider from './stores/GlobalStore';
import App from './App';

import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStoreProvider>
        <App />
        <ToastContainer />
      </GlobalStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
