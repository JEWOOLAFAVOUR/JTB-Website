import React, { useEffect, useState } from 'react';
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
import { Trash2, Edit, PlusCircle, Search, BookOpen, GraduationCap, Filter } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { fetchAllCourses, createCourse, updateCourse } from '../../../../api/quiz';
import { getCourseCode } from '../../../../api/auth';
import { sendToast } from '../../../../components/utilis';
import CourseForm from '../../../../components/template/CourseForm';

export default function CoursePage() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [courseCodes, setCourseCodes] = useState([]);
    const [semesterFilter, setSemesterFilter] = useState('first'); // Default to first semester

    const fetchCourses = async () => {
        try {
            const { data } = await fetchAllCourses();
            if (data?.success === true) {
                setCourses(data?.data);
            } else {
                sendToast('error', data?.message || 'Failed to fetch courses');
            }
        } catch (error) {
            sendToast('error', 'An error occurred while fetching courses');
        }
    };


    const fetchInitialCourseCodes = async () => {
        try {
            const { data } = await getCourseCode();
            if (data?.success) {
                setCourseCodes(data.data.slice(0, 3));
            } else {
                sendToast('error', data?.message || 'Failed to fetch course codes');
            }
        } catch (error) {
            sendToast('error', 'An error occurred while fetching course codes');
        }
    };

    useEffect(() => {
        fetchCourses();
        fetchInitialCourseCodes();
    }, []);

    const handleCreateCourse = async (courseData) => {
        try {
            const { data } = await createCourse(courseData);
            if (data?.success) {
                sendToast('success', 'Course created successfully');
                setIsAddDialogOpen(false);
                fetchCourses();
            } else {
                sendToast('error', data?.message || 'Failed to create course');
            }
        } catch (error) {
            sendToast('error', 'An error occurred while creating the course');
        }
    };

    const handleEditCourse = async (courseData) => {
        try {
            const { data } = await updateCourse(courseData._id, courseData);
            if (data?.success) {
                sendToast('success', 'Course updated successfully');
                setIsEditDialogOpen(false);
                fetchCourses();
            } else {
                sendToast('error', data?.message || 'Failed to update course');
            }
        } catch (error) {
            sendToast('error', 'An error occurred while updating the course');
        }
    };

    // Helper function to get semester from course
    const getCourseSemester = (course) => {
        return course.semester || course.course_code?.semester || 'unknown';
    };

    // Filter courses based on search term and semester
    const filteredCourses = courses.filter(course => {
        const matchesSearch = (
            (course?.course_code?.name || course?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course?.course_code?.code || course?.code || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        const courseSemester = getCourseSemester(course);
        const matchesSemester = semesterFilter === 'all' || courseSemester === semesterFilter;

        return matchesSearch && matchesSemester;
    });

    const handleNavigate = (courseId) => {
        navigate(`/admin/course/details/${courseId}`);
    };

    // Calculate totals for each semester
    const semesterCounts = courses.reduce((acc, course) => {
        const semester = getCourseSemester(course);
        acc[semester] = (acc[semester] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courses.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">First Semester</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{semesterCounts.first || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Second Semester</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{semesterCounts.second || 0}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Courses</CardTitle>
                    <div className="flex gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" />
                                    {semesterFilter === 'all' ? 'All Semesters' :
                                        semesterFilter === 'first' ? 'First Semester' : 'Second Semester'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setSemesterFilter('all')}>
                                    All Semesters
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSemesterFilter('first')}>
                                    First Semester
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSemesterFilter('second')}>
                                    Second Semester
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Course
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Course</DialogTitle>
                                </DialogHeader>
                                <CourseForm onSubmit={handleCreateCourse} courseCodes={courseCodes} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Search */}
                    <div className="flex items-center py-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    {/* Courses Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Code</TableHead>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead>Lessons</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourses.map((course) => (
                                <TableRow
                                    key={course._id}
                                    className="cursor-pointer"
                                    onClick={() => handleNavigate(course._id)}
                                >
                                    <TableCell>{course?.course_code?.code || course?.code}</TableCell>
                                    <TableCell>{course?.course_code?.name || course?.name}</TableCell>
                                    <TableCell>
                                        {(course.course_code?.level || course.level || []).map((level, index) => (
                                            <Badge key={index} variant="secondary" className="mr-1">
                                                {level}
                                            </Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {getCourseSemester(course)}
                                    </TableCell>
                                    <TableCell>{course.lessons?.length || 0}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingCourse(course);
                                                    setIsEditDialogOpen(true);
                                                }}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Implement delete functionality
                                                    }}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit Course Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                    </DialogHeader>
                    {editingCourse && (
                        <CourseForm
                            onSubmit={handleEditCourse}
                            initialData={editingCourse}
                            courseCodes={courseCodes}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}