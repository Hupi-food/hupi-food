import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'customer' | 'store_owner' | 'super_admin';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    login: (email: string, password: string, role: UserRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: Record<UserRole, AuthUser> = {
    customer: {
        id: 'c1',
        name: 'Valentina Gómez',
        email: 'valentina@email.com',
        role: 'customer',
        avatar: 'VG',
    },
    store_owner: {
        id: 's1',
        name: 'Panadería El Sol',
        email: 'panaderia@email.com',
        role: 'store_owner',
        avatar: 'PS',
    },
    super_admin: {
        id: 'a1',
        name: 'Admin Hupit',
        email: 'admin@hupit.co',
        role: 'super_admin',
        avatar: 'AH',
    },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        try {
            const stored = localStorage.getItem('hupit_user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('hupit_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('hupit_user');
        }
    }, [user]);

    const login = (_email: string, _password: string, role: UserRole) => {
        setUser(DEMO_USERS[role]);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
