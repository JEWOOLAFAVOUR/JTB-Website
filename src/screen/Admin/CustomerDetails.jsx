import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, ArrowLeft, User, Mail, Phone, MapPin, FileText, Car, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { sendToast } from '../../components/utilis';
import { getCustomerById, deleteCustomer } from '../../api/auth';

const CustomerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchCustomer = async () => {
            setLoading(true);
            try {
                const customerData = await getCustomerById(id);
                setCustomer(customerData);
            } catch (error) {
                console.error('Error fetching customer:', error);
                sendToast('error', "Failed to load customer details. Please try again.")
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    const handleEdit = () => {
        navigate(`/admin/customers/edit/${id}`);
    };

    const handleDelete = async () => {
        setIsDeleteModalOpen(false);
        setLoading(true);
        try {
            await deleteCustomer(id);
            sendToast('success', "Customer deleted successfully.")
            navigate('/admin/customers');
        } catch (error) {
            console.error('Error deleting customer:', error);
            sendToast('error', "Failed to delete customer. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Customer Not Found</h2>
                    <p className="text-gray-600 mb-4">The customer you're looking for doesn't exist or has been removed.</p>
                    <Button onClick={() => navigate('/admin/customers')}>
                        Back to Customers
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/admin/customers')}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="mr-2" size={20} />
                        Back to Customers
                    </Button>
                    <div className="space-x-2">
                        <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
                            <Edit2 className="mr-2" size={16} />
                            Edit
                        </Button>
                        <Button onClick={() => setIsDeleteModalOpen(true)} variant="destructive">
                            <Trash2 className="mr-2" size={16} />
                            Delete
                        </Button>
                    </div>
                </div>

                <Card className="overflow-hidden">
                    <CardHeader className="bg-green-600 text-white">
                        <CardTitle className="text-2xl flex items-center">
                            <User className="mr-2" size={24} />
                            {customer.full_name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Personal Information</h3>
                                <div className="space-y-3">
                                    <p className="flex items-center"><Mail className="mr-2" size={18} /> {customer.email}</p>
                                    <p className="flex items-center"><Phone className="mr-2" size={18} /> {customer.phone_number}</p>
                                    <p className="flex items-center"><MapPin className="mr-2" size={18} /> {customer.address}</p>
                                    <p className="flex items-center"><FileText className="mr-2" size={18} /> Serial No: {customer.serial_number}</p>
                                    <p className="flex items-center"><MapPin className="mr-2" size={18} /> State: {customer.state}</p>
                                    <p className="flex items-center"><MapPin className="mr-2" size={18} /> LGA: {customer.lga}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Vehicle Information</h3>
                                <div className="space-y-3">
                                    <p className="flex items-center"><Car className="mr-2" size={18} /> License Plate: {customer.vehicle_number}</p>
                                    <p className="flex items-center"><Car className="mr-2" size={18} /> Vehicle Type: {customer.vehicle_type}</p>
                                    <p className="flex items-center"><Car className="mr-2" size={18} /> Number of Tyres: {customer.tyres}</p>
                                    <p className="flex items-center"><Calendar className="mr-2" size={18} /> Registered: {new Date(customer.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <AnimatePresence>
                {isDeleteModalOpen && (
                    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure you want to delete this customer?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the customer
                                    and remove their data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomerDetails;