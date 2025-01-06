import React from 'react';
import Navbar from '../../components/template/NavBar';
import Footer from '../../components/template/Footer';
import { Carousel, CarouselSlide } from '../../components/ui/carousel';
import { Button } from '../../components/ui/button';

import image1 from '../../assets/image1.jpg';

const HomePage = () => {
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
                                    <div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        style={{
                                            backgroundImage: `url(${slide.slide})`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-black/50" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
                                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                            <span className="text-green-500">{slide.title}</span>
                                            <br />
                                            <span>{slide.highlight}</span>
                                        </h1>
                                        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                                            {slide.subtitle}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button
                                                size="lg"
                                                className="bg-green-500 hover:bg-green-600 text-white min-w-[200px]"
                                                asChild
                                            >
                                                <a href="/individual">INDIVIDUAL</a>
                                            </Button>
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white min-w-[200px]"
                                                asChild
                                            >
                                                <a href="/vendors">VENDORS</a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CarouselSlide>
                        ))}
                    </Carousel>
                </section>

                {/* Additional Sections */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            Why Choose JTB-SIRTS?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Nationwide Coverage</h3>
                                <p className="text-gray-600">Valid across all states with seamless integration.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Quick Processing</h3>
                                <p className="text-gray-600">Get your e-sticker quickly with our efficient system.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                                <p className="text-gray-600">Round-the-clock assistance for all your needs.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;

