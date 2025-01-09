import React from 'react';
import Navbar from '../../components/template/Navbar';
import Footer from '../../components/template/Footer';
import { Carousel, CarouselSlide } from '../../components/ui/carousel';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';

import image1 from '../../assets/image1.jpg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const slides = [
        {
            id: 1,
            slide: image1,
            title: "Single Inter-State Road",
            highlight: "Tax Sticker",
            subtitle: "E-Sticker Purchase and Enumeration Platform"
        },
        {
            id: 2,
            slide: image1,
            title: "Simplified Road Tax",
            highlight: "Compliance",
            subtitle: "Quick and Easy E-Sticker Processing"
        },
        {
            id: 3,
            slide: image1,
            title: "Nationwide",
            highlight: "Coverage",
            subtitle: "Valid Across All States"
        },
    ];
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <section className="relative h-[calc(100vh-4rem)] min-h-[600px]">
                    <Carousel slides={slides}>
                        {slides.map((slide) => (
                            <CarouselSlide key={slide.id}>
                                <div className="relative h-[calc(100vh-4rem)] min-h-[600px] w-full">
                                    {/* Background Image with Overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        initial={{ scale: 1.2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 1.5 }}
                                        style={{
                                            backgroundImage: `url(${slide.slide})`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-black/50" />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
                                        <motion.h1
                                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            <span className="text-green-500 block mb-2">{slide.title}</span>
                                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                                {slide.highlight}
                                            </span>
                                        </motion.h1>
                                        <motion.p
                                            className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200"
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.4 }}
                                        >
                                            {slide.subtitle}
                                        </motion.p>
                                        <motion.div
                                            className="flex flex-col sm:flex-row gap-4"
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.6 }}
                                        >
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Button
                                                    size="lg"
                                                    className="bg-green-500 hover:bg-green-600 text-white min-w-[200px]"
                                                    asChild
                                                >
                                                    <a href="/verify">INDIVIDUAL</a>
                                                </Button>
                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Button
                                                    size="lg"
                                                    variant="outline"
                                                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white min-w-[200px]"
                                                    asChild
                                                >
                                                    <a href="/login">VENDORS</a>
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </CarouselSlide>
                        ))}
                    </Carousel>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-16"
                        >
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl md:text-4xl font-bold text-center mb-12"
                            >
                                Why Choose JTB-SIRTS?
                            </motion.h2>

                            <div className="grid md:grid-cols-3 gap-8">
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300"
                                >
                                    <div className="text-green-500 mb-4">
                                        {/* You can add icons here */}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">Nationwide Coverage</h3>
                                    <p className="text-gray-600">Valid across all states with seamless integration and real-time verification.</p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300"
                                >
                                    <div className="text-green-500 mb-4">
                                        {/* You can add icons here */}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">Quick Processing</h3>
                                    <p className="text-gray-600">Get your e-sticker quickly with our efficient and automated system.</p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300"
                                >
                                    <div className="text-green-500 mb-4">
                                        {/* You can add icons here */}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                                    <p className="text-gray-600">Round-the-clock assistance for all your needs and queries.</p>
                                </motion.div>
                            </div>

                            {/* Call to Action */}
                            <motion.div
                                variants={itemVariants}
                                className="text-center mt-16"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        size="lg"
                                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg"
                                        asChild
                                    >
                                        <a href="/get-e-sticker">Get Started Today</a>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-4 gap-8 text-center"
                        >
                            <motion.div
                                variants={itemVariants}
                                className="p-6"
                            >
                                <h3 className="text-4xl font-bold text-green-500 mb-2">1M+</h3>
                                <p className="text-gray-600">Registered Vehicles</p>
                            </motion.div>
                            <motion.div
                                variants={itemVariants}
                                className="p-6"
                            >
                                <h3 className="text-4xl font-bold text-green-500 mb-2">36+</h3>
                                <p className="text-gray-600">States Coverage</p>
                            </motion.div>
                            <motion.div
                                variants={itemVariants}
                                className="p-6"
                            >
                                <h3 className="text-4xl font-bold text-green-500 mb-2">24/7</h3>
                                <p className="text-gray-600">Support Available</p>
                            </motion.div>
                            <motion.div
                                variants={itemVariants}
                                className="p-6"
                            >
                                <h3 className="text-4xl font-bold text-green-500 mb-2">99%</h3>
                                <p className="text-gray-600">Customer Satisfaction</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;

