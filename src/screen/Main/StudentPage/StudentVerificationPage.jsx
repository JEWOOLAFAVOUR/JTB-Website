import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
// import { toast } from "@/components/ui/use-toast";
import { toast, Toaster } from "sonner"; // Correct import for toast and Toaster



export default function StudentVerificationPage() {
    const [matricNumber, setMatricNumber] = useState('');
    const navigate = useNavigate();

    const handleVerification = async () => {
        // Validation
        if (!matricNumber.trim()) {
            toast({
                title: "Error",
                description: "Please enter a valid matric number",
                variant: "destructive"
            });
            return;
        }

        try {
            // TODO: Replace with actual API call to verify student
            const response = await verifyStudent(matricNumber);

            if (response.exists) {
                navigate('/courses', {
                    state: {
                        matricNumber,
                        studentData: response.studentData
                    }
                });
            } else {
                navigate('/register', {
                    state: {
                        matricNumber,
                        channelName
                    }
                });
            }
        } catch (error) {
            toast({
                title: "Verification Failed",
                description: "Unable to verify student. Please try again.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <Card>
                <CardHeader>
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-bold text-primary">
                            {channelName} Student Portal
                        </h2>
                    </div>
                    <CardTitle className="text-center">
                        Student Verification
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label>Matric Number</Label>
                            <Input
                                placeholder="Enter your matric number"
                                value={matricNumber}
                                onChange={(e) => setMatricNumber(e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <Button
                            onClick={handleVerification}
                            className="w-full"
                        >
                            Verify Student
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-sm text-muted-foreground">
                                New to {channelName}?
                                <Button
                                    variant="link"
                                    onClick={() => navigate('/register', {
                                        state: { channelName }
                                    })}
                                >
                                    Register Here
                                </Button>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
