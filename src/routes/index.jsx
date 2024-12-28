import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from '../screen/Auth/LoginPage';
import AdminDashboardAnalytics from '../screen/Main/dashboard/analytics/AdminDashboardAnalytics';
import AdminDashboardLayout from '../screen/Main/dashboard/analytics/AdminDashboardLayout';
import CoursePage from '../screen/Main/dashboard/course/CoursePage';

import ProtectedRoute from './protectedRoute';
import StudentPage from '../screen/Main/dashboard/student/StudentPage';
import TransactionPage from '../screen/Main/dashboard/transaction/TransactionPage';
import ProfilePage from '../screen/Main/dashboard/profile/ProfilePage';
import CourseDetail from '../screen/Main/dashboard/course/CourseDetail';
import StudentDetailsPage from '../screen/Main/dashboard/student/StudentDetailPage';
import StudentVerificationPage from '../screen/Main/StudentPage/StudentVerificationPage';
import PastQuestionPage from '../screen/Main/dashboard/past-question/PastQuestionPage';
import UniversitySelectionPage from '../screen/Auth/UniversitySelectionPage';
import PastQuestionDetailPage from '../screen/Main/dashboard/past-question/PastQuestionDetailPage';
import LessonQuestionPage from '../screen/Main/dashboard/course/LessonQuestionPage';
import ContestPage from '../screen/Main/dashboard/contest/ContestPage';
import ContestDetailPage from '../screen/Main/dashboard/contest/ContestDetailPage';

const Routes = () => {


    const pageRoutes = [
        {
            path: "",
            element: <LoginPage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/university",
            element: <UniversitySelectionPage />,
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
                            path: "past-question",
                            element: <PastQuestionPage />,
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
                            path: "contest",
                            element: <ContestPage />,
                        },
                        {
                            path: "profile",
                            element: <ProfilePage />,
                        },
                        {
                            path: "course/details/:courseId",
                            element: <CourseDetail />,
                        },
                        {
                            path: "course/lesson/:lessonId/questions",
                            element: <LessonQuestionPage />,
                        },
                        {
                            path: "student/details",
                            element: <StudentDetailsPage />,
                        },
                        {
                            path: "past-question/details/:id",
                            element: <PastQuestionDetailPage />,
                        },
                        {
                            path: "contest/details/:id",
                            element: <ContestDetailPage />,
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