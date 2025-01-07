import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/template/NavBar';
import Footer from '../../components/template/Footer';
import image1 from '../../assets/image1.jpg';

const IndividualPurchase = () => {
    const [licensePlate, setLicensePlate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        // Handle the submission
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] w-full mt-16">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    style={{
                        backgroundImage: `url(${image1})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </motion.div>

                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Single Inter-State Road Tax Sticker
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-200"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Individual Purchase
                    </motion.p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        className="bg-white rounded-lg shadow-xl overflow-hidden"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="bg-green-600 p-6 sm:p-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                                Single Inter-State Road Tax Sticker Purchase
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">
                                    Vehicle License Plate Number
                                </label>
                                <input
                                    type="text"
                                    id="licensePlate"
                                    value={licensePlate}
                                    onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter vehicle license plate number"
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className={`w-full bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isLoading ? 'Checking Vehicle...' : 'Check Vehicle'}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Additional Information */}
                    <motion.div
                        className="mt-8 grid md:grid-cols-2 gap-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Important Information</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Payment for subscription</li>
                                <li>• Instant digital delivery</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Valid vehicle registration</li>
                                <li>• Proof of ownership</li>
                                <li>• Valid means of identification</li>
                                <li>• Recent utility bill</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default IndividualPurchase;
