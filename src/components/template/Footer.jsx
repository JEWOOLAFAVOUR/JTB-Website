// components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">JTB-SIRTS</h3>
                        <p className="text-sm">Providing efficient e-sticker solutions for road tax compliance.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-blue-400">Home</a></li>
                            <li><a href="/about" className="hover:text-blue-400">About</a></li>
                            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
                            <li><a href="/get-e-sticker" className="hover:text-blue-400">Get Your E-Sticker</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-sm">123 Main Street, City, Country</p>
                        <p className="text-sm">Email: info@jtb-sirts.com</p>
                        <p className="text-sm">Phone: +1 234 567 8900</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm">&copy; 2025 JTB-SIRTS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;