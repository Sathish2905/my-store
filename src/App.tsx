import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
          <Toaster position="top-right" />
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;