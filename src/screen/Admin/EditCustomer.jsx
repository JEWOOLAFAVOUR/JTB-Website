import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendToast } from '../../components/utilis';
import { getCustomerById, updateCustomer } from '../../api/auth';

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        serial_number: '',
        vehicleLicensePlate: '',
        vehicleType: '',
        tyres: '',
        state: '',
        lga: ''
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            setLoading(true);
            try {
                const customerData = await getCustomerById(id);
                setFormData({
                    name: customerData.full_name,
                    email: customerData.email,
                    phone: customerData.phone_number,
                    address: customerData.address,
                    serial_number: customerData.serial_number,
                    vehicleLicensePlate: customerData.vehicle_number,
                    vehicleType: customerData.vehicle_type,
                    tyres: customerData.tyres,
                    state: customerData.state,
                    lga: customerData.lga
                });
            } catch (error) {
                console.error('Error fetching customer:', error);
                sendToast('error', "Failed to load customer details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSelectChange = (value, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateCustomer(id, formData);
            sendToast('success', "Customer updated successfully.");
            navigate(`/admin/customers/${id}`);
        } catch (error) {
            console.error('Error updating customer:', error);
            sendToast('error', "Failed to update customer. Please try again.");
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

    if (!formData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Customer Not Found</h2>
                    <p className="text-gray-600 mb-4">The customer you're trying to edit doesn't exist or has been removed.</p>
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
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(`/admin/customers/${id}`)}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="mr-2" size={20} />
                        Back to Customer Details
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Edit Customer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serial_number">Serial Number</Label>
                                    <Input
                                        id="serial_number"
                                        value={formData.serial_number}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vehicleLicensePlate">Vehicle License Plate</Label>
                                    <Input
                                        id="vehicleLicensePlate"
                                        value={formData.vehicleLicensePlate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                                    <Select
                                        value={formData.vehicleType}
                                        onValueChange={(value) => handleSelectChange(value, 'vehicleType')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select vehicle type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sedan">Sedan</SelectItem>
                                            <SelectItem value="SUV">SUV</SelectItem>
                                            <SelectItem value="Truck">Truck</SelectItem>
                                            <SelectItem value="Van">Van</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numberOfTyres">Number of Tyres</Label>
                                    <Input
                                        id="tyres"
                                        type="number"
                                        value={formData.tyres}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Select
                                        value={formData.state}
                                        onValueChange={(value) => handleSelectChange(value, 'state')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Lagos">Lagos</SelectItem>
                                            <SelectItem value="Abuja">Abuja</SelectItem>
                                            <SelectItem value="Kano">Kano</SelectItem>
                                            {/* Add more Nigerian states as needed */}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lgaOfOrigin">LGA of Origin</Label>
                                    <Input
                                        id="lga"
                                        value={formData.lga}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate(`/admin/customers/${id}`)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default EditCustomer;