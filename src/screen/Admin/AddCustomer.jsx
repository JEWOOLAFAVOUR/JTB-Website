import React from 'react';
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

const AddCustomer = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        navigate('/admin/customers');
    };

    // Nigerian states
    const states = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
        'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
        'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
        'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
        'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

    const vehicleTypes = [
        'Sedan', 'SUV', 'Truck', 'Van', 'Bus', 'Motorcycle'
    ];

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Add New Customer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input required placeholder="Enter full name" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" required placeholder="Enter email address" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input required placeholder="Enter phone number" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Address</label>
                                    <Textarea required placeholder="Enter address" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">TIN Number (if available)</label>
                                    <Input placeholder="Enter TIN number" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Vehicle License Plate Number</label>
                                    <Input required placeholder="Enter vehicle license plate number" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Vehicle Type</label>
                                    <Select required>
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
                                    <Input type="number" required placeholder="Enter number of tyres" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">State</label>
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {states.map((state) => (
                                                <SelectItem key={state} value={state.toLowerCase()}>
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">LGA of Origin</label>
                                    <Input required placeholder="Enter LGA" />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    Submit
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

