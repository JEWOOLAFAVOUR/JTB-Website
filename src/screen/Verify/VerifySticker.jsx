'use client'

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from '../../store/useStore'
import { verifySticker } from '../../api/auth'
import NavBar from '../../components/template/Navbar'
import image1 from '../../assets/image1.jpg';
import Footer from '../../components/template/Footer'

export default function VerifySticker() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const { setCustomer, setError, setUser } = useStore()
    const [serialNumber, setSerialNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const vU = location.state?.verification_url

    const bbb = searchParams.get('sticker-number') || vU;

    console.log({ bbb })
    useEffect(() => {
        if (bbb === undefined) {
            navigate('//home')
        } else {
            // Optionally, you could handle additional logic here, like setting the sticker number
            // setSerialNumber(bbb);
            // handleVerify(null, bbb); // Uncomment this if needed for verification
        }
    }, [bbb, navigate]);


    const handleVerify = async (e, stickerNumberFromQR = null) => {
        if (e) e.preventDefault();
        setLoading(true);

        const numberToVerify = stickerNumberFromQR || serialNumber;

        try {
            const stickerData = await verifySticker(numberToVerify);
            setCustomer(stickerData);
            console.log({ stickerData })
            console.log({ firstName: stickerData?.fullname, phone: stickerData?.phone_number })
            if (stickerData?.full_name === "" && stickerData?.phone_number === "") {
                setUser(stickerData)
                navigate('/register-customer')
            } else {
                navigate(`/verify/success`);
            }
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
                                value={bbb}
                                disabled
                                className="w-full h-12 text-lg bg-white border-0 focus:ring-0 cursor-default"
                            />
                        </div>
                        <div className="bg-green-500 p-4 rounded-lg">
                            <Input
                                value={serialNumber}
                                onChange={(e) => setSerialNumber(e.target.value)}
                                className="w-full h-12 text-lg bg-white border-0 focus:ring-0"
                                placeholder="Enter sticker number"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
                            disabled={loading}
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
