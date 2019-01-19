import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';

import config from './config';
import axios from 'axios';

const serverRender = () => {
    return axios.get(`${config.serverUrl}/api/contests`)
    .then(function(response){
        return {
            initialMarkup: ReactDOMServer.renderToString(<App initialContests = {response.data.contests} />),
            initialData: response.data
        }
    })
}

export default serverRender;