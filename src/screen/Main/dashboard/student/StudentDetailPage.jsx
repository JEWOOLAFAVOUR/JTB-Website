import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Mail,
    Phone,
    BookOpen,
    DollarSign,
    Calendar,
    FileDown,
    ReceiptText
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StudentDetailsPage() {
    // Student Details
    const [studentDetails] = useState({
        id: 'MTN2023001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+234 123 456 7890',
        dateOfBirth: '1998-05-15',
        dateJoined: '2023-01-15',
        totalCoursesEnrolled: 5,
        totalAmountSpent: 2999.50,
        status: 'Active'
    });

    // Courses Enrolled
    const [courses, setCourses] = useState([
        {
            id: '1',
            name: 'Web Development Masterclass',
            price: 599.99,
            datePurchased: '2023-02-15',
            certificateCollected: false
        },
        {
            id: '2',
            name: 'Advanced Python Programming',
            price: 449.50,
            datePurchased: '2023-03-20',
            certificateCollected: true
        }
    ]);

    // Transaction History
    const [transactions, setTransactions] = useState([
        {
            id: 'TXN001',
            courseName: 'Web Development Masterclass',
            amount: 599.99,
            date: '2023-02-15',
            status: 'Completed'
        },
        {
            id: 'TXN002',
            courseName: 'Advanced Python Programming',
            amount: 449.50,
            date: '2023-03-20',
            status: 'Completed'
        }
    ]);

    // Transaction History Modal State
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

    // PDF Download Function (Placeholder)
    const handleDownloadReport = () => {
        // In a real application, you'd use a library like jspdf or call a backend service
        alert('Generating student report PDF...');
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
                            <Separator />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                                    <p className="font-semibold">{studentDetails.totalCoursesEnrolled}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Spent</p>
                                    <p className="font-semibold">₦{studentDetails.totalAmountSpent.toFixed(2)}</p>
                                </div>
                            </div>
                            <Button
                                onClick={handleDownloadReport}
                                className="w-full"
                            >
                                <FileDown className="mr-2 h-4 w-4" /> Download Student Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Courses Enrolled Card */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center">
                            <BookOpen className="mr-2 h-6 w-6" /> Courses Enrolled
                        </CardTitle>
                        <Button
                            variant="outline"
                            onClick={() => setIsTransactionModalOpen(true)}
                        >
                            <ReceiptText className="mr-2 h-4 w-4" /> View Transactions
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Date Purchased</TableHead>
                                    <TableHead>Certificate Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell>{course.name}</TableCell>
                                        <TableCell>₦{course.price.toFixed(2)}</TableCell>
                                        <TableCell>{course.datePurchased}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={course.certificateCollected ? "default" : "outline"}
                                            >
                                                {course.certificateCollected ? 'Collected' : 'Pending'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction History Modal */}
            <Dialog
                open={isTransactionModalOpen}
                onOpenChange={setIsTransactionModalOpen}
            >
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Transaction History</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] w-full pr-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.id}</TableCell>
                                        <TableCell>{transaction.courseName}</TableCell>
                                        <TableCell>₦{transaction.amount.toFixed(2)}</TableCell>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{transaction.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
}