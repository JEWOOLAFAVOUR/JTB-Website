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
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Trash2,
    Search,
    PlusCircle,
    ImagePlus,
    X,
    Pencil,
    Loader2
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { getAllPastQuestions, createPastQuestion, updatePastQuestion, deletePastQuestion } from '../../../../api/quiz';
import { sendToast } from '../../../../components/utilis';
import useAuthStore from '../../../../zustand/useAuthStore';

export default function PastQuestionPage() {
    const navigate = useNavigate();
    const [pastQuestions, setPastQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [deletingImageIndex, setDeletingImageIndex] = useState(null);

    const { user } = useAuthStore.getState();
    let university = user?.university?._id;

    // Form states
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        year: '',
        semester: '',
        images: [],
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const handleImageRemove = (index) => {
        setDeletingImageIndex(index);
        // Simulate image deletion delay
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
            setDeletingImageIndex(null);
        }, 1000);
    };

    const resetForm = () => {
        setFormData({
            code: '',
            name: '',
            year: '',
            semester: '',
            images: [],
        });
    };

    const handleCreate = async () => {
        setIsLoading(true);
        try {
            const body = { ...formData, university };
            const { data } = await createPastQuestion(body);

            if (data?.success === true) {
                sendToast('success', data?.message);
                fetchPastQuestions();
                setIsCreateDialogOpen(false);
                resetForm();
            } else {
                sendToast('error', data?.message || 'Failed to create past question');
            }
        } catch (error) {
            sendToast('error', 'Failed to create past question');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (question, e) => {
        e.stopPropagation(); // Prevent row click navigation
        setFormData({
            code: question.code,
            name: question.name,
            year: question.year,
            semester: question.semester,
            images: question.images || [],
        });
        setSelectedQuestionId(question._id);
        setIsEditDialogOpen(true);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const { data } = await updatePastQuestion(selectedQuestionId, formData);
            if (data?.success === true) {
                sendToast('success', data?.message);
                fetchPastQuestions();
                setIsEditDialogOpen(false);
                resetForm();
            } else {
                sendToast('error', data?.message || 'Failed to update past question');
            }
        } catch (error) {
            sendToast('error', 'Failed to update past question');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (id, e) => {
        e.stopPropagation(); // Prevent row click navigation
        setSelectedQuestionId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const { data } = await deletePastQuestion(selectedQuestionId);
            if (data?.success === true) {
                sendToast('success', data?.message);
                fetchPastQuestions();
                setIsDeleteDialogOpen(false);
            } else {
                sendToast('error', data?.message || 'Failed to delete past question');
            }
        } catch (error) {
            sendToast('error', 'Failed to delete past question');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPastQuestions = async () => {
        try {
            const { data } = await getAllPastQuestions();
            if (data?.success) {
                setPastQuestions(data?.pastQuestions);
            }
        } catch (error) {
            sendToast('error', 'Failed to fetch past questions');
        }
    };

    useEffect(() => {
        fetchPastQuestions();
    }, []);

    const filteredQuestions = pastQuestions.filter(question =>
        question.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const QuestionForm = ({ onSubmit, submitText }) => (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                    onValueChange={(value) => handleInputChange('semester', value)}
                    value={formData.semester}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="first">First</SelectItem>
                        <SelectItem value="second">Second</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label>Images</Label>
                <div className="flex flex-wrap gap-2">
                    {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                            <div className={`h-20 w-20 border rounded-md flex items-center justify-center bg-gray-50 ${deletingImageIndex === index ? 'opacity-50' : ''}`}>
                                <img
                                    src={image.url || URL.createObjectURL(image)}
                                    alt={`Preview ${index}`}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6"
                                onClick={() => handleImageRemove(index)}
                                disabled={deletingImageIndex === index}
                            >
                                {deletingImageIndex === index ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <X className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    ))}
                    <label className="h-20 w-20 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <ImagePlus className="h-6 w-6 text-gray-400" />
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>
            <Button onClick={onSubmit} disabled={isLoading}>
                {isLoading ? 'Saving...' : submitText}
            </Button>
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-xl sm:text-2xl">Past Questions Management</CardTitle>

                    {/* Create Dialog */}
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-4 sm:mt-0">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Past Question
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add New Past Question</DialogTitle>
                            </DialogHeader>
                            <QuestionForm onSubmit={handleCreate} submitText="Save Past Question" />
                        </DialogContent>
                    </Dialog>

                    {/* Edit Dialog */}
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Edit Past Question</DialogTitle>
                            </DialogHeader>
                            <QuestionForm onSubmit={handleUpdate} submitText="Update Past Question" />
                        </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Past Question</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this past question? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                                    {isLoading ? 'Deleting...' : 'Delete'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center py-4 gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search past questions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 max-w-sm"
                            />
                        </div>
                        <Badge variant="secondary">
                            Total: {pastQuestions.length} Questions
                        </Badge>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Code</TableHead>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead>Images</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredQuestions.map((question) => (
                                <TableRow
                                    key={question._id}
                                    onClick={() => navigate(`/admin/past-question/details/${question._id}`)}
                                    className="cursor-pointer hover:bg-gray-50"
                                >
                                    <TableCell>{question.code}</TableCell>
                                    <TableCell>{question.name}</TableCell>
                                    <TableCell>{question.year}</TableCell>
                                    <TableCell className="capitalize">{question.semester}</TableCell>
                                    <TableCell>{question.images?.length || 0}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={(e) => handleEdit(question, e)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={(e) => handleDeleteClick(question._id, e)}
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
        </div>
    );
}
