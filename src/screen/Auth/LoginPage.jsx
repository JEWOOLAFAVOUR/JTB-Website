import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();


    const handleLogin = () => {
        navigate("admin/analytics");
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login to Your Account
                </h1>

                <div className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Login Button */}
                <Button onClick={() => handleLogin()} className="w-full mt-6 bg-primary hover:bg-primary-dark text-white">
                    Login
                </Button>

                {/* Optional: Footer */}
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-primary hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
