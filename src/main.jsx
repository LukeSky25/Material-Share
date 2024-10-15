import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';

import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { Rotas } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer
          className={'toast'}
          autoClose={3000}
        />
        <Rotas />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
