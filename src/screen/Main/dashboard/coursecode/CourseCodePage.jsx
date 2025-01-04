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
import { Trash2, Edit, PlusCircle, Search, BookOpen, GraduationCap } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { fetchAllCourses, createCourse, updateCourse } from '../../../../api/quiz';
import { sendToast } from '../../../../components/utilis';
import CourseForm from '../../../../components/template/CourseForm';

export default function CoursePage() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const { data } = await fetchAllCourses();
            if (data?.success) {
                setCourses(data.data);
            } else {
                sendToast('error', data?.message || 'Failed to fetch courses');
            }
        } catch (error) {
            sendToast('error', 'An error occurred while fetching courses');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
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

    const filteredCourses = courses.filter(course =>
        course?.course_code?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course?.course_code?.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNavigate = (courseId) => {
        navigate(`/admin/course/details/${courseId}`);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <CardTitle className="text-sm font-medium">Active Levels</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Set(courses.flatMap(course => course.course_code?.level || [])).size}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Courses</CardTitle>
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
                            <CourseForm onSubmit={handleCreateCourse} />
                        </DialogContent>
                    </Dialog>
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
                    {isLoading ? (
                        <div className="text-center py-4">Loading courses...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Course Name</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>University</TableHead>
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
                                        <TableCell>{course.course_code?.code}</TableCell>
                                        <TableCell>{course.course_code?.name}</TableCell>
                                        <TableCell>
                                            {course.course_code?.level.map((level, index) => (
                                                <Badge key={index} variant="secondary" className="mr-1">
                                                    {level}
                                                </Badge>
                                            ))}
                                        </TableCell>
                                        <TableCell className="capitalize">{course.semester}</TableCell>
                                        <TableCell>{course.university?.name}</TableCell>
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
                    )}
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
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}















// import React, { useEffect, useState } from 'react';
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Trash2,
//     Edit,
//     PlusCircle,
//     Search,
//     BookOpen,
//     GraduationCap
// } from 'lucide-react';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import { createCourseCode, getCourseCode } from '../../../../api/auth';
// import { sendToast } from '../../../../components/utilis';

// const CourseCodePage = () => {
//     // State management
//     const [courseCodes, setCourseCodes] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         code: '',
//         semester: 'first',
//         level: []
//     });
//     const [editingId, setEditingId] = useState(null);

//     const levels = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level"];

//     // Fetch course codes
//     const fetchCourseCodes = async () => {
//         try {
//             // API call would go here
//             const { data } = await getCourseCode();
//             if (data?.success) {
//                 setCourseCodes(data?.data);
//             } else {
//                 sendToast('error', data?.message)
//             }
//         } catch (error) {
//             console.error('Error fetching course codes:', error);
//         }
//     };

//     const handleCreateCourseCode = async () => {
//         try {
//             // Validation
//             if (!formData.name) throw new Error("Add a Course Name!");
//             if (!formData.code) throw new Error("Add a Course Code!");
//             if (!formData.level || formData.level.length === 0) throw new Error("Add a Level!");


//             const { data } = await createCourseCode(formData);
//             if (data?.success) {
//                 setCourseCodes(data?.data);
//             } else {
//                 sendToast('error', data?.message);
//             }

//             setIsAddDialogOpen(false);
//             setFormData({ name: '', code: '', semester: 'first', level: [] });
//             fetchCourseCodes();
//         } catch (error) {
//             console.error('Error creating course code:', error);
//             // Handle error display
//         }
//     };

//     const handleEditCourseCode = async () => {
//         try {
//             // Validation
//             if (!formData.name) throw new Error("Add a Course Name!");
//             if (!formData.code) throw new Error("Add a Course Code!");
//             if (!formData.level || formData.level.length === 0) throw new Error("Add a Level!");

//             // API call would go here
//             // const response = await fetch(`/api/course-codes/${editingId}`, {
//             //     method: 'PUT',
//             //     headers: { 'Content-Type': 'application/json' },
//             //     body: JSON.stringify(formData)
//             // });
//             // const data = await response.json();

//             setIsEditDialogOpen(false);
//             setFormData({ name: '', code: '', semester: 'first', level: [] });
//             setEditingId(null);
//             fetchCourseCodes();
//         } catch (error) {
//             console.error('Error updating course code:', error);
//             // Handle error display
//         }
//     };

//     const handleDeleteCourseCode = async (id) => {
//         try {
//             // API call would go here
//             // await fetch(`/api/course-codes/${id}`, { method: 'DELETE' });
//             fetchCourseCodes();
//         } catch (error) {
//             console.error('Error deleting course code:', error);
//             // Handle error display
//         }
//     };

//     const filteredCourseCodes = courseCodes.filter(course =>
//         course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.code.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     useEffect(() => {
//         fetchCourseCodes();
//     }, []);

//     const CourseCodeForm = ({ onSubmit, initialData = formData }) => (
//         <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">Course Name</Label>
//                 <Input
//                     id="name"
//                     value={initialData.name}
//                     onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                     className="col-span-3"
//                     placeholder="Introduction to Biology"
//                 />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="code" className="text-right">Course Code</Label>
//                 <Input
//                     id="code"
//                     value={initialData.code}
//                     onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
//                     className="col-span-3"
//                     placeholder="BIO 101"
//                 />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="semester" className="text-right">Semester</Label>
//                 <Select
//                     value={initialData.semester}
//                     onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}
//                 >
//                     <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select semester" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="first">First</SelectItem>
//                         <SelectItem value="second">Second</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Level</Label>
//                 <div className="col-span-3 flex flex-wrap gap-2">
//                     {levels.map((level) => (
//                         <Button
//                             key={level}
//                             variant={initialData.level.includes(level) ? "default" : "outline"}
//                             size="sm"
//                             onClick={() => {
//                                 setFormData(prev => ({
//                                     ...prev,
//                                     level: prev.level.includes(level)
//                                         ? prev.level.filter(l => l !== level)
//                                         : [...prev.level, level]
//                                 }));
//                             }}
//                         >
//                             {level}
//                         </Button>
//                     ))}
//                 </div>
//             </div>
//             <div className="flex justify-end">
//                 <Button onClick={onSubmit}>Save Course Code</Button>
//             </div>
//         </div>
//     );

//     return (
//         <div className="p-6 space-y-6">
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Total Course Codes</CardTitle>
//                         <BookOpen className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{courseCodes.length}</div>
//                     </CardContent>
//                 </Card>
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Active Levels</CardTitle>
//                         <GraduationCap className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">
//                             {new Set(courseCodes.flatMap(course => course.level)).size}
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* Main Content Card */}
//             <Card>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle>Course Codes</CardTitle>
//                     <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//                         <DialogTrigger asChild>
//                             <Button>
//                                 <PlusCircle className="mr-2 h-4 w-4" /> Add Course Code
//                             </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                             <DialogHeader>
//                                 <DialogTitle>Add New Course Code</DialogTitle>
//                             </DialogHeader>
//                             <CourseCodeForm onSubmit={handleCreateCourseCode} />
//                         </DialogContent>
//                     </Dialog>
//                 </CardHeader>

