import React from 'react'
import ReactDOM from 'react-dom/client'
import {IntlProvider} from 'react-intl';
import { RouterProvider } from "react-router-dom";
// services
import ApiProvider from './services/ApiProvider.tsx'
// router
import router from "./browserRouter.ts";
// styles
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider>
      <IntlProvider locale={navigator.language}>
        <RouterProvider router={router} />
      </IntlProvider>
    </ApiProvider>
  </React.StrictMode>,
)