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
import { Label } from "@/components/ui/label";
import {
    Trash2,
    Edit,
    Copy,
    PlusCircle,
    Search,
    Users,
    DollarSign
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { createChannelCourse, generateChannelLink, getChannelCourses } from '../../../../api/auth';
import { sendToast } from '../../../../components/utilis';
import { fetchAllCourses } from '../../../../api/quiz';

export default function CoursePage() {
    const navigate = useNavigate();

    // State management
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newCourse, setNewCourse] = useState({
        code: '',
        name: '',
        level: "",

    });

    // Generate channel name
    const [channelName, setChannelName] = useState('');

    const generateChannelName = () => {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        setChannelName(channelLink)
    };

    // Course management functions
    const addCourse = async () => {
        const body = {
            id: String(courses.length + 1),
            ...newCourse,
        };

        console.log({ body });

        const { data, status } = await createChannelCourse(body)

        if (data?.success === true) {
            sendToast('success', data?.message)
        } else {
            sendToast('error', data?.message)
        }

        // setCourses([...courses, newCourseEntry]);
        // // Reset form
        // setNewCourse({ code: '', name: '', price: '' });
        // setChannelName('');
    };

    const deleteCourse = (id) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    // Selection handling
    const toggleCourseSelection = (id) => {
        setSelectedCourses(prev =>
            prev.includes(id)
                ? prev.filter(courseId => courseId !== id)
                : [...prev, id]
        );
    };

    // Filtered courses based on search
    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNavigate = (courseId) => {
        navigate(`/admin/course/details/${courseId}`);
    };

    const fetchCourses = async () => {
        const { data, status } = await fetchAllCourses()

        if (data?.success === true) {
            setCourses(data?.data)
        } else {
            sendToast('error', data?.message)
        }

        console.log('response feom courses', data)
    }


    useEffect(() => {
        fetchCourses();
    }, [])

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-xl sm:text-2xl">Course Management</CardTitle>

                    {/* Add Course Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mt-4 sm:mt-0">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Course
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Course</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="code" className="text-right">
                                        Course Code
                                    </Label>
                                    <Input
                                        id="code"
                                        value={newCourse.code}
                                        onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Course Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newCourse.name}
                                        onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">
                                        Price
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={newCourse.price}
                                        onChange={(e) => setNewCourse(prev => ({ ...prev, price: e.target.value }))}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <Button onClick={addCourse}>Save Course</Button>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent>
                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row items-center py-4 sm:space-x-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 max-w-sm"
                            />
                        </div>
                        <div className="flex space-x-2 mt-4 sm:mt-0">
                            <Badge variant="secondary" className="flex items-center">
                                <Users className="mr-1 h-4 w-4" /> {filteredCourses.reduce((sum, course) => sum + course.paidUsers, 0)} Paid Users
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                                {/* <DollarSign className="mr-1 h-4 w-4" /> ₦{filteredCourses.reduce((sum, course) => sum + course.totalRevenue, 0).toFixed(2) } Total Revenue */}
                                <DollarSign className="mr-1 h-4 w-4" /> ₦{0} Total Revenue
                            </Badge>
                        </div>
                        {selectedCourses.length > 0 && (
                            <Button variant="destructive" size="sm" className="mt-4 sm:mt-0">
                                Delete Selected
                            </Button>
                        )}
                    </div>

                    {/* Courses Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[20px]">
                                    <Checkbox
                                        checked={selectedCourses.length === courses.length}
                                        onCheckedChange={() =>
                                            setSelectedCourses(
                                                selectedCourses.length === courses.length
                                                    ? []
                                                    : courses.map(course => course.id)
                                            )
                                        }
                                    />
                                </TableHead>
                                <TableHead>Course Code</TableHead>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Questions</TableHead>
                                <TableHead>Lessons</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourses.map((course) => (
                                <TableRow
                                    className='cursor-pointer'
                                    onClick={() => handleNavigate(course._id)}
                                    key={course.id}
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedCourses.includes(course.id)}
                                            onCheckedChange={() => toggleCourseSelection(course.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{course?.code}</TableCell>
                                    <TableCell>{course?.name}</TableCell>
                                    <TableCell>₦{course?.level[0]}</TableCell>
                                    <TableCell>20</TableCell>
                                    <TableCell>{course?.lessons?.length || 0}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => deleteCourse(course.id)}>
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
        </div>
    );
};

