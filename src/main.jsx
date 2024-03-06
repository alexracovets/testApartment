import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import StartGenerate from './Components/StartGenerate/StartGenerate';
import StartDeep from './Components/StartDeep/StartDeep';
// import StartRay from './Components/StartRay/StartRay.jsx';
// import StartDeep from './Components/StartDeep/StartDeep.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
      {/* <StartRay /> */}
      <StartDeep />
      {/* <StartGenerate /> */}

    </Provider>
  </React.StrictMode>

  ,
)
