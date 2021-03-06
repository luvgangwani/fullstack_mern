import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// Takes over any ejs content and replaces it with the content in jsx
ReactDOM.hydrate(
    <App initialData = {window.initialData}/>,
    document.getElementById('root')
);