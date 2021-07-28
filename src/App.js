import React  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainDashBoard from './component/MainDashBoard';

import './assets/css/App.css';

import rootReducer  from './reducer/index.js';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

function App() {
  const store = createStore(rootReducer );
  return (
    <Provider store={store}>
      <div className="container_self">
        <CssBaseline />
        <MainDashBoard />
      </div>
    </Provider>
  );
}

export default App;
