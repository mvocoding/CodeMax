import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext.tsx'
import { AppProvider } from './context/AppContext.tsx'
import { SupabaseProvider } from './context/SupabaseContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SupabaseProvider>
      <AppProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AppProvider>
    </SupabaseProvider>
  </BrowserRouter>
)
