import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Use a specific ID to avoid conflicts when deployed to shared hosting or WordPress
const rootElement = document.getElementById('truth-x-talk-app');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);