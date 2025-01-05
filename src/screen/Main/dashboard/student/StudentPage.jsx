import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Search,
    Loader2,
    MoreHorizontal,
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
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { getAllUser, searchUsers } from '../../../../api/auth';

const ITEMS_PER_PAGE = 20;
const SEARCH_THRESHOLD = 4;

export default function StudentPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    // Filtering
    const [selectedLevel, setSelectedLevel] = useState('all');

    const levels = ['100', '200', '300', '400', '500'];

    const fetchUsers = async (page) => {
        setIsLoading(true);
        try {
            const response = await getAllUser({ page, limit: ITEMS_PER_PAGE });
            if (response.data?.success) {
                setUsers(response.data.data);
                setTotalPages(response.data.totalPages);
                setTotalUsers(response.data.total);
            } else {
                setError(response.data?.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError('An error occurred while fetching users');
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (query.length >= SEARCH_THRESHOLD) {
                setIsSearching(true);
                try {
                    const response = await searchUsers(query);
                    if (response.data?.success) {
                        setUsers(response.data.data);
                        setTotalUsers(response.data.total);
                        setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
                    }
                } catch (err) {
                    setError('Search failed');
                } finally {
                    setIsSearching(false);
                }
            } else if (query.length === 0) {
                fetchUsers(1);
            }
        }, 500),
        []
    );

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => debouncedSearch.cancel();
    }, [searchTerm, debouncedSearch]);

    const filteredUsers = users.filter(user =>
        selectedLevel === 'all' || user.level?.toString() === selectedLevel
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        if (searchTerm.length < SEARCH_THRESHOLD) {
            fetchUsers(newPage);
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <CardTitle>Student Management</CardTitle>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Levels</SelectItem>
                                    {levels.map(level => (
                                        <SelectItem key={level} value={level}>Level {level}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            {isSearching && (
                                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />
                            )}
                            <Input
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-10"
                            />
                        </div>
                        <Badge variant="secondary" className="h-9 px-4 flex items-center">
                            Total Students: {totalUsers}
                        </Badge>
                    </div>

                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Date Joined</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                        </TableCell>
                                    </TableRow>
                                ) : error ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-red-500">
                                            {error}
                                        </TableCell>
                                    </TableRow>
                                ) : filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            No students found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((student) => (
                                        <TableRow
                                            key={student._id}
                                            className="cursor-pointer hover:bg-gray-50"
                                            onClick={() => navigate(`/admin/student/details/${student._id}`)}
                                        >
                                            <TableCell>
                                                {student.firstname} {student.lastname}
                                            </TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>
                                                <Badge>{student.level || 'N/A'}</Badge>
                                            </TableCell>
                                            <TableCell>{student.department?.name || 'N/A'}</TableCell>
                                            <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => navigate(`/admin/student/${student._id}`)}>
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => navigate(`/admin/student/edit/${student._id}`)}>
                                                            Edit Student
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

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                        <p className="text-sm text-gray-500">
                            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalUsers)} of {totalUsers} results
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
                                ))}
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












// import React, { useState, useEffect } from 'react';
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
//     Filter,
//     ChevronLeft,
//     ChevronRight
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
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedStudents, setSelectedStudents] = useState([]);

//     // Pagination
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const itemsPerPage = 20;

//     // Filtering
//     const [filters, setFilters] = useState({
//         status: 'all',
//         dateRange: 'all'
//     });

//     const fetchUsers = async (page = 1) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const { data } = await getAllUser();
//             if (data?.success) {
//                 setUsers(data?.data);
//                 setTotalPages(Math.ceil(data?.data.length / itemsPerPage));
//                 sendToast('success', data?.message);
//             } else {
//                 setError(data?.message || 'Failed to fetch users');
//                 sendToast('error', data?.message);
//             }
//         } catch (err) {
//             setError('An error occurred while fetching users');
//             sendToast('error', 'Failed to fetch users');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const filteredUsers = users.filter(user => {
//         const searchMatch =
//             user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.email?.toLowerCase().includes(searchTerm.toLowerCase());

//         return searchMatch;
//     });

//     const paginatedUsers = filteredUsers.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     const toggleStudentSelection = (id) => {
//         setSelectedStudents(prev =>
//             prev.includes(id)
//                 ? prev.filter(studentId => studentId !== id)
//                 : [...prev, id]
//         );
//     };

//     return (
//         <div className="p-6 space-y-6">
//             <Card>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle>Student Management</CardTitle>
//                     <div className="flex space-x-2">
//                         <Button variant="outline" className="flex items-center">
//                             <Filter className="mr-2 h-4 w-4" />
//                             Filters
//                         </Button>
//                         <Dialog>
//                             <DialogTrigger asChild>
//                                 <Button>
//                                     <UserPlus className="mr-2 h-4 w-4" />
//                                     Add Student
//                                 </Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                                 <DialogHeader>
//                                     <DialogTitle>Add New Student</DialogTitle>
//                                 </DialogHeader>
//                                 <div className="py-4">
//                                     <p>Student registration form to be implemented</p>
//                                 </div>
//                             </DialogContent>
//                         </Dialog>
//                     </div>
//                 </CardHeader>

