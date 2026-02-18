import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  const root = createRoot(container);
  root.render(app);
}