import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo.png"
                            alt="SIRTS-SHF"
                            className="h-8"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-green-600">
                            HOME
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-green-600">
                            ABOUT
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-green-600">
                            CONTACT
                        </Link>
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-1 bg-white text-green-600 border-2 border-green-600 px-4 py-2 hover:bg-green-600 hover:text-white transition-colors"
                            >
                                <span>GET YOUR E-STICKER</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
                                    >
                                        <Link
                                            to="/individual"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Individuals
                                        </Link>
                                        <Link
                                            to="/vendors"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Accredited Vendors
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-gray-600 hover:text-green-600"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 px-4 space-y-4">
                                <Link
                                    to="/"
                                    className="block text-gray-700 hover:text-green-600 text-lg"
                                    onClick={toggleMenu}
                                >
                                    HOME
                                </Link>
                                <Link
                                    to="/about"
                                    className="block text-gray-700 hover:text-green-600 text-lg"
                                    onClick={toggleMenu}
                                >
                                    ABOUT
                                </Link>
                                <Link
                                    to="/contact"
                                    className="block text-gray-700 hover:text-green-600 text-lg"
                                    onClick={toggleMenu}
                                >
                                    CONTACT
                                </Link>
                                <div className="space-y-2">
                                    <Link
                                        to="/individual"
                                        className="block text-gray-700 hover:text-green-600 text-lg pl-4 border-l-4 border-green-600"
                                        onClick={toggleMenu}
                                    >
                                        Individual Purchase
                                    </Link>
                                    <Link
                                        to="/vendors"
                                        className="block text-gray-700 hover:text-green-600 text-lg pl-4 border-l-4 border-green-600"
                                        onClick={toggleMenu}
                                    >
                                        Accredited Vendors
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default NavBar;