//                 <CardContent>
//                     <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//                         <div className="relative w-full sm:w-96">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                             <Input
//                                 placeholder="Search students..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="pl-10"
//                             />
//                         </div>
//                         <div className="flex space-x-2">
//                             <Badge variant="secondary">
//                                 Total Students: {filteredUsers.length}
//                             </Badge>
//                         </div>
//                     </div>

//                     {selectedStudents.length > 0 && (
//                         <div className="mb-4">
//                             <Button variant="destructive" size="sm">
//                                 Delete {selectedStudents.length} Selected
//                             </Button>
//                         </div>
//                     )}

//                     <div className="rounded-md border">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead className="w-[50px]">
//                                         <Checkbox
//                                             checked={selectedStudents.length === paginatedUsers.length}
//                                             onCheckedChange={(checked) => {
//                                                 setSelectedStudents(
//                                                     checked
//                                                         ? paginatedUsers.map(user => user.id)
//                                                         : []
//                                                 );
//                                             }}
//                                         />
//                                     </TableHead>
//                                     <TableHead>First Name</TableHead>
//                                     <TableHead>Last Name</TableHead>
//                                     <TableHead>Email</TableHead>
//                                     <TableHead>Score</TableHead>
//                                     <TableHead>Date Joined</TableHead>
//                                     <TableHead>Status</TableHead>
//                                     <TableHead>Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {isLoading ? (
//                                     <TableRow>
//                                         <TableCell colSpan={8} className="text-center py-8">
//                                             Loading students...
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : error ? (
//                                     <TableRow>
//                                         <TableCell colSpan={8} className="text-center py-8 text-red-500">
//                                             {error}
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : paginatedUsers.length === 0 ? (
//                                     <TableRow>
//                                         <TableCell colSpan={8} className="text-center py-8">
//                                             No students found
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : (
//                                     paginatedUsers.map((student) => (
//                                         <TableRow
//                                             key={student.id}
//                                             className="cursor-pointer hover:bg-gray-50"
//                                             onClick={() => navigate('/admin/student/details')}
//                                         >
//                                             <TableCell onClick={(e) => e.stopPropagation()}>
//                                                 <Checkbox
//                                                     checked={selectedStudents.includes(student.id)}
//                                                     onCheckedChange={() => toggleStudentSelection(student.id)}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>{student.firstname}</TableCell>
//                                             <TableCell>{student.lastname}</TableCell>
//                                             <TableCell>{student.email}</TableCell>
//                                             <TableCell>{student.score || 0}</TableCell>
//                                             <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
//                                             <TableCell>
//                                                 <Badge variant="outline">
//                                                     {student.status || "active"}
//                                                 </Badge>
//                                             </TableCell>
//                                             <TableCell onClick={(e) => e.stopPropagation()}>
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger asChild>
//                                                         <Button variant="ghost" size="icon">
//                                                             <MoreHorizontal className="h-4 w-4" />
//                                                         </Button>
//                                                     </DropdownMenuTrigger>
//                                                     <DropdownMenuContent align="end">
//                                                         <DropdownMenuItem>View Details</DropdownMenuItem>
//                                                         <DropdownMenuItem>Edit Student</DropdownMenuItem>
//                                                         <DropdownMenuItem className="text-red-600">
//                                                             Delete Student
//                                                         </DropdownMenuItem>
//                                                     </DropdownMenuContent>
//                                                 </DropdownMenu>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">
//                         <p className="text-sm text-gray-500">
//                             Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
//                         </p>
//                         <div className="flex items-center space-x-2">
//                             <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                             >
//                                 <ChevronLeft className="h-4 w-4" />
//                             </Button>
//                             {Array.from({ length: totalPages }, (_, i) => i + 1)
//                                 .filter(page =>
//                                     page === 1 ||
//                                     page === totalPages ||
//                                     (page >= currentPage - 1 && page <= currentPage + 1)
//                                 )
//                                 .map((page, index, array) => (
//                                     <React.Fragment key={page}>
//                                         {index > 0 && array[index - 1] !== page - 1 && (
//                                             <span className="px-2">...</span>
//                                         )}
//                                         <Button
//                                             variant={currentPage === page ? "default" : "outline"}
//                                             size="sm"
//                                             onClick={() => handlePageChange(page)}
//                                         >
//                                             {page}
//                                         </Button>
//                                     </React.Fragment>
//                                 ))
//                             }
//                             <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                             >
//                                 <ChevronRight className="h-4 w-4" />
//                             </Button>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
