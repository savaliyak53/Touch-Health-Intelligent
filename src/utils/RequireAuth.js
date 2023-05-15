import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export const RequireAuth = () => {
  // const token = localStorage.getItem('token');
  const context = useContext(AuthContext); 
  const token = context?.authTokens;
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export const RequireSignup = () => {
  const context = useContext(AuthContext); 
  // const userId = localStorage.getItem('userId');
  const userId = context?.user;
  const location = useLocation();

  return userId ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
