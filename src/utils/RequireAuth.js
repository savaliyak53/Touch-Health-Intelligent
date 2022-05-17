import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {

    const userId = localStorage.getItem('signUpResponse');
    const isVerified = localStorage.getItem('isVerified');
    const location = useLocation();

    return (
        userId && isVerified === 'true'
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace/>
    );
}