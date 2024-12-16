import React, { useState, useMemo } from 'react';
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
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    UserPlus,
    MoreHorizontal,
    Filter
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

export default function StudentPage() {
    // Sample student data
    const navigate = useNavigate();
    const [students, setStudents] = useState([
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            matricNumber: 'MTN2023001',
            email: 'john.doe@example.com',
            amountSpent: 599.99,
            courseCount: 3,
            dateJoined: '2023-01-15',
            status: 'Active'
        },
        {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            matricNumber: 'MTN2023002',
            email: 'jane.smith@example.com',
            amountSpent: 799.50,
            courseCount: 5,
            dateJoined: '2023-02-20',
            status: 'Active'
        },
        // Add more sample students to reach 10
        ...Array.from({ length: 8 }, (_, i) => ({
            id: `${i + 3}`,
            firstName: `Student${i + 3}`,
            lastName: `LastName${i + 3}`,
            matricNumber: `MTN2023${String(i + 3).padStart(3, '0')}`,
            email: `student${i + 3}@example.com`,
            amountSpent: Math.floor(Math.random() * 1000),
            courseCount: Math.floor(Math.random() * 6),
            dateJoined: `2023-${String(i + 3).padStart(2, '0')}-01`,
            status: 'Active'
        }))
    ]);

    // State for search and filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);

    // Filtering students based on search term
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [students, searchTerm]);

    // Paginated students
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Selection handling
    const toggleStudentSelection = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id)
                ? prev.filter(studentId => studentId !== id)
                : [...prev, id]
        );
    };

    // Calculate total metrics
    const totalStudents = students.length;
    const totalAmountSpent = students.reduce((sum, student) => sum + student.amountSpent, 0);

    // Pagination controls
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const handleNavigate = async () => {
        console.log('bbbbbbbbbbbbbbbbbb')
        navigate('/admin/student/details')
    }

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-xl sm:text-2xl">Student Management</CardTitle>

                    {/* Header Actions */}
                    <div className="flex flex-wrap sm:space-x-2 mt-4 sm:mt-0">
                        <Button variant="outline" className="mb-2 sm:mb-0">
                            <Filter className="mr-2 h-4 w-4" /> Filters
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <UserPlus className="mr-2 h-4 w-4" /> Add Student
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Student</DialogTitle>
                                </DialogHeader>
                                {/* Add student form would go here */}
                                <p>Student registration form to be implemented</p>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Search and Metrics */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
                        <div className="relative flex-1 sm:w-auto">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 w-full sm:w-[300px]"
                            />
                        </div>

                        {/* Metrics Badges */}
                        <div className="mt-4 sm:mt-0 flex space-x-2">
                            <Badge variant="secondary">
                                Total Students: {totalStudents}
                            </Badge>
                            <Badge variant="secondary">
                                Total Revenue: ₦{totalAmountSpent.toFixed(2)}
                            </Badge>
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    {selectedStudents.length > 0 && (
                        <Button variant="destructive" size="sm" className="mb-4">
                            Delete {selectedStudents.length} Student(s)
                        </Button>
                    )}

                    <Separator className="my-4" />

                    {/* Students Table */}
                    <div className="overflow-x-auto">
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
                                    <TableHead>Email</TableHead>
                                    <TableHead>Amount Spent</TableHead>
                                    <TableHead>Courses</TableHead>
                                    <TableHead>Date Joined</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentStudents.map((student) => (
                                    <TableRow
                                        className='cursor-pointer'
                                        onClick={() => handleNavigate()}
                                        key={student.id}
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedStudents.includes(student.id)}
                                                onCheckedChange={() => toggleStudentSelection(student.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{student.firstName}</TableCell>
                                        <TableCell>{student.lastName}</TableCell>
                                        <TableCell>{student.matricNumber}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>₦{student.amountSpent.toFixed(2)}</TableCell>
                                        <TableCell>{student.courseCount}</TableCell>
                                        <TableCell>{student.dateJoined}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{student.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit Student</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500">Delete Student</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4 space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                size="sm"
                                variant={currentPage === index + 1 ? "primary" : "outline"}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

