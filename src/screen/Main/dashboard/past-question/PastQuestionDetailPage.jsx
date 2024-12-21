import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Book, School } from 'lucide-react';
import { getAllPastQuestions } from '../../../../api/quiz';
import { sendToast } from '../../../../components/utilis';

export default function PastQuestionDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pastQuestion, setPastQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPastQuestion = async () => {
            try {
                const { data } = await getAllPastQuestions();
                if (data?.success) {
                    const question = data.pastQuestions.find(q => q._id === id);
                    if (question) {
                        setPastQuestion(question);
                    } else {
                        sendToast('error', 'Past question not found');
                        navigate('/past-question');
                    }
                }
            } catch (error) {
                sendToast('error', 'Failed to fetch past question details');
            } finally {
                setLoading(false);
            }
        };

        fetchPastQuestion();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!pastQuestion) {
        return null;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => navigate('/admin/past-question')}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Past Questions
            </Button>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="text-2xl mb-2">{pastQuestion.name}</CardTitle>
                            <CardDescription className="text-lg">
                                Course Code: {pastQuestion.code}
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                            <Badge variant="outline" className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                Year: {pastQuestion.year}
                            </Badge>
                            <Badge variant="outline" className="flex items-center">
                                <Book className="mr-1 h-4 w-4" />
                                Semester: {pastQuestion.semester}
                            </Badge>
                            <Badge variant="outline" className="flex items-center">
                                <School className="mr-1 h-4 w-4" />
                                University ID: {pastQuestion.university}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Past Question Images</h3>
                            {pastQuestion.images && pastQuestion.images.length > 0 ? (
                                <Carousel className="w-full max-w-3xl mx-auto">
                                    <CarouselContent>
                                        {pastQuestion.images.map((image, index) => (
                                            <CarouselItem key={image._id || index}>
                                                <div className="p-1">
                                                    <div className="flex aspect-square items-center justify-center p-6">
                                                        <img
                                                            src={image.url}
                                                            alt={`Past Question ${index + 1}`}
                                                            className="max-w-full max-h-full object-contain rounded-lg"
                                                        />
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            ) : (
                                <p className="text-center text-muted-foreground">No images available</p>
                            )}
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <p className="text-sm text-muted-foreground">Created At</p>
                                        <p>{new Date(pastQuestion.createdAt).toLocaleDateString()}</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <p className="text-sm text-muted-foreground">Last Updated</p>
                                        <p>{new Date(pastQuestion.updatedAt).toLocaleDateString()}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}