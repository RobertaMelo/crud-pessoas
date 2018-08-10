import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Primeiro from './componentes/Primeiro'

ReactDOM.render(<Primeiro />, document.getElementById('root'));
registerServiceWorker();
