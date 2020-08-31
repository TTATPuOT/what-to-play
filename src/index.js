import React from 'react';
import ReactDOM from 'react-dom';

import Vote from './components/Vote';
import Progressbar from "./components/Progressbar";
import Start from './components/Start';

import "normalize.css";
import "./index.sass";

ReactDOM.render(
    <React.StrictMode>
        <section className="screen">
            <div className="content">
                {/*<Progressbar />*/}
                {/*<Vote />*/}
                <Start />
            </div>
        </section>
    </React.StrictMode>,
    document.getElementById('root')
);
