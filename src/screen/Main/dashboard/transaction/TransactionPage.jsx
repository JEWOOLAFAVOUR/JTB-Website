import React, { useState, useMemo } from 'react';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    DollarSign,
    Calendar as CalendarIcon,
    Search
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export default function TransactionPage() {
    const generateTransactions = () => {
        const transactions = [];
        const students = [
            'John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Brown',
            'David Wilson', 'Sarah Davis', 'Robert Taylor', 'Lisa Anderson',
            'Chris Lee', 'Patricia Williams', 'James Garcia', 'Linda Martinez',
            'William Lopez', 'Jessica Perez', 'Thomas Harris', 'Karen Clark',
            'Joseph Lewis', 'Emily Walker', 'Daniel Hall', 'Sophia Allen'
        ];

        const statusOptions = ['Successful', 'Failed', 'Pending'];

        for (let i = 1; i <= 35; i++) {
            const randomStudent = students[Math.floor(Math.random() * students.length)];
            const [firstName, lastName] = randomStudent.split(' ');

            transactions.push({
                id: `TRX${String(i).padStart(4, '0')}`,
                firstName,
                lastName,
                matricNumber: `MTN2023${String(i).padStart(3, '0')}`,
                amount: Math.floor(Math.random() * 10000) / 100,
                date: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1),
                status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
            });
        }
        return transactions;
    };

    const [transactions, setTransactions] = useState(generateTransactions());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState(null);
    const [filterPeriod, setFilterPeriod] = useState('all');

    const itemsPerPage = 10;

    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const matchesSearch =
                transaction.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.matricNumber.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDateFilter = !dateFilter ||
                (transaction.date >= dateFilter);

            const matchesPeriodFilter = filterPeriod === 'all' ||
                (filterPeriod === 'weekly' &&
                    transaction.date >= new Date(new Date().setDate(new Date().getDate() - 7)));

            return matchesSearch && matchesDateFilter && matchesPeriodFilter;
        });
    }, [transactions, searchTerm, dateFilter, filterPeriod]);

    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalBalance = transactions.reduce((sum, trx) => sum + trx.amount, 0);
    const todayRevenue = transactions
        .filter(trx =>
            trx.date.toDateString() === new Date().toDateString() &&
            trx.status === 'Successful'
        )
        .reduce((sum, trx) => sum + trx.amount, 0);
    const totalWithdrawn = transactions
        .filter(trx => trx.status === 'Successful')
        .reduce((sum, trx) => sum + trx.amount, 0);

    return (
        <div className="p-6 space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{totalBalance.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Total transaction value</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{todayRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Revenue generated today</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{totalWithdrawn.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Total amount withdrawn</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <CardTitle>Transaction History</CardTitle>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-2">
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search transactions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 w-full sm:w-[250px]"
                                />
                            </div>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className="w-full sm:w-[280px] justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateFilter ? (
                                            format(dateFilter, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dateFilter}
                                        onSelect={setDateFilter}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <Select
                                value={filterPeriod}
                                onValueChange={setFilterPeriod}
                                className="w-full sm:w-[180px]"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter Period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Transactions</SelectItem>
                                    <SelectItem value="weekly">Last 7 Days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Transactions Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Matric Number</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{transaction.firstName}</TableCell>
                                    <TableCell>{transaction.lastName}</TableCell>
                                    <TableCell>{transaction.matricNumber}</TableCell>
                                    <TableCell>₦{transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={transaction.status === 'Successful' ? 'success' : transaction.status === 'Failed' ? 'destructive' : 'secondary'}
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-between items-center">
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </Button>
                        <span>
                            Page {currentPage} of {Math.ceil(filteredTransactions.length / itemsPerPage)}
                        </span>
                        <Button
                            disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}









// import React, { useState, useMemo } from 'react';
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle
// } from "@/components/ui/card";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow
// } from "@/components/ui/table";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger
// } from "@/components/ui/popover";
// import {
//     DollarSign,
//     Calendar as CalendarIcon,
//     Search
// } from 'lucide-react';
// import { Badge } from "@/components/ui/badge";
// import { format } from 'date-fns';

// export default function TransactionPage() {
//     const generateTransactions = () => {
//         const transactions = [];
//         const students = [
//             'John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Brown',
//             'David Wilson', 'Sarah Davis', 'Robert Taylor', 'Lisa Anderson'
//         ];

//         for (let i = 1; i <= 30; i++) {
//             const randomStudent = students[Math.floor(Math.random() * students.length)];
//             const [firstName, lastName] = randomStudent.split(' ');

//             transactions.push({
//                 id: `TRX₦{String(i).padStart(4, '0')}`,
//                 firstName,
//                 lastName,
//                 matricNumber: `MTN2023₦{String(i).padStart(3, '0')}`,
//                 amount: Math.floor(Math.random() * 10000) / 100,
//                 date: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1),
//                 status: Math.random() > 0.1 ? 'Successful' : 'Failed'
//             });
//         }
//         return transactions;
//     };

//     const [transactions, setTransactions] = useState(generateTransactions());
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dateFilter, setDateFilter] = useState(null);
//     const [filterPeriod, setFilterPeriod] = useState('all');

