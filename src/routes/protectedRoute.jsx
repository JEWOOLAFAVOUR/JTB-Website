import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from '../store/useStore';

export default function ProtectedRoute() {
    // const isAuthenticated = true; // Replace this with real authentication logic

    const { token } = useStore.getState()


    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

