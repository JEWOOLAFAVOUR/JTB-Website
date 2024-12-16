import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import {
    Users,
    BookOpen,
    DollarSign,
    TrendingUp
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Sample data (you'll replace with actual backend data)
const courseData = [
    { name: 'Jan', transactions: 12, students: 350, revenue: 15000 },
    { name: 'Feb', transactions: 15, students: 420, revenue: 18500 },
    { name: 'Mar', transactions: 18, students: 500, revenue: 22000 },
    { name: 'Apr', transactions: 20, students: 580, revenue: 25000 },
    { name: 'May', transactions: 22, students: 650, revenue: 28500 },
];

export default function AdminDashboardAnalytics() {
    // Calculate key metrics
    const totalCourses = 20;
    const totalStudents = 87;
    const totalRevenue = courseData.reduce((sum, item) => sum + item.revenue, 0);

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Key Metrics Cards */}
                <Card className="cursor-pointer shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-700">Total Courses</CardTitle>
                        <BookOpen className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-semibold text-gray-900">{totalCourses}</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-700">Total Students</CardTitle>
                        <Users className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-semibold text-gray-900">{totalStudents}</div>
                        <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
                        <DollarSign className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-semibold text-gray-900">₦{totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+25% from last month</p>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-700">Growth Rate</CardTitle>
                        <TrendingUp className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-semibold text-gray-900">22%</div>
                        <p className="text-xs text-muted-foreground">Overall platform growth</p>
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Transaction Bar Chart */}
                <Card className="shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium text-gray-700">Transaction Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={courseData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="transactions" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Students Line Chart */}
                <Card className="shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium text-gray-700">Student Enrollment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={courseData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="students" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-700">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-700">New Course Added</p>
                                <p className="text-xs text-muted-foreground">Advanced React Development</p>
                            </div>
                            <Badge variant="outline">Just now</Badge>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-700">New Student Enrollment</p>
                                <p className="text-xs text-muted-foreground">50 students joined today</p>
                            </div>
                            <Badge variant="outline">2 hours ago</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
