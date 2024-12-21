import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Mail,
    Phone,
    Calendar,
    FileDown,
    Activity,
    Clock,
    Flame,
    Trophy,
    BarChart
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StudentDetailsPage() {
    const [studentDetails] = useState({
        id: 'MTN2023001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+234 123 456 7890',
        dateJoined: '2023-01-15',
        lastLogin: '2024-12-21 09:45 AM',
        loginStreak: 15,
        totalScore: 850,
        weeklyLoginCount: 20,
        totalLoginTime: '45h 30m'
    });

    const [isLoginHistoryModalOpen, setIsLoginHistoryModalOpen] = useState(false);

    // Weekly login statistics
    const [weeklyStats] = useState([
        { week: 'Week 1', logins: 20, totalTime: '10h 15m' },
        { week: 'Week 2', logins: 15, totalTime: '8h 45m' },
        { week: 'Week 3', logins: 25, totalTime: '12h 30m' },
        { week: 'Week 4', logins: 18, totalTime: '9h 20m' }
    ]);

    // Detailed login activities
    const [loginActivities] = useState([
        {
            id: 1,
            loginTime: '2024-12-21 09:45:23',
            logoutTime: '2024-12-21 10:30:45',
            duration: '45m 22s',
            deviceType: 'Mobile',
            ipAddress: '192.168.1.1'
        },
        {
            id: 2,
            loginTime: '2024-12-21 14:20:10',
            logoutTime: '2024-12-21 15:15:30',
            duration: '55m 20s',
            deviceType: 'Desktop',
            ipAddress: '192.168.1.2'
        },
        {
            id: 3,
            loginTime: '2024-12-20 08:30:15',
            logoutTime: '2024-12-20 09:45:20',
            duration: '1h 15m 5s',
            deviceType: 'Tablet',
            ipAddress: '192.168.1.3'
        }
    ]);

    const [activities] = useState([
        {
            id: 1,
            type: 'test',
            course: 'CSC 202',
            description: 'Mid-semester Test',
            score: 20,
            maxScore: 30,
            date: '2024-12-20',
            time: '14:30'
        },
        {
            id: 2,
            type: 'login',
            description: 'System Login',
            date: '2024-12-21',
            time: '09:45'
        },
        {
            id: 3,
            type: 'quiz',
            course: 'CSC 201',
            description: 'Programming Quiz',
            score: 95,
            maxScore: 100,
            date: '2024-12-18',
            time: '11:20'
        }
    ]);

    const handleDownloadReport = () => {
        alert('Generating activity report PDF...');
    };

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="mr-2 h-6 w-6" /> Student Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span>{studentDetails.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span>{studentDetails.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span>Joined: {studentDetails.dateJoined}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span>Last Login: {studentDetails.lastLogin}</span>
                            </div>
                            <div className="flex items-center">
                                <Flame className="mr-2 h-5 w-5 text-orange-500" />
                                <span>Login Streak: {studentDetails.loginStreak} days</span>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Score</p>
                                    <p className="font-semibold">{studentDetails.totalScore}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Weekly Logins</p>
                                    <p className="font-semibold">{studentDetails.weeklyLoginCount}</p>
                                </div>
                            </div>
                            <Button
                                onClick={handleDownloadReport}
                                className="w-full"
                            >
                                <FileDown className="mr-2 h-4 w-4" /> Download Activity Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* App Usage Card */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center">
                            <BarChart className="mr-2 h-6 w-6" /> App Usage Analytics
                        </CardTitle>
                        <Button
                            variant="outline"
                            onClick={() => setIsLoginHistoryModalOpen(true)}
                        >
                            <Activity className="mr-2 h-4 w-4" /> View Login History
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Week</TableHead>
                                    <TableHead>Login Count</TableHead>
                                    <TableHead>Total Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {weeklyStats.map((week, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{week.week}</TableCell>
                                        <TableCell>{week.logins} times</TableCell>
                                        <TableCell>{week.totalTime}</TableCell>
                                        <TableCell>
                                            <Badge variant={week.logins >= 20 ? "success" : "warning"}>
                                                {week.logins >= 20 ? 'Active' : 'Moderate'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Activity className="mr-2 h-6 w-6" /> Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Activity</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activities.map((activity) => (
                                <TableRow key={activity.id}>
                                    <TableCell>
                                        {activity.date}<br />
                                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                                    </TableCell>
                                    <TableCell>{activity.description}</TableCell>
                                    <TableCell>
                                        {activity.score !== undefined ?
                                            `Score: ${activity.score}/${activity.maxScore}` :
                                            'System Access'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            activity.type === 'login' ? "outline" :
                                                (activity.score / activity.maxScore >= 0.7) ? "success" : "warning"
                                        }>
                                            {activity.type === 'login' ? 'Completed' :
                                                (activity.score / activity.maxScore >= 0.7) ? 'Good' : 'Needs Improvement'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Login History Modal */}
            <Dialog
                open={isLoginHistoryModalOpen}
                onOpenChange={setIsLoginHistoryModalOpen}
            >
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Login History</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] w-full pr-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Login Time</TableHead>
                                    <TableHead>Logout Time</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Device</TableHead>
                                    <TableHead>IP Address</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loginActivities.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell>{activity.loginTime}</TableCell>
                                        <TableCell>{activity.logoutTime}</TableCell>
                                        <TableCell>{activity.duration}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {activity.deviceType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{activity.ipAddress}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
};
