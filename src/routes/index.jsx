import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from '../screen/Auth/LoginPage';
import AdminDashboardAnalytics from '../screen/Main/dashboard/analytics/AdminDashboardAnalytics';
import AdminDashboardLayout from '../screen/Main/dashboard/analytics/AdminDashboardLayout';
import CoursePage from '../screen/Main/dashboard/course/CoursePage';

import ProtectedRoute from './protectedRoute';
import StudentPage from '../screen/Main/dashboard/student/StudentPage';
import TransactionPage from '../screen/Main/dashboard/transaction/TransactionPage';

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
                            path: "course",
                            element: <CoursePage />,
                        },
                        {
                            path: "student",
                            element: <StudentPage />,
                        },
                        {
                            path: "transaction",
                            element: <TransactionPage />,
                        },
                        {
                            path: "*",
                            element: <h1>Page not found</h1>,
                        }
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