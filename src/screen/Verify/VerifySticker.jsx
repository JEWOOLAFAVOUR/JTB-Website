'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from '../../store/useStore'
import image1 from '../../assets/image1.jpg';
import { verifySticker } from '../../api/auth'
import NavBar from '../../components/template/Navbar'


export default function VerifySticker() {
    const navigate = useNavigate()
    const { setCustomer, setError } = useStore()
    const [serialNumber, setSerialNumber] = React.useState('')
    const [loading, setLoading] = useState(false);


    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log({ serialNumber })
            const stickerData = await verifySticker(serialNumber); // Call the API function
            console.log({ stickerData })
            setCustomer(stickerData); // Save sticker data in state
            navigate(`/verify/success`); // Navigate to success page
        } catch (err) {
            setError('Invalid serial number. Please try again.');
            navigate('/verify/error'); // Navigate to error page
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="relative h-[300px] bg-gray-900">
                <img
                    src={image1}
                    alt="Traffic"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-center mb-4"
                    >
                        Single Inter-State Road Tax Sticker
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl"
                    >
                        Sticker Verification
                    </motion.p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-md mx-auto p-6 -mt-16 relative z-10"
            >
                <div className="bg-white rounded-lg shadow-xl p-6">
                    <form onSubmit={handleVerify} className="space-y-4">
                        <div>
                            <Input
                                placeholder="Enter Serial Number"
                                value={serialNumber}
                                onChange={(e) => setSerialNumber(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                            {loading ? "Verifying..." : "Verify Sticker"}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

