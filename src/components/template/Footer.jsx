import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#475569] text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* First Column */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            About Single Inter-State Road Tax Sticker
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            The Single Interstate Road Tax Sticker is an E-Sticker
                            designed to capture all vehicles that perform inter-state
                            haulages in the country. This is with a view of
                            providing adequate social security and combating
                            multiple taxation for inter-state haulages throughout
                            the country.
                        </p>
                    </div>

                    {/* Second Column */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            Information Link
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-white">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="text-gray-300 hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Third Column */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            Contact Details
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-gray-300">
                                <a href="mailto:info@jtb-sirts.com" className="hover:text-white">
                                    info@jtb-sirts.com
                                </a>
                            </li>
                            <li className="text-gray-300">
                                <a href="https://www.jtb-sirts.com" className="hover:text-white">
                                    www.jtb-sirts.com
                                </a>
                            </li>
                            <li className="text-gray-300">
                                12 Sokode Street, Wuse Zone 5, Abuja
                            </li>
                            <li className="text-gray-300">
                                +234 806 455 9460
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-600 text-center">
                    <p className="text-gray-300">
                        © 2025 JTB-SIRTS. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;