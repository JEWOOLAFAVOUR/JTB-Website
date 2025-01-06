// screen/Auth/AboutPage.jsx
import React from 'react';
import Navbar from '../../components/template/NavBar';
import Footer from '../../components/template/Footer';

const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <section className="bg-gray-100 py-20">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold mb-8 text-center">About JTB-SIRTS</h1>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <p className="text-lg mb-6">
                                JTB-SIRTS (Joint Tax Board - State Internal Revenue Tax System) is a revolutionary platform designed to streamline the process of road tax compliance in Nigeria. Our mission is to provide an efficient, transparent, and user-friendly system for vehicle owners to obtain their e-stickers and ensure they are compliant with state tax regulations.
                            </p>
                            <p className="text-lg mb-6">
                                With JTB-SIRTS, we aim to simplify the tax collection process, reduce fraud, and improve the overall experience for both vehicle owners and tax authorities. Our innovative e-sticker solution allows for quick verification and ensures that all road users contribute their fair share to the development of our infrastructure.
                            </p>
                            <p className="text-lg">
                                We are committed to leveraging technology to create a more efficient and effective tax system, ultimately contributing to the growth and development of our nation.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;