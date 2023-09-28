import React, { ReactComponentElement } from 'react'
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { RootState } from '../../store/store';

const ProtectedRoute = () => {
    const user = useSelector((state: RootState) => state.auth).token

    let location = useLocation();

    return (
        user ? <Outlet />
            : <Navigate to='/account/login' state={{ from: location }} replace />
    )
};

export default ProtectedRoute;
