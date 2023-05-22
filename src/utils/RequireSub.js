import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

export const RequireSub = () => {
    console.log("route check");
    const isSubscribedStr = localStorage.getItem('isSubscribed');
    const isSubscribed = (isSubscribedStr === 'true');
    const location = useLocation()

    return isSubscribed===true ? (
        <Outlet />
    ) : (
        <Navigate to="/subscription" state={{ from: location }} replace />
    )
}
