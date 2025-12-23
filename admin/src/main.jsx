import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your VITE_CLERK_PUBLISHABLE_KEY to the .env file")
}
const fallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          elements: {
            footer: { display: 'none' },
            socialButtons: { baseTheme: 'dark' }
          }
        }}>
        <QueryClientProvider client={queryClient}>
          < ErrorBoundary fallbackRender={fallback}>
            <App />
          </ErrorBoundary>
        </QueryClientProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
