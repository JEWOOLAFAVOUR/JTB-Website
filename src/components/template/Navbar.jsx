// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold text-blue-600">JTB-SIRTS</Link>
                    <ul className="flex space-x-6">
                        <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
                        <li><Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link></li>
                        <li><Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
                        <li><Link to="/get-e-sticker" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Get Your E-Sticker</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;