//                 <CardContent>
//                     {/* Search */}
//                     <div className="flex items-center py-4">
//                         <div className="relative flex-1 max-w-sm">
//                             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                             <Input
//                                 placeholder="Search course codes..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="pl-8"
//                             />
//                         </div>
//                     </div>

//                     {/* Table */}
//                     <div className="rounded-md border">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Course Code</TableHead>
//                                     <TableHead>Course Name</TableHead>
//                                     <TableHead>Semester</TableHead>
//                                     <TableHead>Levels</TableHead>
//                                     <TableHead className="text-right">Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {filteredCourseCodes.map((course) => (
//                                     <TableRow key={course._id}>
//                                         <TableCell className="font-medium">{course.code}</TableCell>
//                                         <TableCell>{course.name}</TableCell>
//                                         <TableCell className="capitalize">{course.semester}</TableCell>
//                                         <TableCell>
//                                             <div className="flex flex-wrap gap-1">
//                                                 {course.level.map((level) => (
//                                                     <Badge key={level} variant="secondary">
//                                                         {level}
//                                                     </Badge>
//                                                 ))}
//                                             </div>
//                                         </TableCell>
//                                         <TableCell className="text-right">
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger asChild>
//                                                     <Button variant="ghost" size="icon">
//                                                         <Edit className="h-4 w-4" />
//                                                     </Button>
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent>
//                                                     <DropdownMenuItem onClick={() => {
//                                                         setFormData(course);
//                                                         setEditingId(course._id);
//                                                         setIsEditDialogOpen(true);
//                                                     }}>
//                                                         <Edit className="mr-2 h-4 w-4" /> Edit
//                                                     </DropdownMenuItem>
//                                                     <DropdownMenuItem
//                                                         className="text-red-600"
//                                                         onClick={() => handleDeleteCourseCode(course._id)}
//                                                     >
//                                                         <Trash2 className="mr-2 h-4 w-4" /> Delete
//                                                     </DropdownMenuItem>
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Edit Dialog */}
//             <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Edit Course Code</DialogTitle>
//                     </DialogHeader>
//                     <CourseCodeForm onSubmit={handleEditCourseCode} initialData={formData} />
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default CourseCodePage;