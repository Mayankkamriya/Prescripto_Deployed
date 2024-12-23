import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import  AppContextProvider  from './context/AppContext.jsx';

import AdminAppContextProvider from './Admin/context/AppContext.jsx'
import DoctorContextProvider from './Admin/context/DoctorContext.jsx'
import AdminContextProvider from './Admin/context/AdminContext.jsx'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AdminAppContextProvider>

          <AppContextProvider>
            <App />
          </AppContextProvider>

        </AdminAppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
  );
} else {
  console.error("Root element not found");
}