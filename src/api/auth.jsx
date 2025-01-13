import { sendToast } from '../components/utilis';
import { useStore } from '../store/useStore';
import { supabase } from './client';


export const loginUser = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error

        return data
    } catch (error) {
        console.error('Error logging in:', error.message)
        throw error
    }
};

export const logoutUser = async () => {
    const { clearStore } = useStore.getState();

    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        clearStore(); // Clear token and other state from Zustand store
        sendToast('success', 'Logged out successfully');
    } catch (error) {
        console.error('Error logging out:', error.message);
        sendToast('error', 'Logout failed.');
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    } catch (error) {
        console.error('Error getting user:', error.message)
        return null
    }
}

export const getUsers = async () => {
    const { data, error, count } = await supabase
        .from('Users')
        .select('*', { count: 'exact' });

    if (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }

    return {
        data,
        count
    };
};


// customers
const generateVerificationLink = (state) => {
    const year = new Date().getFullYear();
    const stateCode = state ? state.toUpperCase() : 'UNK';
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return `JTB/${year}/${stateCode}/${randomNumber}`;
};


const generateSerialNumber = async (state) => {
    const year = new Date().getFullYear();
    const stateCode = state ? state.toUpperCase() : 'UNK';

    // Fetch the last serial number from the database
    const { data: customers, error } = await supabase
        .from('Customers')
        .select('serial_number')
        .order('id', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error fetching last serial number:', error.message);
        throw error;
    }

    // Extract the last serial number and increment it
    let lastSerialNumber = 50000; // Default start value
    if (customers && customers.length > 0) {
        const lastSerial = customers[0].serial_number;
        const match = lastSerial.match(/\/(\d{5,})$/); // Extract the number part at the end
        if (match) {
            lastSerialNumber = parseInt(match[1], 10); // Parse the number
        }
    }

    const newSerialNumber = lastSerialNumber + 1;
    return newSerialNumber
};

export const addCustomer = async (customerData) => {
    try {
        // Generate the serial number
        const serialNumber = customerData.serial_number || await generateSerialNumber(customerData.state);

        const verificationUrl = generateVerificationLink(customerData.state);

        console.log({ verificationUrl });

        // Prepare the customer data, using empty string for null values
        const customerDataToInsert = {
            full_name: customerData.fullName || '',
            email: customerData.email || '',
            phone_number: customerData.phoneNumber || '',
            address: customerData.address || '',
            vehicle_number: customerData.licensePlate || '',
            serial_number: serialNumber,
            vehicle_type: customerData.vehicleType || '',
            state: customerData.state || '',
            lga: customerData.lga || '',
            tyres: customerData.tyres || '',
            verification_url: verificationUrl,
        };

        console.log({ customerDataToInsert });

        // Save the customer data to the database
        const { data, error } = await supabase
            .from('Customers')
            .insert([customerDataToInsert]);

        if (error) {
            console.error('Error adding customer:', error.message);
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error in addCustomer:', error.message);
        throw error;
    }
};


// export const addCustomer = async (customerData) => {
//     const { data, error } = await supabase
//         .from('Customers')
//         .insert([
//             {
//                 full_name: customerData.fullName,
//                 email: customerData.email,
//                 phone_number: customerData.phoneNumber,
//                 address: customerData.address,
//                 vehicle_number: customerData.licensePlate,
//                 serial_number: customerData.serial_number,
//                 vehicle_type: customerData.vehicleType,
//                 state: customerData.state,
//                 lga: customerData.lga,
//                 tyres: customerData.tyres,
//                 vehicle_type: customerData.vehicleType,
//             },
//         ]);

//     if (error) {
//         console.error('Error adding customer:', error.message);
//         throw error;
//     }
// return data;
// };

// Fetch customers
export const getCustomers = async (page, pageSize) => {
    // Get the data with count
    const { data, error, count } = await supabase
        .from('Customers')
        .select('*', { count: 'exact' })
        .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
        console.error('Error fetching customers:', error.message);
        throw error;
    }

    return {
        data,
        count
    };
};


// Get single customer by ID
export const getCustomerById = async (customerId) => {
    const { data, error } = await supabase
        .from('Customers')
        .select('*')
        .eq('id', customerId)
        .single();

    if (error) {
        console.error('Error fetching customer:', error.message);
        throw error;
    }
    return data;
};

// Update customer
export const updateCustomer = async (customerId, customerData) => {
    const { data, error } = await supabase
        .from('Customers')
        .update({
            full_name: customerData.name,
            email: customerData.email,
            phone_number: customerData.phone,
            address: customerData.address,
            tin_number: customerData.tinNumber,
            vehicle_number: customerData.vehicleLicensePlate,
            vehicle_type: customerData.vehicleType,
            number_of_tyres: customerData.numberOfTyres,
            state: customerData.state,
            lga_of_origin: customerData.lgaOfOrigin
        })
        .eq('id', customerId);

    if (error) {
        console.error('Error updating customer:', error.message);
        throw error;
    }
    return data;
};

// Delete customer
export const deleteCustomer = async (customerId) => {
    const { data, error } = await supabase
        .from('Customers')
        .delete()
        .eq('id', customerId);

    if (error) {
        console.error('Error deleting customer:', error.message);
        throw error;
    }
    return data;
};

//  Function to check if a serial number already exists
const checkSerialNumberExists = async (serialNumber) => {
    try {
        const { data, error } = await supabase
            .from('Customers')
            .select('serial_number')
            .eq('serial_number', serialNumber)
            .single();  // Expecting a single row if exists

        if (error) {
            console.error('Error checking serial number:', error.message);
            throw error;
        }

        // If data is returned, it means the serial number exists
        return data ? true : false;
    } catch (error) {
        console.error('Error in checkSerialNumberExists:', error.message);
        throw error;
    }
};


// stickers 

export const verifySticker = async (serialNumber) => {
    const { data, error } = await supabase
        .from('Customers') // Replace with your actual table name
        .select('*')
        .eq('serial_number', serialNumber)
        .single(); // Ensure only one record is fetched

    if (error) {
        console.error('Error verifying sticker:', error.message);
        throw error;
    }

    return data;
};
