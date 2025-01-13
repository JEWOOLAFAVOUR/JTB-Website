'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from '../../store/useStore'
import { addCustomer } from '../../api/auth'
import { sendToast } from '../../components/utilis'
import NavBar from '../../components/template/Navbar'
import { statesData, vehicleTypes } from '../../components/data'

export default function RegisterCustomerDetails() {
    const navigate = useNavigate()
    const { user } = useStore()
    const [isLoading, setIsLoading] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false)

    // React.useEffect(() => {
    //     if (!user) {
    //         navigate('/verify')
    //     }
    // }, [user, navigate])

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

        const { clearUser } = useStore.getState();

        try {
            console.log(formData);

            const response = await addCustomer(formData);
            console.log("Customer response:", response);

            sendToast('success', 'Customer added successfully');

            console.log("Clearing user...");
            clearUser(); // This clears the user
            console.log("User after clear:", useStore.getState().user);

            navigate('/verify');
        } catch (error) {
            if (error?.code == 23505) {
                sendToast('error', 'Serial number already exists');
            } else {
                sendToast('error', error?.message);
            }
        } finally {
            setIsLoading(false);
        }
    };



    // if (!user) return null

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <NavBar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto p-6"
            >
                <Button
                    variant="ghost"
                    onClick={() => navigate('/verify')}
                    className="mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Verification
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Register New Customer and Sticker</CardTitle>
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
                                        name="serial_number"
                                        required
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
    )
}

