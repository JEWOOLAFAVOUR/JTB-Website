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
