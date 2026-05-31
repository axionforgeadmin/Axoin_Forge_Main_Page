import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Design system styles — order matters: tokens first, then layout.
import './styles/tokens.css';
import './styles/main.css';

// Registers the <image-slot> web component used by WhoWeAre.
import './lib/image-slot.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
