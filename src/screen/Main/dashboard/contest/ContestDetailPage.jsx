import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Users,
    BookOpen,
    Trophy,
    Search,
    Plus,
    Pencil,
    Trash2,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendToast } from '../../../../components/utilis';

// Quill modules configuration
const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['formula'],
    ],
};

// Form Schema
const questionSchema = z.object({
    question: z.string().min(1, "Question is required"),
    optionA: z.string().min(1, "Option A is required"),
    optionB: z.string().min(1, "Option B is required"),
    optionC: z.string().min(1, "Option C is required"),
    optionD: z.string().min(1, "Option D is required"),
    correctOption: z.string().min(1, "Correct option is required"),
    explanation: z.string().min(1, "Explanation is required"),
});

// Question Form Component
function QuestionForm({ onSubmit, initialValues = null, mode = 'create' }) {
    const form = useForm({
        resolver: zodResolver(questionSchema),
        defaultValues: initialValues || {
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctOption: '',
            explanation: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="optionA"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Option A</FormLabel>
                                <FormControl>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="optionB"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Option B</FormLabel>
                                <FormControl>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="optionC"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Option C</FormLabel>
                                <FormControl>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="optionD"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Option D</FormLabel>
                                <FormControl>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="correctOption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correct Option</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select correct option" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="A">Option A</SelectItem>
                                    <SelectItem value="B">Option B</SelectItem>
                                    <SelectItem value="C">Option C</SelectItem>
                                    <SelectItem value="D">Option D</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Explanation</FormLabel>
                            <FormControl>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    {mode === 'create' ? 'Add Question' : 'Update Question'}
                </Button>
            </form>
        </Form>
    );
}

function ContestDetailPage() {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    // Mock data for demonstration
    const contestStats = {
        totalQuestions: questions.length,
        totalParticipants: 156,
        averageScore: 75.5,
    };

    const handleCreateQuestion = (data) => {
        const newQuestion = {
            id: Math.random().toString(36).substr(2, 9),
            question: data.question,
            options: [data.optionA, data.optionB, data.optionC, data.optionD],
            correctOption: ['A', 'B', 'C', 'D'].indexOf(data.correctOption),
            explanation: data.explanation,
        };

        setQuestions([...questions, newQuestion]);
        setIsDialogOpen(false);
        sendToast('success', 'Question added successfully');
    };

    const handleEditQuestion = (data) => {
        if (!selectedQuestion) return;

        const updatedQuestions = questions.map(question =>
            question.id === selectedQuestion.id
                ? {
                    ...question,
                    question: data.question,
                    options: [data.optionA, data.optionB, data.optionC, data.optionD],
                    correctOption: ['A', 'B', 'C', 'D'].indexOf(data.correctOption),
                    explanation: data.explanation,
                }
                : question
        );

        setQuestions(updatedQuestions);
        setSelectedQuestion(null);
        setIsDialogOpen(false);
        sendToast('success', 'Question updated successfully');
    };

    const handleDeleteQuestion = (questionId) => {
        setQuestions(questions.filter(question => question.id !== questionId));
        sendToast('success', 'Question deleted successfully');
    };

    const filteredQuestions = questions.filter(question =>
        question.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Total Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{contestStats.totalQuestions}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                            <Users className="w-4 h-4 mr-2" />
                            Participants
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{contestStats.totalParticipants}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                            <Trophy className="w-4 h-4 mr-2" />
                            Average Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{contestStats.averageScore}%</p>
                    </CardContent>
                </Card>
            </div>

            {/* Questions Management */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">Questions</CardTitle>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search questions..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Question
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                    <DialogTitle>
                                        {selectedQuestion ? 'Edit Question' : 'Add New Question'}
                                    </DialogTitle>
                                </DialogHeader>
                                <QuestionForm
                                    onSubmit={selectedQuestion ? handleEditQuestion : handleCreateQuestion}
                                    initialValues={selectedQuestion ? {
                                        question: selectedQuestion.question,
                                        optionA: selectedQuestion.options[0],
                                        optionB: selectedQuestion.options[1],
                                        optionC: selectedQuestion.options[2],
                                        optionD: selectedQuestion.options[3],
                                        correctOption: ['A', 'B', 'C', 'D'][selectedQuestion.correctOption],
                                        explanation: selectedQuestion.explanation,
                                    } : undefined}
                                    mode={selectedQuestion ? 'edit' : 'create'}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Question</TableHead>
                                <TableHead>Options</TableHead>
                                <TableHead>Correct Option</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredQuestions.map((question) => (
                                <TableRow key={question.id}>
                                    <TableCell className="max-w-md">
                                        <div dangerouslySetInnerHTML={{ __html: question.question }} />
                                    </TableCell>
                                    <TableCell>
                                        <ol className="list-[upper-alpha] ml-4">
                                            {question.options.map((option, index) => (
                                                <li key={index}>
                                                    <div dangerouslySetInnerHTML={{ __html: option }} />
                                                </li>
                                            ))}
                                        </ol>
                                    </TableCell>
                                    <TableCell>
                                        Option {['A', 'B', 'C', 'D'][question.correctOption]}
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedQuestion(question);
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteQuestion(question.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete
                                        </Button>
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

export default ContestDetailPage;