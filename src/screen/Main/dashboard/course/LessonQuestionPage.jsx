import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Edit, FileText, CheckCircle2, HelpCircle, X, ArrowLeft, Search } from 'lucide-react';
import useQuestionStore from '../../../../zustand/useQuestionStore';
import { getLessonsQuestions, addQuestionToLesson, editLessonsQuestions, deleteLessonsQuestions } from '../../../../api/quiz';
import { sendToast } from '../../../../components/utilis';
import QuestionForm from '../../../../components/template/QuestionForm';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['formula'],
    ],
};

export default function LessonQuestionPage() {
    const navigate = useNavigate();
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedQuestionForDelete, setSelectedQuestionForDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    useEffect(() => {
        const filtered = questions.filter(question =>
            question.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuestions(filtered);
    }, [searchTerm, questions]);

    const fetchQuestions = async () => {
        try {
            const { data } = await getLessonsQuestions(lessonId);
            if (data?.success) {
                setLesson(data.data);
                setQuestions(data.data.questions);
                setFilteredQuestions(data.data.questions);
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

    const handleEditQuestion = async (editedQuestion) => {
        setSelectedQuestion(editedQuestion);
    };

    const handleSaveEditedQuestion = async () => {
        try {
            const { data } = await editLessonsQuestions({
                lessonId,
                questionId: selectedQuestion._id,
                updatedQuestion: selectedQuestion
            });
            if (data?.success) {
                sendToast('success', 'Question updated successfully');
                setIsEditModalOpen(false);
                fetchQuestions();
            } else {
                sendToast('error', data?.message || data?.error);
            }
        } catch (error) {
            sendToast('error', 'Failed to update question');
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            const { data } = await deleteLessonsQuestions({ lessonId, questionId });
            if (data?.success) {
                sendToast('success', 'Question deleted successfully');
                fetchQuestions();
            } else {
                sendToast('error', data?.message || data?.error);
            }
        } catch (error) {
            sendToast('error', 'Failed to delete question');
        }
    };

    const scrollToQuestion = (index) => {
        const element = document.getElementById(`question-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="p-6 space-y-6">
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Past Questions
            </Button>

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

            {/* Search and Navigation */}
            <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search questions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full"
                    />
                </div>
                <div className="flex-shrink-0">
                    <select
                        onChange={(e) => scrollToQuestion(parseInt(e.target.value))}
                        className="border rounded p-2"
                    >
                        <option value="">Jump to question</option>
                        {filteredQuestions.map((_, index) => (
                            <option key={index} value={index}>Question {index + 1}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Questions */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Questions</CardTitle>
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Questions
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl" style={{ height: '80vh', overflowY: 'auto' }}>
                            <DialogHeader>
                                <DialogTitle>Add New Questions</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="max-h-[600px] pr-4">
                                {newQuestions.map((question, index) => (
                                    <QuestionForm
                                        key={index}
                                        question={question}
                                        index={index}
                                        onUpdate={(updatedQuestion) => {
                                            const updated = [...newQuestions];
                                            updated[index] = updatedQuestion;
                                            setNewQuestions(updated);
                                        }}
                                        onRemove={() => handleRemoveQuestion(index)}
                                    />
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
                    <div className="space-y-4">
                        {filteredQuestions.map((question, index) => (
                            <Card key={question._id} id={`question-${index}`} className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-primary">Question {index + 1}</h3>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedQuestion(question);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            <Edit className="h-4 w-4 mr-2" /> Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setSelectedQuestionForDelete(question)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                        </Button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="bg-secondary/10 p-3 rounded-md" dangerouslySetInnerHTML={{ __html: question.question }} />
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-md font-medium mb-2 text-primary">Options:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {question.options.map((option) => (
                                            <div key={option._id} className="bg-secondary/5 p-2 rounded-md">
                                                <span className="font-bold mr-2">{String.fromCharCode(64 + option.index)}.</span>
                                                <span dangerouslySetInnerHTML={{ __html: option.text }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-md font-medium mb-2 text-primary">Correct Answer:</h4>
                                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-2 rounded-md inline-block">
                                        {String.fromCharCode(64 + question.correctAnswer)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-md font-medium mb-2 text-primary">Explanation:</h4>
                                    <div className="bg-secondary/10 p-3 rounded-md" dangerouslySetInnerHTML={{ __html: question.correction }} />
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Edit Question Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-4xl" style={{ height: '80vh', overflowY: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>Edit Question</DialogTitle>
                    </DialogHeader>
                    {selectedQuestion && (
                        <QuestionForm
                            question={selectedQuestion}
                            onUpdate={(updatedQuestion) => setSelectedQuestion(updatedQuestion)}
                            onCancel={() => setIsEditModalOpen(false)}
                        />
                    )}
                    <DialogFooter>
                        <Button onClick={handleSaveEditedQuestion}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!selectedQuestionForDelete} onOpenChange={() => setSelectedQuestionForDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this question? This action cannot be undone.</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedQuestionForDelete(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => {
                            handleDeleteQuestion(selectedQuestionForDelete._id);
                            setSelectedQuestionForDelete(null);
                        }}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
