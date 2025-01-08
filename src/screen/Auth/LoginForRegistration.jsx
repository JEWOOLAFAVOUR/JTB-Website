'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from '../../store/useStore'
import { sendToast } from '../../components/utilis'
import { loginUser } from '../../api/auth'

export default function LoginForRegistration() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        const { setUser } = useStore.getState();


        try {
            console.log({ email, password })

            const response = await loginUser(email, password);

            if (response) {
                setUser(response?.user); // Save token to Zustand store
                sendToast('success', 'Login successful');
                navigate('/register-customer');
            }
        } catch (error) {
            sendToast('error', error?.message)
            console.error("Error during login:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8"
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Login to Register Sticker</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <Input
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

