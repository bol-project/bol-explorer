import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss?v=1.0.0";
import "./assets/demo/demo.css";

import App from './components/App';
import * as serviceWorker from './serviceWorker';

import bolClientInstance from './client/bolClient';
import BolContext from './bolContext';

global.Buffer = global.Buffer || require('buffer').Buffer;

await bolClientInstance.initialize();

ReactDOM.render(
    <BolContext.Provider value={bolClientInstance}>
        <App />
    </BolContext.Provider>, 
    document.getElementById('root'));

serviceWorker.unregister();
