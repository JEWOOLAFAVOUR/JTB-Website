import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from '../screen/Auth/LoginPage';
import AdminDashboardAnalytics from '../screen/Main/dashboard/analytics/AdminDashboardAnalytics';
import AdminDashboardLayout from '../screen/Main/dashboard/analytics/AdminDashboardLayout';
import ProtectedRoute from './protectedRoute';

const Routes = () => {

    const pageRoutes = [
        {
            path: "",
            element: <LoginPage />,
            children: [
                {
                    path: "/login",
                    element: <LoginPage />,
                },
            ],
        },
    ];

    const adminRoutes = [
        {
            path: "admin",
            element: <ProtectedRoute />,
            children: [
                {
                    element: <AdminDashboardLayout />,
                    children: [
                        {
                            path: "analytics",
                            element: <AdminDashboardAnalytics />,
                        },
                        {
                            path: "*",
                            element: <h1>Page not found</h1>,
                        },
                        // student details
                    ],
                },
            ],
        },
    ];

    const router = createBrowserRouter([
        ...pageRoutes,
        ...adminRoutes,
    ]);
    return <RouterProvider router={router} />;
};
export default Routes;