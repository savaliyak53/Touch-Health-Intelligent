import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { DashboardProvider } from './contexts/DashboardContext';
import Application from './App';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <DashboardProvider>
        <SocketProvider>
          <Application />
        </SocketProvider>
      </DashboardProvider>
    </AuthProvider>
  </BrowserRouter>
  );
