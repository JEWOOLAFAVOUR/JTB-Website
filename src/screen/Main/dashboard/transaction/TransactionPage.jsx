import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Users, CreditCard, TrendingUp,
    Search, Calendar, User, Mail, Building2, GraduationCap
} from "lucide-react";

export default function TransactionPage() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("premium");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dummy data - replace with your actual data
    const premiumUsers = [
        { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", level: "300", department: "Computer Science", subscriptionDate: "2024-03-15" },
        { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", level: "200", department: "Engineering", subscriptionDate: "2024-03-14" },
    ];

    const transactions = [
        { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", status: "success", amount: "5000", date: "2024-03-15" },
        { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", status: "pending", amount: "5000", date: "2024-03-14" },
    ];

    const handleSearch = (value) => {
        setSearch(value);
    };

    const filteredPremiumUsers = premiumUsers.filter(user =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const filteredTransactions = transactions.filter(transaction =>
        transaction.firstName.toLowerCase().includes(search.toLowerCase()) ||
        transaction.lastName.toLowerCase().includes(search.toLowerCase()) ||
        transaction.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <CreditCard className="h-5 w-5 text-purple-500" />
                                <span className="font-medium">Total Transactions</span>
                            </div>
                            <span className="text-2xl font-bold">150</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-blue-500" />
                                <span className="font-medium">Premium Users</span>
                            </div>
                            <span className="text-2xl font-bold">75</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                                <span className="font-medium">Monthly Revenue</span>
                            </div>
                            <span className="text-2xl font-bold">₦250,000</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Tabs */}
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <Tabs defaultValue="premium" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="premium">Premium Users</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="premium">
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>S/N</TableHead>
                                        <TableHead>First Name</TableHead>
                                        <TableHead>Last Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Department</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPremiumUsers.map((user, index) => (
                                        <TableRow
                                            key={user.id}
                                            className="cursor-pointer hover:bg-gray-50"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.level}</TableCell>
                                            <TableCell>{user.department}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>

                    <TabsContent value="transactions">
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>S/N</TableHead>
                                        <TableHead>First Name</TableHead>
                                        <TableHead>Last Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTransactions.map((transaction, index) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{transaction.firstName}</TableCell>
                                            <TableCell>{transaction.lastName}</TableCell>
                                            <TableCell>{transaction.email}</TableCell>
                                            <TableCell>₦{transaction.amount}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'success' ? 'bg-green-100 text-green-800' :
                                                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {transaction.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* User Details Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Premium User Details</DialogTitle>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">Name:</span>
                                    </div>
                                    <p>{selectedUser.firstName} {selectedUser.lastName}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">Email:</span>
                                    </div>
                                    <p>{selectedUser.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <GraduationCap className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">Level:</span>
                                    </div>
                                    <p>{selectedUser.level}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">Department:</span>
                                    </div>
                                    <p>{selectedUser.department}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">Subscription Date:</span>
                                    </div>
                                    <p>{selectedUser.subscriptionDate}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}