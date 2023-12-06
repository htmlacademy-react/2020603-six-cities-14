import React from 'react';
import ReactDOM from 'react-dom/client';
import browserHistory from './browser-history';
import HistoryRouter from './components/history-router/history-router';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
