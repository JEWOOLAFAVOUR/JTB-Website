import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminHeader from '../../components/admin/AdminHeader';

const Dashboard = () => {
    const stats = [
        {
            title: 'Total Customers',
            value: '2,345',
            icon: Users,
            change: '+12.5%',
            changeType: 'positive'
        },
        {
            title: 'Registered Vehicles',
            value: '3,456',
            icon: Car,
            change: '+23.1%',
            changeType: 'positive'
        },
        {
            title: 'Monthly Growth',
            value: '15.2%',
            icon: TrendingUp,
            change: '+4.3%',
            changeType: 'positive'
        }
    ];

    return (
        <div className="p-4">
            {/* <AdminHeader /> */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-6"
            >
                Dashboard Overview
            </motion.h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className={`text-xs ${stat.changeType === 'positive'
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                    }`}>
                                    {stat.change} from last month
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

