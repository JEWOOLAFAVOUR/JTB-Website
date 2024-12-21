import React, { useState, useEffect } from 'react';
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
    Filter,
    ChevronLeft,
    ChevronRight
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
import { getAllUser } from '../../../../api/auth';
import { sendToast } from '../../../../components/utilis';

export default function StudentPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;

    // Filtering
    const [filters, setFilters] = useState({
        status: 'all',
        dateRange: 'all'
    });

    const fetchUsers = async (page = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await getAllUser();
            if (data?.success) {
                setUsers(data?.data);
                setTotalPages(Math.ceil(data?.data.length / itemsPerPage));
                sendToast('success', data?.message);
            } else {
                setError(data?.message || 'Failed to fetch users');
                sendToast('error', data?.message);
            }
        } catch (err) {
            setError('An error occurred while fetching users');
            sendToast('error', 'Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const searchMatch =
            user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        return searchMatch;
    });

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Student Management</CardTitle>
                    <div className="flex space-x-2">
                        <Button variant="outline" className="flex items-center">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Add Student
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Student</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <p>Student registration form to be implemented</p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Badge variant="secondary">
                                Total Students: {filteredUsers.length}
                            </Badge>
                        </div>
                    </div>

                    {selectedStudents.length > 0 && (
                        <div className="mb-4">
                            <Button variant="destructive" size="sm">
                                Delete {selectedStudents.length} Selected
                            </Button>
                        </div>
                    )}

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selectedStudents.length === paginatedUsers.length}
                                            onCheckedChange={(checked) => {
                                                setSelectedStudents(
                                                    checked
                                                        ? paginatedUsers.map(user => user.id)
                                                        : []
                                                );
                                            }}
                                        />
                                    </TableHead>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Date Joined</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8">
                                            Loading students...
                                        </TableCell>
                                    </TableRow>
                                ) : error ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-red-500">
                                            {error}
                                        </TableCell>
                                    </TableRow>
                                ) : paginatedUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8">
                                            No students found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedUsers.map((student) => (
                                        <TableRow
                                            key={student.id}
                                            className="cursor-pointer hover:bg-gray-50"
                                            onClick={() => navigate('/admin/student/details')}
                                        >
                                            <TableCell onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={selectedStudents.includes(student.id)}
                                                    onCheckedChange={() => toggleStudentSelection(student.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{student.firstname}</TableCell>
                                            <TableCell>{student.lastname}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{student.score || 0}</TableCell>
                                            <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {student.status || "active"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem>Edit Student</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            Delete Student
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-gray-500">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
                        </p>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page =>
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                )
                                .map((page, index, array) => (
                                    <React.Fragment key={page}>
                                        {index > 0 && array[index - 1] !== page - 1 && (
                                            <span className="px-2">...</span>
                                        )}
                                        <Button
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </Button>
                                    </React.Fragment>
                                ))
                            }
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


// import React, { useState, useMemo, useEffect } from 'react';
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle
// } from "@/components/ui/card";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow
// } from "@/components/ui/table";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//     Search,
//     UserPlus,
//     MoreHorizontal,
//     Filter
// } from 'lucide-react';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import { useNavigate } from 'react-router-dom';
// import { getAllUser } from '../../../../api/auth';
// import { sendToast } from '../../../../components/utilis';

// export default function StudentPage() {
//     // Sample student data
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [students, setStudents] = useState([
//         {
//             id: '1',
//             firstName: 'John',
//             lastName: 'Doe',
//             matricNumber: 'MTN2023001',
//             email: 'john.doe@example.com',
//             amountSpent: 599.99,
//             courseCount: 3,
//             dateJoined: '2023-01-15',
//             status: 'Active'
//         },
//         {
//             id: '2',
//             firstName: 'Jane',
//             lastName: 'Smith',
//             matricNumber: 'MTN2023002',
//             email: 'jane.smith@example.com',
//             amountSpent: 799.50,
//             courseCount: 5,
//             dateJoined: '2023-02-20',
//             status: 'Active'
//         },
//         // Add more sample students to reach 10
//         ...Array.from({ length: 8 }, (_, i) => ({
//             id: `${i + 3}`,
//             firstName: `Student${i + 3}`,
//             lastName: `LastName${i + 3}`,
//             matricNumber: `MTN2023${String(i + 3).padStart(3, '0')}`,
//             email: `student${i + 3}@example.com`,
//             amountSpent: Math.floor(Math.random() * 1000),
//             courseCount: Math.floor(Math.random() * 6),
//             dateJoined: `2023-${String(i + 3).padStart(2, '0')}-01`,
//             status: 'Active'
//         }))
//     ]);

//     // State for search and filtering
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedStudents, setSelectedStudents] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [studentsPerPage] = useState(5);

//     // Filtering students based on search term
//     const filteredStudents = useMemo(() => {
//         return students.filter(student =>
//             student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [students, searchTerm]);

//     // Paginated students
//     const indexOfLastStudent = currentPage * studentsPerPage;
//     const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//     const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

//     // Handle page change
//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Selection handling
//     const toggleStudentSelection = (id) => {
//         setSelectedStudents(prev =>
//             prev.includes(id)
//                 ? prev.filter(studentId => studentId !== id)
//                 : [...prev, id]
//         );
//     };

//     // Calculate total metrics
//     const totalStudents = students.length;
//     const totalAmountSpent = students.reduce((sum, student) => sum + student.amountSpent, 0);

//     // Pagination controls
//     const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//     const handleNavigate = async () => {
//         console.log('bbbbbbbbbbbbbbbbbb')
//         navigate('/admin/student/details')
//     };

//     const fetchUsers = async () => {
//         const { data, status } = await getAllUser();

//         console.log('response from users', data);

//         if (data?.success === true) {
//             sendToast('success', data?.message)
//             setUsers(data?.data)
//         } else {
//             sendToast('error', data?.message);
//         };
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, [])

//     return (
//         <div className="p-6 space-y-6">
//             <Card>
//                 <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                     <CardTitle className="text-xl sm:text-2xl">Student Management</CardTitle>

//                     {/* Header Actions */}
//                     <div className="flex flex-wrap sm:space-x-2 mt-4 sm:mt-0">
//                         <Button variant="outline" className="mb-2 sm:mb-0">
//                             <Filter className="mr-2 h-4 w-4" /> Filters
//                         </Button>
//                         <Dialog>
//                             <DialogTrigger asChild>
//                                 <Button>
//                                     <UserPlus className="mr-2 h-4 w-4" /> Add Student
//                                 </Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                                 <DialogHeader>
//                                     <DialogTitle>Add New Student</DialogTitle>
//                                 </DialogHeader>
//                                 {/* Add student form would go here */}
//                                 <p>Student registration form to be implemented</p>
//                             </DialogContent>
//                         </Dialog>
//                     </div>
//                 </CardHeader>

//                 <CardContent>
//                     {/* Search and Metrics */}
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
//                         <div className="relative flex-1 sm:w-auto">
//                             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                             <Input
//                                 placeholder="Search students..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="pl-8 w-full sm:w-[300px]"
//                             />
//                         </div>

//                         {/* Metrics Badges */}
//                         <div className="mt-4 sm:mt-0 flex space-x-2">
//                             <Badge variant="secondary">
//                                 Total Students: {totalStudents}
//                             </Badge>
//                             <Badge variant="secondary">
//                                 Total Revenue: ₦{totalAmountSpent.toFixed(2)}
//                             </Badge>
//                         </div>
//                     </div>

//                     {/* Bulk Actions */}
//                     {selectedStudents.length > 0 && (
//                         <Button variant="destructive" size="sm" className="mb-4">
//                             Delete {selectedStudents.length} Student(s)
//                         </Button>
//                     )}

//                     <Separator className="my-4" />

//                     {/* Students Table */}
//                     <div className="overflow-x-auto">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead className="w-[20px]">
//                                         <Checkbox
//                                             checked={selectedStudents.length === students.length}
//                                             onCheckedChange={() =>
//                                                 setSelectedStudents(
//                                                     selectedStudents.length === students.length
//                                                         ? []
//                                                         : students.map(student => student.id)
//                                                 )
//                                             }
//                                         />
//                                     </TableHead>
//                                     <TableHead>First Name</TableHead>
//                                     <TableHead>Last Name</TableHead>
//                                     <TableHead>Email</TableHead>
//                                     <TableHead>Score</TableHead>
//                                     <TableHead>Date-Joined</TableHead>
//                                     <TableHead>Status</TableHead>
//                                     <TableHead>Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {users.map((student) => (
//                                     <TableRow
//                                         className='cursor-pointer'
//                                         onClick={() => handleNavigate()}
//                                         key={student.id}
//                                     >
//                                         <TableCell>
//                                             <Checkbox
//                                                 checked={selectedStudents.includes(student.id)}
//                                                 onCheckedChange={() => toggleStudentSelection(student.id)}
//                                             />
//                                         </TableCell>
//                                         <TableCell>{student?.firstname}</TableCell>
//                                         <TableCell>{student?.lastname}</TableCell>
//                                         <TableCell>{student?.email}</TableCell>
//                                         <TableCell>{student?.score || 0}</TableCell>
//                                         <TableCell>{student?.createdAt}</TableCell>
//                                         <TableCell>
//                                             <Badge variant="outline">{student?.status || "active"}</Badge>
//                                         </TableCell>
//                                         <TableCell>
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger asChild>
//                                                     <Button variant="ghost" size="icon">
//                                                         <MoreHorizontal className="h-4 w-4" />
//                                                     </Button>
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent>
//                                                     <DropdownMenuItem>View Details</DropdownMenuItem>
//                                                     <DropdownMenuItem>Edit Student</DropdownMenuItem>
//                                                     <DropdownMenuItem className="text-red-500">Delete Student</DropdownMenuItem>
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="flex justify-center mt-4 space-x-2">
//                         {Array.from({ length: totalPages }).map((_, index) => (
//                             <Button
//                                 key={index}
//                                 onClick={() => handlePageChange(index + 1)}
//                                 size="sm"
//                                 variant={currentPage === index + 1 ? "primary" : "outline"}
//                             >
//                                 {index + 1}
//                             </Button>
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

