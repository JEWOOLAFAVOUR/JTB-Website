'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useStore } from '../../store/useStore'
import Footer from '../../components/template/Footer'

export default function VerifyError() {
    const navigate = useNavigate()
    const { error } = useStore()

    React.useEffect(() => {
        if (!error) {
            navigate('/verify')
        }
    }, [error, navigate])

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto p-6"
            >
                <div className="bg-white rounded-lg shadow-xl p-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="inline-block p-2 rounded-full bg-red-100 mb-4"
                    >
                        <AlertCircle className="w-12 h-12 text-red-600" />
                    </motion.div>

                    <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
                    <p className="text-gray-600 mb-6">
                        The sticker number you entered could not be verified. Please check the number and try again.
                    </p>

                    <div className="space-y-4">
                        <Button
                            onClick={() => navigate('/verify')}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            Try Again
                        </Button>
                        {/* 
                        <Button
                            onClick={() => navigate('/register-customer')}
                            variant="outline"
                            className="w-full"
                        >
                            Register New Sticker
                        </Button> */}
                    </div>
                </div>
                {/* <Footer /> */}
            </motion.div>
        </div>
    )
}

