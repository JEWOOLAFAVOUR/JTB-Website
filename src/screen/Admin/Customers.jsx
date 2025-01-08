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
  const [page, setPage] = useState(1);
  const pageSize = 30;

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
    <div className="p-4 md:p-6 max-w-[100vw] overflow-hidden">
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
          <div className="relative flex-1 sm:max-w-md">
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
        <div className="w-full flex justify-center py-8">
          <p>Loading customers...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full rounded-lg shadow bg-white"
        >
          <div className="w-full overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">S/N</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Serial Number</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Vehicle Number</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {(page - 1) * pageSize + index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {customer.full_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {customer.phone_number}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {customer.serial_number}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {customer.vehicle_number}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/customers/${customer.id}`)}
                          className="text-gray-700 hover:text-gray-900"
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
          </div>
        </motion.div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>
        <div className="text-sm text-gray-600 text-center">
          Page {page} of {totalPages} ({totalCount} total records)
        </div>
        <Button
          disabled={!hasNextPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Customers;

