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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Users,
    DollarSign,
    FileDown,
    Search
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function CourseDetail() {
    // Sample initial student data
    const [students, setStudents] = useState([
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            matricNumber: 'CS22/1234',
            courseName: 'Web Development Masterclass',
            status: 'collected',
            paid: true
        },
        {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            matricNumber: 'CS22/5678',
            courseName: 'Web Development Masterclass',
            status: "pending",
            paid: false
        }
    ]);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Statistics calculations
    const totalStudents = students.length;
    const paidStudents = students.filter(student => student.paid).length;

    // Export to CSV function
    const exportToCSV = () => {
        // Create CSV content
        const csvContent = [
            "First Name,Last Name,Matric Number,Course Name,Payment Status",
            ...students.map(student =>
                `${student.firstName},${student.lastName},${student.matricNumber},${student.courseName},${student.paid ? 'Paid' : 'Unpaid'}`
            )
        ].join("\n");

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "course_students.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Filtered students based on search
    const filteredStudents = students.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Toggle student selection
    const toggleStudentSelection = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id)
                ? prev.filter(studentId => studentId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-xl sm:text-2xl">Web Development Masterclass - Student Enrollment</CardTitle>

                    {/* Statistics Badges */}
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                        <Badge variant="secondary" className="flex items-center">
                            <Users className="mr-1 h-4 w-4" /> {totalStudents} Total Students
                        </Badge>
                        <Badge variant="secondary" className="flex items-center">
                            <DollarSign className="mr-1 h-4 w-4" /> {paidStudents} Paid Students
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Search and Export Section */}
                    <div className="flex flex-col sm:flex-row items-center py-4 sm:space-x-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 max-w-sm"
                            />
                        </div>
                        <div className="flex space-x-2 mt-4 sm:mt-0">
                            <Button onClick={exportToCSV}>
                                <FileDown className="mr-2 h-4 w-4" /> Export CSV
                            </Button>
                            {selectedStudents.length > 0 && (
                                <Button variant="destructive" size="sm">
                                    Remove Selected
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Students Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[20px]">
                                    <Checkbox
                                        checked={selectedStudents.length === students.length}
                                        onCheckedChange={() =>
                                            setSelectedStudents(
                                                selectedStudents.length === students.length
                                                    ? []
                                                    : students.map(student => student.id)
                                            )
                                        }
                                    />
                                </TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Matric Number</TableHead>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Payment Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedStudents.includes(student.id)}
                                            onCheckedChange={() => toggleStudentSelection(student.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{student.firstName}</TableCell>
                                    <TableCell>{student.lastName}</TableCell>
                                    <TableCell>{student.matricNumber}</TableCell>
                                    <TableCell>{student.courseName}</TableCell>
                                    <TableCell>{student.courseName}</TableCell>
                                    <TableCell>
                                        <Badge variant={student.paid ? "default" : "destructive"}>
                                            {student.paid ? 'Paid' : 'Unpaid'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
} 