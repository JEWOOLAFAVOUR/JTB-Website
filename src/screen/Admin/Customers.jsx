import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCustomers } from '../../api/auth';

const Customers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1); // Current page
  const pageSize = 30; // Number of items per page

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const response = await getCustomers(page, pageSize);
        setCustomers(response.data);
        setTotalCount(response.count);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [page]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = page < totalPages;

  const filteredCustomers = customers.filter((customer) =>
    customer.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          Customers
        </motion.h1>

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={() => navigate('/admin/customers/add')}
            className="bg-green-600 hover:bg-green-700 flex-shrink-0"
          >
            <Plus className="mr-2" size={20} />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      {isLoading ? (
        <p>Loading customers...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-red-500 w-full rounded-lg shadow"
        >
          {/* Make the table horizontally scrollable */}
          <div className="overflow-x-auto w-full">
            <table className="min-w-full w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">S/N</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Serial Number</th>
                  <th className="px-4 py-2 text-left">Vehicle Number</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer.id} className="border-b">
                    <td className="px-4 py-2">{(page - 1) * pageSize + index + 1}</td>
                    <td className="px-4 py-2">{customer.full_name}</td>
                    <td className="px-4 py-2">{customer.phone_number}</td>
                    <td className="px-4 py-2">{customer.serial_number}</td>
                    <td className="px-4 py-2">{customer.vehicle_number}</td>
                    <td className="px-4 py-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/customers/${customer.id}`)}
                      >
                        <Eye className="mr-2" size={16} />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages} ({totalCount} total records)
        </div>
        <Button
          disabled={!hasNextPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Customers;
