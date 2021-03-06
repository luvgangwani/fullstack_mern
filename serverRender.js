import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';

import config from './config';
import axios from 'axios';

const getApiUrl = contestId => {
    if (contestId) {
        return `${config.serverUrl}/api/contests/${contestId}`;
    }
    return `${config.serverUrl}/api/contests`;
}

const getInitialData = (contestId, apiData) => {
    if (contestId) {
        return {
            currentContestId: apiData._id,
            contests: {
                [apiData._id]: apiData
            }
        }
    }

    return { 
        contests: apiData.contests
    }
}

const serverRender = (contestId) => {
    let apiUrl = getApiUrl(contestId);
    return axios.get(apiUrl)
    .then(function(response){
        const initialData = getInitialData(contestId, response.data)
        return {
            initialMarkup: ReactDOMServer.renderToString(<App initialData = {initialData} />),
            initialData: initialData
        }
    })
}

export default serverRender;