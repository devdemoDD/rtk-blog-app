import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configure as createStore } from './modules';

import './styles/reset.css';
import './styles/global.css';

const store = createStore();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
