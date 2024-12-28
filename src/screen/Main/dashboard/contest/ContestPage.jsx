import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    PlusCircle, Edit, Trash2, Users, Calendar, Trophy,
    AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendToast } from '../../../../components/utilis';

const formSchema = z.object({
    name: z.string().min(1, 'Contest name is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    numberofAttempt: z.number().min(1, 'Number of attempts must be at least 1')
});

export default function ContestPage() {
    const [contests, setContests] = useState([
        {
            id: 1,
            name: "Math Challenge",
            startTime: "2024-03-28T10:00",
            endTime: "2024-03-28T12:00",
            numberofAttempt: 2,
            attempted: 15
        },
        // Add more dummy data as needed
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedContest, setSelectedContest] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            startTime: '',
            endTime: '',
            numberofAttempt: 1
        }
    });

    const handleAdd = async (data) => {
        try {
            // Replace with your API call
            console.log('Adding contest:', data);
            sendToast('success', "Contest added successfully")
            setIsAddModalOpen(false);
            form.reset();
        } catch (error) {
            sendToast('error', "Failed to add contest")
        }
    };

    const handleEdit = async (data) => {
        try {
            // Replace with your API call
            console.log('Editing contest:', data);
            sendToast('success', "Contest updated successfully")
            setIsEditModalOpen(false);
        } catch (error) {
            sendToast('error', "Failed to update contest")
        }
    };

    const handleDelete = async () => {
        try {
            // Replace with your API call
            console.log('Deleting contest:', selectedContest);
            sendToast('success', "Contest deleted successfully")
            setIsDeleteModalOpen(false);
            setSelectedContest(null);
        } catch (error) {
            sendToast('error', "Failed to delete contest")
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Trophy className="h-5 w-5 text-purple-500" />
                                <span className="font-medium">Total Contests</span>
                            </div>
                            <span className="text-2xl font-bold">{contests.length}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-blue-500" />
                                <span className="font-medium">Active Contests</span>
                            </div>
                            <span className="text-2xl font-bold">
                                {contests.filter(c => new Date(c.endTime) > new Date()).length}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-green-500" />
                                <span className="font-medium">Total Participants</span>
                            </div>
                            <span className="text-2xl font-bold">
                                {contests.reduce((acc, curr) => acc + curr.attempted, 0)}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Contests Table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Contests</CardTitle>
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Contest
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Contest</DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contest Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="startTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Start Time</FormLabel>
                                                <FormControl>
                                                    <Input type="datetime-local" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Time</FormLabel>
                                                <FormControl>
                                                    <Input type="datetime-local" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="numberofAttempt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Number of Attempts Allowed</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min="1" {...field}
                                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Button type="submit">Add Contest</Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>End Time</TableHead>
                                <TableHead>Attempts Allowed</TableHead>
                                <TableHead>Times Attempted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contests.map((contest) => (
                                <TableRow key={contest.id}>
                                    <TableCell className="font-medium">{contest.name}</TableCell>
                                    <TableCell>{format(new Date(contest.startTime), "PPp")}</TableCell>
                                    <TableCell>{format(new Date(contest.endTime), "PPp")}</TableCell>
                                    <TableCell>{contest.numberofAttempt}</TableCell>
                                    <TableCell>{contest.attempted}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${new Date(contest.startTime) > new Date()
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : new Date(contest.endTime) < new Date()
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}>
                                            {new Date(contest.startTime) > new Date()
                                                ? 'Upcoming'
                                                : new Date(contest.endTime) < new Date()
                                                    ? 'Ended'
                                                    : 'Active'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedContest(contest);
                                                    form.reset({
                                                        name: contest.name,
                                                        startTime: contest.startTime,
                                                        endTime: contest.endTime,
                                                        numberofAttempt: contest.numberofAttempt
                                                    });
                                                    setIsEditModalOpen(true);
                                                }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedContest(contest);
                                                    setIsDeleteModalOpen(true);
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

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Contest</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contest Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="numberofAttempt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Attempts Allowed</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="1" {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end space-x-2">
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Contest</DialogTitle>
                    </DialogHeader>
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            Are you sure you want to delete this contest? This action cannot be undone.
                        </AlertDescription>
                    </Alert>
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}