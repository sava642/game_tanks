import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import './shared/config/i18n/i18n';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback="Loading...">
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>

);

reportWebVitals();
