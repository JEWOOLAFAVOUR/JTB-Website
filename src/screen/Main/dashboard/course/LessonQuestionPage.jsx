import React, { useState, useEffect } from 'react';
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
    PlusCircle,
    Trash2,
    Edit,
    FileText,
    CheckCircle2,
    HelpCircle,
    X
} from 'lucide-react';
// import useQuestionStore from './question-store';
import useQuestionStore from '../../../../zustand/useQuestionStore';
import { getLessonsQuestions, addQuestionToLesson, editLessonsQuestions, deleteLessonsQuestions } from '../../../../api/quiz';
import { sendToast } from '../../../../components/utilis';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['formula'],
    ],
};

export default function LessonQuestionPage() {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const { getDraftQuestions, setDraftQuestions, clearDraftQuestions } = useQuestionStore();

    const [newQuestions, setNewQuestions] = useState(() => getDraftQuestions(lessonId) || [{
        question: '',
        options: [
            { text: '', index: 1 },
            { text: '', index: 2 },
            { text: '', index: 3 },
            { text: '', index: 4 },
        ],
        correctAnswer: '',
        correction: '',
    }]);

    useEffect(() => {
        fetchQuestions();
    }, [lessonId]);

    useEffect(() => {
        setDraftQuestions(lessonId, newQuestions);
    }, [newQuestions, lessonId]);

    const fetchQuestions = async () => {
        try {
            const { data } = await getLessonsQuestions(lessonId);
            if (data?.success) {
                setLesson(data.data);
                setQuestions(data.data.questions);
            }
        } catch (error) {
            sendToast('error', 'Failed to fetch questions');
        }
    };

    const handleAddQuestion = () => {
        setNewQuestions([...newQuestions, {
            question: '',
            options: [
                { text: '', index: 1 },
                { text: '', index: 2 },
                { text: '', index: 3 },
                { text: '', index: 4 },
            ],
            correctAnswer: '',
            correction: '',
        }]);
    };

    const handleRemoveQuestion = (index) => {
        setNewQuestions(newQuestions.filter((_, i) => i !== index));
    };

    const handleSubmitQuestions = async () => {
        try {
            const body = { lessonId, questions: newQuestions };
            const { data } = await addQuestionToLesson(body);
            console.log('d', data)
            if (data?.success === true) {
                sendToast('success', 'Questions added successfully');
                setIsAddModalOpen(false);
                clearDraftQuestions(lessonId);
                fetchQuestions();
                setNewQuestions([{
                    question: '',
                    options: [
                        { text: '', index: 1 },
                        { text: '', index: 2 },
                        { text: '', index: 3 },
                        { text: '', index: 4 },
                    ],
                    correctAnswer: '',
                    correction: '',
                }]);
            } else {
                sendToast('error', data?.message || data?.error)
            }
        } catch (error) {
            sendToast('error', 'Failed to add questions');
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-purple-500" />
                                <span className="font-medium">Total Questions</span>
                            </div>
                            <span className="text-2xl font-bold">{questions.length}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                <span className="font-medium">Course</span>
                            </div>
                            <span className="font-medium">{lesson?.course?.code}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <HelpCircle className="h-5 w-5 text-green-500" />
                                <span className="font-medium">Lesson</span>
                            </div>
                            <span className="font-medium truncate max-w-[150px]">{lesson?.name}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Questions Table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Questions</CardTitle>
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Questions
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Add New Questions</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="max-h-[600px] pr-4">
                                {newQuestions.map((question, qIndex) => (
                                    <div key={qIndex} className="mb-8 p-4 border rounded-lg relative">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-2"
                                            onClick={() => handleRemoveQuestion(qIndex)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>

                                        <div className="mb-4">
                                            <label className="block mb-2 font-medium">Question {qIndex + 1}</label>
                                            <ReactQuill
                                                value={question.question}
                                                onChange={(value) => {
                                                    const updated = [...newQuestions];
                                                    updated[qIndex].question = value;
                                                    setNewQuestions(updated);
                                                }}
                                                modules={modules}
                                            />
                                        </div>

                                        {question.options.map((option, oIndex) => (
                                            <div key={oIndex} className="mb-4">
                                                <label className="block mb-2 font-medium">
                                                    Option {option.index}
                                                    <input
                                                        type="radio"
                                                        name={`correct-${qIndex}`}
                                                        className="ml-2"
                                                        checked={question.correctAnswer === option.index}
                                                        onChange={() => {
                                                            const updated = [...newQuestions];
                                                            updated[qIndex].correctAnswer = option.index;
                                                            setNewQuestions(updated);
                                                        }}
                                                    />
                                                </label>
                                                <ReactQuill
                                                    value={option.text}
                                                    onChange={(value) => {
                                                        const updated = [...newQuestions];
                                                        updated[qIndex].options[oIndex].text = value;
                                                        setNewQuestions(updated);
                                                    }}
                                                    modules={modules}
                                                />
                                            </div>
                                        ))}

                                        <div className="mb-4">
                                            <label className="block mb-2 font-medium">Explanation</label>
                                            <ReactQuill
                                                value={question.correction}
                                                onChange={(value) => {
                                                    const updated = [...newQuestions];
                                                    updated[qIndex].correction = value;
                                                    setNewQuestions(updated);
                                                }}
                                                modules={modules}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                            <div className="flex justify-between mt-4">
                                <Button variant="outline" onClick={handleAddQuestion}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Another Question
                                </Button>
                                <Button onClick={handleSubmitQuestions}>Save Questions</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Question</TableHead>
                                <TableHead>Options</TableHead>
                                <TableHead>Correct Answer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {questions.map((question) => (
                                <TableRow key={question._id}>
                                    <TableCell>
                                        <div dangerouslySetInnerHTML={{ __html: question.question }} />
                                    </TableCell>
                                    <TableCell>
                                        {question.options.map((option) => (
                                            <Badge
                                                key={option._id}
                                                variant={option.index === question.correctAnswer ? "default" : "secondary"}
                                                className="mr-2 mb-2"
                                            >
                                                {option.index}. <span dangerouslySetInnerHTML={{ __html: option.text }} />
                                            </Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell>{question.correctAnswer}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedQuestion(question);
                                                    setIsEditModalOpen(true);
                                                }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={async () => {
                                                    if (window.confirm('Are you sure you want to delete this question?')) {
                                                        try {
                                                            await deleteLessonsQuestions({ questionId: question._id });
                                                            fetchQuestions();
                                                        } catch (error) {
                                                            sendToast('error', 'Failed to delete question');
                                                        }
                                                    }
                                                }}
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