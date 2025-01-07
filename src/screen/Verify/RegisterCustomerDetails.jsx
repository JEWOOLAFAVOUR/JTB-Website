'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from '../../store/useStore'

export default function RegisterCustomerDetails() {
    const navigate = useNavigate()
    const { user } = useStore()
    const [isSubmitting, setIsSubmitting] = useState(false)

    React.useEffect(() => {
        if (!user) {
            navigate('/login-for-registration')
        }
    }, [user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            navigate('/verify')
        } catch (error) {
            console.error('Registration failed:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-gray-50 py-12">
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
                                    <Label htmlFor="serialNumber">Serial Number</Label>
                                    <Input
                                        id="serialNumber"
                                        placeholder="Enter sticker serial number"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="vehicleLicense">Vehicle License Number</Label>
                                    <Input
                                        id="vehicleLicense"
                                        placeholder="Enter vehicle license number"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select vehicle type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sedan">Sedan</SelectItem>
                                            <SelectItem value="suv">SUV</SelectItem>
                                            <SelectItem value="truck">Truck</SelectItem>
                                            <SelectItem value="bus">Bus</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="ownerName">Owner's Full Name</Label>
                                    <Input
                                        id="ownerName"
                                        placeholder="Enter owner's full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/verify')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Registering...' : 'Register Customer and Sticker'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

