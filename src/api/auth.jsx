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
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (error) {
        console.error('Error logging out:', error.message)
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    } catch (error) {
        console.error('Error getting user:', error.message)
        return null
    }
}

// customers

export const addCustomer = async (customerData) => {
    const { data, error } = await supabase
        .from('Customers')
        .insert([
            {
                full_name: customerData.fullName,
                email: customerData.email,
                phone_number: customerData.phoneNumber,
                address: customerData.address,
                vehicle_number: customerData.licensePlate,
            },
        ]);

    if (error) {
        console.error('Error adding customer:', error.message);
        throw error;
    }
    return data;
};

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