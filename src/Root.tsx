import React from 'react';
import { AppProvider } from './context/AppContext';
import { App } from './App';

export const Root: React.FC = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default Root;
