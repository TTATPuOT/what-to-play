import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import appReducer from "./reducers/app";
import choicesReducer from "./reducers/choices";
import App from "./App";

import "normalize.css";
import "./index.sass";

const reducers = combineReducers({ app: appReducer, choices: choicesReducer });
const store = createStore(reducers);

if (process.env.NODE_ENV !== "production")
    store.subscribe(() => console.log("Store changed", store.getState()))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
