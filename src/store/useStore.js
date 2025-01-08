import { create } from 'zustand'

export const useStore = create((set) => ({
    customer: null,
    token: null,
    user: null,
    isLoading: false,
    error: null,
    setCustomer: (customer) => set({ customer, error: null }),
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error, customer: null }),
    clearStore: () => set({ customer: null, user: null, error: null, isLoading: false, token: null }),
}))

