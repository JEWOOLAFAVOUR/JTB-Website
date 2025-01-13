'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from '../../store/useStore'
import { verifySticker } from '../../api/auth'
import NavBar from '../../components/template/Navbar'
import image1 from '../../assets/image1.jpg';
import Footer from '../../components/template/Footer'

export default function VerifySticker() {
    const navigate = useNavigate()
    const { setCustomer, setError } = useStore()
    const [serialNumber, setSerialNumber] = useState('')
    const [loading, setLoading] = useState(false)

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const stickerData = await verifySticker(serialNumber);
            setCustomer(stickerData);
            navigate(`/verify/success`);
        } catch (err) {
            setError('Invalid serial number. Please try again.');
            navigate('/verify/error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <div className="relative h-[500px]">
                <div className="absolute inset-0 bg-black/50">
                    <img
                        src={image1}
                        alt="Traffic"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-5xl font-bold text-center mb-4">
                        Single Inter-State Road Tax Sticker
                    </h1>
                    <p className="text-2xl">
                        Sticker Verification
                    </p>
                </div>
            </div>

            <div className="max-w-[600px] mx-auto p-8 -mt-32 relative z-10">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="bg-green-500 p-4 rounded-lg">
                            <Input
                                value="JTB/2025/ZAMFARA/79073406"
                                disabled
                                className="w-full h-12 text-lg bg-white border-0 focus:ring-0 cursor-default"
                            />
                        </div>
                        <Input
                            placeholder="Input Serial Number"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            required
                            className="w-full h-12 text-lg border-gray-300"
                        />
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
                        >
                            {loading ? "Verifying..." : "Verify Sticker"}
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
