// screen/Auth/GetESticker.jsx
import React from 'react';
import Navbar from '../../components/template/Navbar';
import Footer from '../../components/template/Footer';

const GetESticker = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <section className="bg-gray-100 py-20">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold mb-8 text-center">Get Your E-Sticker</h1>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                                    <select id="vehicleType" name="vehicleType" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" required>
                                        <option value="">Select vehicle type</option>
                                        <option value="car">Car</option>
                                        <option value="motorcycle">Motorcycle</option>
                                        <option value="truck">Truck</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700">Plate Number</label>
                                    <input type="text" id="plateNumber" name="plateNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" required />
                                </div>
                                <div>
                                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner's Name</label>
                                    <input type="text" id="ownerName" name="ownerName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" required />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" id="phoneNumber" name="phoneNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" required />
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Get E-Sticker</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default GetESticker;