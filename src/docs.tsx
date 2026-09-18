import React from 'react';
import ReactDOM from 'react-dom/client';
import { Docs } from './pages/Docs';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Failed to mount Docs page.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Docs />
  </React.StrictMode>
);
