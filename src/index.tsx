import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorMessage from './components/error-message/error-message';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
