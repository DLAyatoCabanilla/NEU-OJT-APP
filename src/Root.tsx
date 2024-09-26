import React from 'react';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import App from './App';

const Root: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Root;
