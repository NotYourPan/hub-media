import React from 'react';
import ReactDOM from 'react-dom/client';
import { About } from './pages/About';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Failed to mount About page.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <About />
  </React.StrictMode>
);
