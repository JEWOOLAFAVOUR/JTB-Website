import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendToast } from '../../components/utilis';
import { addCustomer } from '../../api/auth';
import { statesData, vehicleTypes } from '../../components/data';
import { ArrowLeft } from 'lucide-react';

const AddCustomer = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        licensePlate: '',
        vehicleType: '',
        serial_number: '',
        tyres: '',
        state: '',
        lga: '',
    });

    const [lgas, setLgas] = useState([]); // LGA options for the selected state

    // Handle State Selection
    const handleStateChange = (value) => {
        setFormData((prev) => ({ ...prev, state: value, lga: '' })); // Reset LGA on state change
        setLgas(statesData[value] || []); // Update LGAs based on selected state
    };

    // Handle LGA Selection
    const handleLgaChange = (value) => {
        setFormData((prev) => ({ ...prev, lga: value }));
    };


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle select changes
    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            console.log(formData)

            const response = await addCustomer(formData);
            console.log("customer response:", response);
            sendToast('success', 'Customer added successful')
            navigate('/admin/customers');

        } catch (error) {
            if (error?.code == 23505) {
                sendToast('error', 'Serial number already exists')
            } else {
                sendToast('error', error?.message)

            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <Button
                    variant="ghost"
                    onClick={() => navigate('/admin/customers')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="mr-2" size={20} />
                    Back to Customers
                </Button>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Add New Customer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input
                                        required
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input
                                        required
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Address</label>
                                    <Textarea
                                        required
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter address"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Serial Number</label>
                                    <Input
                                        required
                                        name="serial_number"
                                        type='number'
                                        value={formData.serial_number}
                                        onChange={handleChange}
                                        placeholder="Enter serial number"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Vehicle License Plate Number</label>
                                    <Input
                                        required
                                        name="licensePlate"
                                        value={formData.licensePlate}
                                        onChange={handleChange}
                                        placeholder="Enter vehicle license plate number"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Vehicle Type</label>
                                    <Select
                                        onValueChange={(value) =>
                                            handleSelectChange('vehicleType', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select vehicle type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {vehicleTypes.map((type) => (
                                                <SelectItem key={type} value={type.toLowerCase()}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Number of Tyres</label>
                                    <Input
                                        type="number"
                                        required
                                        name="tyres"
                                        value={formData.tyres}
                                        onChange={handleChange}
                                        placeholder="Enter number of tyres"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">State</label>
                                    <Select onValueChange={handleStateChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(statesData).map((state) => (
                                                <SelectItem key={state} value={state}>
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Local Government Area (LGA)</label>
                                    <Select onValueChange={handleLgaChange} disabled={!formData.state}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select LGA" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {lgas.map((lga) => (
                                                <SelectItem key={lga} value={lga}>
                                                    {lga}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => navigate('/admin/customers')}
                                >
                                    Cancel
                                </Button>
                            </div>

                            <p className="text-sm text-gray-500 text-center">
                                By clicking submit, you are agreeing to our data privacy policy!
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default AddCustomer;
