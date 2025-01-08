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
    const { data, error } = await supabase
        .from('Customers')
        .select('*') // Adjust columns if needed
        .range((page - 1) * pageSize, page * pageSize - 1); // Fetch records for the page

    if (error) {
        console.error('Error fetching customers:', error.message);
        throw error;
    }
    return data;
};