//     const itemsPerPage = 10;

//     const filteredTransactions = useMemo(() => {
//         return transactions.filter(transaction => {
//             const matchesSearch =
//                 transaction.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 transaction.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 transaction.matricNumber.toLowerCase().includes(searchTerm.toLowerCase());

//             const matchesDateFilter = !dateFilter ||
//                 (transaction.date >= dateFilter);

//             const matchesPeriodFilter = filterPeriod === 'all' ||
//                 (filterPeriod === 'weekly' &&
//                     transaction.date >= new Date(new Date().setDate(new Date().getDate() - 7)));

//             return matchesSearch && matchesDateFilter && matchesPeriodFilter;
//         });
//     }, [transactions, searchTerm, dateFilter, filterPeriod]);

//     const paginatedTransactions = filteredTransactions.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     const totalBalance = transactions.reduce((sum, trx) => sum + trx.amount, 0);
//     const todayRevenue = transactions
//         .filter(trx =>
//             trx.date.toDateString() === new Date().toDateString() &&
//             trx.status === 'Successful'
//         )
//         .reduce((sum, trx) => sum + trx.amount, 0);
//     const totalWithdrawn = transactions
//         .filter(trx => trx.status === 'Successful')
//         .reduce((sum, trx) => sum + trx.amount, 0);

//     return (
//         <div className="p-6 space-y-6">
//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
//                         <DollarSign className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">₦{totalBalance.toFixed(2)}</div>
//                         <p className="text-xs text-muted-foreground">Total transaction value</p>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
//                         <DollarSign className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">₦{todayRevenue.toFixed(2)}</div>
//                         <p className="text-xs text-muted-foreground">Revenue generated today</p>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
//                         <DollarSign className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">₦{totalWithdrawn.toFixed(2)}</div>
//                         <p className="text-xs text-muted-foreground">Total amount withdrawn</p>
//                     </CardContent>
//                 </Card>
//             </div>

//             <Card className="mt-6">
//                 <CardHeader>
//                     <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
//                         <CardTitle>Transaction History</CardTitle>
//                         <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-2">
//                             <div className="relative w-full sm:w-auto">
//                                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                     placeholder="Search transactions..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="pl-8 w-full sm:w-[250px]"
//                                 />
//                             </div>

//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Button
//                                         variant={"outline"}
//                                         className="w-full sm:w-[280px] justify-start text-left font-normal"
//                                     >
//                                         <CalendarIcon className="mr-2 h-4 w-4" />
//                                         {dateFilter ? (
//                                             format(dateFilter, "PPP")
//                                         ) : (
//                                             <span>Pick a date</span>
//                                         )}
//                                     </Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-auto p-0">
//                                     <Calendar
//                                         mode="single"
//                                         selected={dateFilter}
//                                         onSelect={setDateFilter}
//                                         initialFocus
//                                     />
//                                 </PopoverContent>
//                             </Popover>

//                             <Select
//                                 value={filterPeriod}
//                                 onValueChange={setFilterPeriod}
//                                 className="w-full sm:w-[180px]"
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Filter Period" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="all">All Transactions</SelectItem>
//                                     <SelectItem value="weekly">Last 7 Days</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>
//                 </CardHeader>

//                 <CardContent>
//                     {/* Transactions Table */}
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Transaction ID</TableHead>
//                                 <TableHead>First Name</TableHead>
//                                 <TableHead>Last Name</TableHead>
//                                 <TableHead>Matric Number</TableHead>
//                                 <TableHead>Amount</TableHead>
//                                 <TableHead>Date</TableHead>
//                                 <TableHead>Status</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {paginatedTransactions.map((transaction) => (
//                                 <TableRow key={transaction.id}>
//                                     <TableCell>{transaction.id}</TableCell>
//                                     <TableCell>{transaction.firstName}</TableCell>
//                                     <TableCell>{transaction.lastName}</TableCell>
//                                     <TableCell>{transaction.matricNumber}</TableCell>
//                                     <TableCell>₦{transaction.amount.toFixed(2)}</TableCell>
//                                     <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
//                                     <TableCell>
//                                         <Badge
//                                             variant={transaction.status === 'Successful' ? 'default' : 'destructive'}
//                                         >
//                                             {transaction.status}
//                                         </Badge>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>

//                     {/* Pagination */}
//                     <div className="flex justify-between items-center mt-4">
//                         <div>
//                             Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                             {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{" "}
//                             {filteredTransactions.length} entries
//                         </div>
//                         <div className="flex space-x-2">
//                             <Button
//                                 disabled={currentPage === 1}
//                                 onClick={() => setCurrentPage(currentPage - 1)}
//                             >
//                                 Previous
//                             </Button>
//                             <Button
//                                 disabled={currentPage * itemsPerPage >= filteredTransactions.length}
//                                 onClick={() => setCurrentPage(currentPage + 1)}
//                             >
//                                 Next
//                             </Button>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
