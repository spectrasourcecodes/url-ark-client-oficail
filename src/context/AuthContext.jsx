// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axios';

console.log('✅ AuthContext file loaded!');

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Map wallet.kyc (boolean) -> kycStatus (string used by the UI)
const mapKyc = (walletKyc) => (walletKyc ? 'approved' : 'pending');

export const AuthProvider = ({ children }) => {
    console.log('✅ AuthProvider rendering!');

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [kycStatus, setKycStatus] = useState('pending');

    // 🔹 New: read the real KYC flag from the backend
    const refreshKycStatus = useCallback(async () => {
        try {
            const { data } = await axiosInstance.get('/api/user/dashboard');
            const walletKyc = data?.wallet?.kyc ?? false;
            const status = mapKyc(walletKyc);
            setKycStatus(status);
            return status;
        } catch (err) {
            console.error('❌ Failed to refresh KYC status:', err);
            // keep the current value on failure
            return kycStatus;
        }
    }, [kycStatus]);

    useEffect(() => {
        console.log('✅ AuthProvider useEffect running!');
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setIsAuthenticated(true);
                console.log('✅ User restored from localStorage:', parsedUser);

                // 🔹 Fetch the real KYC status right away
                refreshKycStatus();
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, [refreshKycStatus]);

    const login = async (email, password) => {
        try {
            const { data } = await axiosInstance.post('/api/user/login', { email, password });

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);

                // 🔹 Sync KYC immediately after login
                refreshKycStatus();

                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('❌ Login error:', error);
            const message = error.response?.data?.message || 'Login failed';
            return { success: false, message };
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await axiosInstance.post('/api/user/register', userData);

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);

                // 🔹 New accounts default to pending; still refresh to be safe
                refreshKycStatus();

                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('❌ Register error:', error);
            const message = error.response?.data?.message || 'Registration failed';
            return { success: false, message };
        }
    };

    const logout = () => {
        console.log('✅ Logout called!');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setKycStatus('pending');
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        kycStatus,
        setKycStatus,
        refreshKycStatus, // 🔹 exposed so any page can re-sync
        login,
        register,
        logout,
        updateUser: (userData) => {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};