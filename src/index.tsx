import React from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./App";
import {QueryProvider} from "./lib/query";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <QueryProvider>
        <App/>
        <ToastContainer/>
    </QueryProvider>
);
reportWebVitals();


