import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Clock, Users, BookOpen, ArrowLeft } from 'lucide-react';
import { createLesson, getCourseLessons, updateLesson } from '../../../../api/quiz';
import { sendToast } from '../../../../components/utilis';

export default function CourseDetail() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
    const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [newLesson, setNewLesson] = useState({
        name: '',
        description: '',
        courseId: courseId,
    });

    // Fetch lessons
    const fetchLessons = async () => {
        try {
            const { data } = await getCourseLessons(courseId);
            if (data?.success) {
                setLessons(data.data);
            }
        } catch (error) {
            sendToast('error', 'Failed to fetch lessons');
        }
    };

    useEffect(() => {
        fetchLessons();
    }, [courseId]);

    // Handle lesson creation
    const handleCreateLesson = async () => {
        try {
            const { data } = await createLesson(newLesson);
            if (data?.success) {
                sendToast('success', 'Lesson created successfully');
                setIsAddLessonOpen(false);
                fetchLessons();
                setNewLesson({ name: '', description: '', courseId });
            }
        } catch (error) {
            sendToast('error', 'Failed to create lesson');
        }
    };

    // Handle lesson update
    const handleUpdateLesson = async () => {
        try {
            const { data } = await updateLesson(selectedLesson._id, selectedLesson);
            if (data?.success) {
                sendToast('success', 'Lesson updated successfully');
                setIsEditLessonOpen(false);
                fetchLessons();
            }
        } catch (error) {
            sendToast('error', 'Failed to update lesson');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => navigate('/admin/course')}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Past Questions
            </Button>
            <Tabs defaultValue="lessons" className="w-full">
                <TabsList>
                    <TabsTrigger value="lessons">Lessons</TabsTrigger>
                    <TabsTrigger value="activity">User Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="lessons">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Course Lessons</CardTitle>
                            <Dialog open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
                                <DialogTrigger asChild>
                                    <Button>Add New Lesson</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Lesson</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label>Lesson Name</Label>
                                            <Input
                                                value={newLesson.name}
                                                onChange={(e) => setNewLesson(prev => ({
                                                    ...prev,
                                                    name: e.target.value
                                                }))}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={newLesson.description}
                                                onChange={(e) => setNewLesson(prev => ({
                                                    ...prev,
                                                    description: e.target.value
                                                }))}
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleCreateLesson}>Create Lesson</Button>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Questions</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lessons.map((lesson) => (
                                        <TableRow key={lesson._id}>
                                            <TableCell className="font-medium">{lesson.name}</TableCell>
                                            <TableCell>{lesson.description}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {lesson.questionsLength} Questions
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Clock className="mr-2 h-4 w-4" />
                                                    {lesson.duration / 60} mins
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => {
                                                            setSelectedLesson(lesson);
                                                            setIsEditLessonOpen(true);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Users className="mr-2 h-4 w-4" />
                                                <span>Total Users</span>
                                            </div>
                                            <span className="text-2xl font-bold">123</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                <span>Completed Lessons</span>
                                            </div>
                                            <span className="text-2xl font-bold">45</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Clock className="mr-2 h-4 w-4" />
                                                <span>Avg. Completion Time</span>
                                            </div>
                                            <span className="text-2xl font-bold">25m</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Lesson</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Completion Time</TableHead>
                                        <TableHead>Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Sample activity data - replace with real data */}
                                    <TableRow>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>Introduction</TableCell>
                                        <TableCell>
                                            <Badge>Completed</Badge>
                                        </TableCell>
                                        <TableCell>23 mins</TableCell>
                                        <TableCell>85%</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Edit Lesson Dialog */}
            <Dialog open={isEditLessonOpen} onOpenChange={setIsEditLessonOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Lesson</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Lesson Name</Label>
                            <Input
                                value={selectedLesson?.name || ''}
                                onChange={(e) => setSelectedLesson(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <Textarea
                                value={selectedLesson?.description || ''}
                                onChange={(e) => setSelectedLesson(prev => ({
                                    ...prev,
                                    description: e.target.value
                                }))}
                            />
                        </div>
                    </div>
                    <Button onClick={handleUpdateLesson}>Update Lesson</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}