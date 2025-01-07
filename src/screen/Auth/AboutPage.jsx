import React from 'react';
import Navbar from '../../components/template/NavBar';
import Footer from '../../components/template/Footer';
import image1 from '../../assets/image1.jpg';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] w-full">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${image1})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        About
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Single Inter-State Road Tax Sticker
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        className="space-y-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                            About
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            The Single Interstate Road Tax Sticker is an E-Sticker designed to capture all vehicles
                            that perform inter-state haulages in the country. This is with a view of providing
                            adequate social security and combating multiple taxation for inter-state haulages
                            throughout the country.
                        </p>

                        {/* Additional Content */}
                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            <motion.div
                                className="p-6 bg-white rounded-lg shadow-lg"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">Nationwide Coverage</h3>
                                <p className="text-gray-600">Valid across all states with seamless integration and tracking.</p>
                            </motion.div>

                            <motion.div
                                className="p-6 bg-white rounded-lg shadow-lg"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">Simplified Process</h3>
                                <p className="text-gray-600">Easy registration and verification process for all vehicles.</p>
                            </motion.div>

                            <motion.div
                                className="p-6 bg-white rounded-lg shadow-lg"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">Secure System</h3>
                                <p className="text-gray-600">Advanced security measures to protect your information.</p>
                            </motion.div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-16">
                            <motion.a
                                href="/get-e-sticker"
                                className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Your E-Sticker Now
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;

