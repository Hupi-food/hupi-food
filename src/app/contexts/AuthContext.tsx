import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

// ─── Tipos ──────────────────────────────────────────────────────────────────

export type UserRole = 'customer' | 'store_owner' | 'super_admin';
export type StoreOwnerStatus = 'pending_approval' | 'active' | 'rejected';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    storeOwnerStatus?: StoreOwnerStatus;
    emailVerified?: boolean;
    storeName?: string;
    storeCategory?: string;
    storeAddress?: string;
}

interface RegisterCustomerData {
    name: string;
    email: string;
    password: string;
}

interface RegisterStoreData {
    ownerName: string;
    email: string;
    password: string;
    storeName: string;
    storeCategory: string;
    storeAddress: string;
    phone: string;
}

interface AuthContextType {
    user: AuthUser | null;
    allUsers: AuthUser[];
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    registerCustomer: (data: RegisterCustomerData) => Promise<{ success: boolean; error?: string }>;
    registerStore: (data: RegisterStoreData) => Promise<{ success: boolean; error?: string }>;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Helpers ────────────────────────────────────────────────────────────────

function translateAuthError(error: AuthError): string {
    const msg = error.message.toLowerCase();
    if (msg.includes('invalid login credentials')) return 'Correo o contraseña incorrectos.';
    if (msg.includes('email not confirmed')) return 'Debes verificar tu correo antes de iniciar sesión.';
    if (msg.includes('user already registered')) return 'Ya existe una cuenta con este correo electrónico.';
    if (msg.includes('password') && msg.includes('at least')) return 'La contraseña debe tener al menos 6 caracteres.';
    if (msg.includes('rate limit')) return 'Demasiados intentos. Espera un momento antes de intentar de nuevo.';
    if (msg.includes('network')) return 'Error de red. Verifica tu conexión a internet.';
    return error.message;
}

function makeAvatar(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

async function fetchProfile(userId: string): Promise<AuthUser | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error || !data) return null;

    return {
        id: data.id,
        name: data.name || '',
        email: data.email || '',
        role: (data.role as UserRole) || 'customer',
        avatar: data.avatar || makeAvatar(data.name || ''),
        storeOwnerStatus: data.store_owner_status as StoreOwnerStatus | undefined,
        emailVerified: true,
        storeName: data.store_name,
        storeCategory: data.store_category,
        storeAddress: data.store_address,
    };
}

// ─── Provider ───────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [allUsers, setAllUsers] = useState<AuthUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // ── Cargar perfil desde sesión de Supabase ───────────────────────────────
    const loadUserFromSession = useCallback(async (session: Session | null) => {
        if (!session?.user) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        const profile = await fetchProfile(session.user.id);

        if (profile) {
            // Verificar bloqueos para store_owner
            if (profile.role === 'store_owner' && profile.storeOwnerStatus === 'rejected') {
                setUser(null);
            } else {
                setUser(profile);
            }
        } else {
            // Perfil no encontrado — usar datos básicos de auth
            setUser({
                id: session.user.id,
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
                email: session.user.email || '',
                role: (session.user.user_metadata?.role as UserRole) || 'customer',
                avatar: makeAvatar(session.user.user_metadata?.name || session.user.email || ''),
                emailVerified: !!session.user.email_confirmed_at,
            });
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Obtener sesión inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            loadUserFromSession(session);
        });

        // Escuchar cambios de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                loadUserFromSession(session);
            }
        );

        return () => subscription.unsubscribe();
    }, [loadUserFromSession]);

    // ── Cargar todos los usuarios (para Admin) ───────────────────────────────
    useEffect(() => {
        if (user?.role === 'super_admin') {
            supabase
                .from('profiles')
                .select('*')
                .then(({ data }) => {
                    if (data) {
                        setAllUsers(data.map((p: Record<string, unknown>) => ({
                            id: p.id as string,
                            name: (p.name as string) || '',
                            email: (p.email as string) || '',
                            role: (p.role as UserRole) || 'customer',
                            avatar: makeAvatar((p.name as string) || ''),
                            storeOwnerStatus: p.store_owner_status as StoreOwnerStatus | undefined,
                            emailVerified: true,
                            storeName: p.store_name as string | undefined,
                            storeCategory: p.store_category as string | undefined,
                            storeAddress: p.store_address as string | undefined,
                        })));
                    }
                });
        }
    }, [user?.role]);

    // ── Login ────────────────────────────────────────────────────────────────
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) return { success: false, error: translateAuthError(error) };

        // onAuthStateChange se encargará de actualizar el user
        return { success: true };
    };

    // ── Logout ───────────────────────────────────────────────────────────────
    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    // ── Registro Cliente ─────────────────────────────────────────────────────
    const registerCustomer = async (data: RegisterCustomerData): Promise<{ success: boolean; error?: string }> => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name,
                    role: 'customer',
                },
            },
        });

        if (authError) return { success: false, error: translateAuthError(authError) };

        // Crear perfil en la tabla profiles
        if (authData.user) {
            const { error: profileError } = await supabase.from('profiles').insert({
                id: authData.user.id,
                name: data.name,
                email: data.email,
                role: 'customer',
                avatar: makeAvatar(data.name),
            });

            if (profileError) {
                console.error('[Hupit] Error creando perfil:', profileError.message);
            }
        }

        return { success: true };
    };

    // ── Registro Dueño de Local ──────────────────────────────────────────────
    const registerStore = async (data: RegisterStoreData): Promise<{ success: boolean; error?: string }> => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.ownerName,
                    role: 'store_owner',
                },
            },
        });

        if (authError) return { success: false, error: translateAuthError(authError) };

        // Crear perfil con estado pendiente de aprobación
        if (authData.user) {
            const { error: profileError } = await supabase.from('profiles').insert({
                id: authData.user.id,
                name: data.ownerName,
                email: data.email,
                role: 'store_owner',
                avatar: makeAvatar(data.ownerName),
                store_owner_status: 'pending_approval',
                store_name: data.storeName,
                store_category: data.storeCategory,
                store_address: data.storeAddress,
                phone: data.phone,
            });

            if (profileError) {
                console.error('[Hupit] Error creando perfil de local:', profileError.message);
            }
        }

        return { success: true };
    };

    return (
        <AuthContext.Provider value={{
            user,
            allUsers,
            login,
            logout,
            registerCustomer,
            registerStore,
            isAuthenticated: !!user,
            isLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
