import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import AuthProvider from 'react-auth-kit';
import App from './App.tsx'
import createStore from "react-auth-kit/createStore";

import refresh from './services/refreshToken';

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: import.meta.env.VITE_CURRENT_PROTOCOL === 'https:',
    refresh: refresh
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider store={store}>
        <App />
      </AuthProvider>
  </StrictMode>,
)
