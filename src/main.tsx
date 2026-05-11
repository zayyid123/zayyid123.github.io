import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from './components/ui/sonner';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
    <Toaster richColors position="bottom-right" />
  </HashRouter>
);
