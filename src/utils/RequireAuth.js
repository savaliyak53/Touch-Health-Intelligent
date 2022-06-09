import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

export const RequireAuth = () => {
    const userId = localStorage.getItem('userId')
    const location = useLocation()

    return userId ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    )
}
