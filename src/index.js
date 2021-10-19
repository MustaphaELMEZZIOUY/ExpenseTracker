import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';
import App from './App';
import './index.css';
import {Provider} from './context/context'

ReactDOM.render(
    <SpeechProvider appId = "efa54c83-42fd-4718-b0df-a4b6bb188d92" language = "en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>,
    document.getElementById('root')
);