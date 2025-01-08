'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useStore } from '../../store/useStore'

export default function VerifySuccess() {
    const navigate = useNavigate()
    const { customer } = useStore()

    console.log({ customer })

    React.useEffect(() => {
        if (!customer) {
            navigate('/verify')
        }
    }, [customer, navigate])

    if (!customer) return null

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto p-6"
            >
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="inline-block p-2 rounded-full bg-green-100 mb-4"
                        >
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold mb-2">Verification Successful</h2>
                        <p className="text-gray-600">
                            Remark: "Sticker is Original and Vehicle attached!"
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="border-t border-b py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Full Name</p>
                                    <p className="font-semibold">{customer?.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Vehicle License</p>
                                    <p className="font-semibold">{customer?.vehicle_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Sticker Number</p>
                                    <p className="font-semibold">{customer?.serial_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Vehicle Type</p>
                                    <p className="font-semibold">{customer?.vehicle_type}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Button
                            onClick={() => navigate('/verify')}
                            variant="outline"
                            className="mx-auto"
                        >
                            Verify Another Sticker
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

