import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

export const RequireSubscription = () => {
    const isSubscribedStr = localStorage.getItem('isSubscribed');
    const isSubscribed = (isSubscribedStr === 'true');
    console.log("is subscribed in route", isSubscribed);
    const location = useLocation()
    return isSubscribed ? (
        <Outlet />
    ) : (
        <Navigate to="/subscription" state={{ from: location }} replace />
    )
}
