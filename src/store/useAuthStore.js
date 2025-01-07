import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            user: {},
            token: "",
            setUser: (user) => set(() => ({ user })),
            setToken: (token) => set(() => ({ token })),
            clearAuth: () => set(() => ({ user: null, token: null })),
        }),
        {
            name: 'auth-storage', // unique name for localStorage key
        }
    )
)

export default useAuthStore