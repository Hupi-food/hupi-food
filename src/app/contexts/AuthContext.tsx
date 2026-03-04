import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'customer' | 'store_owner' | 'super_admin';
export type StoreOwnerStatus = 'pending_approval' | 'active' | 'rejected';
export type VerificationStatus = 'pending' | 'verified';

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
    verifyEmail: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
    resendVerification: (email: string) => Promise<void>;
    isAuthenticated: boolean;
    pendingVerificationEmail: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── BASE DE DATOS INICIAL (simulada en memoria) ───────────────────────────────
// El Super Admin es el ÚNICO usuario creado directamente en la BD inicial.
// Los demás usuarios se crean a través del flujo de registro.

const DB_KEY = 'hupit_db_users';
const DB_PENDING_KEY = 'hupit_db_pending_verifications';

const SUPER_ADMIN_SEED: AuthUser & { password: string } = {
    id: 'sa_001',
    name: 'Admin Hupit',
    email: 'admin@hupit.co',
    role: 'super_admin',
    avatar: 'AH',
    emailVerified: true,
    password: 'Hupit@2026!',
};

type StoredUser = AuthUser & { password: string };
type PendingVerification = { email: string; code: string; expiresAt: number; userData: StoredUser };

function getDB(): StoredUser[] {
    try {
        const raw = localStorage.getItem(DB_KEY);
        if (raw) return JSON.parse(raw);
    } catch { /* */ }
    // Seed inicial: solo el super admin
    const seed = [SUPER_ADMIN_SEED];
    localStorage.setItem(DB_KEY, JSON.stringify(seed));
    return seed;
}

function saveDB(users: StoredUser[]) {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
}

function getPending(): PendingVerification[] {
    try {
        const raw = localStorage.getItem(DB_PENDING_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function savePending(list: PendingVerification[]) {
    localStorage.setItem(DB_PENDING_KEY, JSON.stringify(list));
}

function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateId(): string {
    return `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── PROVIDER ─────────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        try {
            const stored = localStorage.getItem('hupit_session');
            return stored ? JSON.parse(stored) : null;
        } catch { return null; }
    });

    const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
    const [allUsers, setAllUsers] = useState<AuthUser[]>(() => getDB());

    useEffect(() => {
        if (user) localStorage.setItem('hupit_session', JSON.stringify(user));
        else localStorage.removeItem('hupit_session');
    }, [user]);

    // ── Login ──────────────────────────────────────────────────────────────────
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        const db = getDB();
        const found = db.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (!found) return { success: false, error: 'Correo o contraseña incorrectos.' };
        if (!found.emailVerified) return { success: false, error: 'Debes verificar tu correo antes de iniciar sesión.' };
        if (found.role === 'store_owner' && found.storeOwnerStatus === 'pending_approval') {
            return { success: false, error: 'Tu cuenta está pendiente de aprobación por el administrador.' };
        }
        if (found.role === 'store_owner' && found.storeOwnerStatus === 'rejected') {
            return { success: false, error: 'Tu solicitud fue rechazada. Contacta al soporte.' };
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _pw, ...publicUser } = found;
        setUser(publicUser);
        return { success: true };
    };

    // ── Logout ─────────────────────────────────────────────────────────────────
    const logout = () => setUser(null);

    // ── Registro Cliente ───────────────────────────────────────────────────────
    const registerCustomer = async (data: RegisterCustomerData): Promise<{ success: boolean; error?: string }> => {
        const db = getDB();
        if (db.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
            return { success: false, error: 'Ya existe una cuenta con este correo electrónico.' };
        }

        const newUser: StoredUser = {
            id: generateId(),
            name: data.name,
            email: data.email,
            role: 'customer',
            avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            emailVerified: false,
            password: data.password,
        };

        const code = generateCode();
        const pending = getPending().filter(p => p.email !== data.email);
        pending.push({ email: data.email, code, expiresAt: Date.now() + 10 * 60 * 1000, userData: newUser });
        savePending(pending);

        // Simular envío de correo (en producción usaría un servicio real)
        console.info(`[Hupit] Código de verificación para ${data.email}: ${code}`);

        setPendingVerificationEmail(data.email);
        return { success: true };
    };

    // ── Registro Dueño de Local ────────────────────────────────────────────────
    const registerStore = async (data: RegisterStoreData): Promise<{ success: boolean; error?: string }> => {
        const db = getDB();
        if (db.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
            return { success: false, error: 'Ya existe una cuenta con este correo electrónico.' };
        }

        const newUser: StoredUser = {
            id: generateId(),
            name: data.ownerName,
            email: data.email,
            role: 'store_owner',
            avatar: data.ownerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            emailVerified: false,
            storeOwnerStatus: 'pending_approval',
            storeName: data.storeName,
            storeCategory: data.storeCategory,
            storeAddress: data.storeAddress,
            password: data.password,
        };

        const code = generateCode();
        const pending = getPending().filter(p => p.email !== data.email);
        pending.push({ email: data.email, code, expiresAt: Date.now() + 10 * 60 * 1000, userData: newUser });
        savePending(pending);

        console.info(`[Hupit] Código de verificación para local ${data.storeName} (${data.email}): ${code}`);

        setPendingVerificationEmail(data.email);
        return { success: true };
    };

    // ── Verificar Email ────────────────────────────────────────────────────────
    const verifyEmail = async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
        const pending = getPending();
        const entry = pending.find(p => p.email.toLowerCase() === email.toLowerCase());

        if (!entry) return { success: false, error: 'No hay verificación pendiente para este correo.' };
        if (Date.now() > entry.expiresAt) {
            savePending(pending.filter(p => p.email !== email));
            return { success: false, error: 'El código expiró. Solicita uno nuevo.' };
        }
        if (entry.code !== code) return { success: false, error: 'Código incorrecto. Intenta de nuevo.' };

        // Mover de pending a DB
        const newUser = { ...entry.userData, emailVerified: true };
        const db = getDB();
        db.push(newUser);
        saveDB(db);
        setAllUsers(db);
        savePending(pending.filter(p => p.email !== email));
        setPendingVerificationEmail(null);

        return { success: true };
    };

    // ── Reenviar verificación ──────────────────────────────────────────────────
    const resendVerification = async (email: string): Promise<void> => {
        const pending = getPending();
        const entry = pending.find(p => p.email.toLowerCase() === email.toLowerCase());
        if (!entry) return;

        const newCode = generateCode();
        entry.code = newCode;
        entry.expiresAt = Date.now() + 10 * 60 * 1000;
        savePending(pending);
        console.info(`[Hupit] Nuevo código para ${email}: ${newCode}`);
    };

    return (
        <AuthContext.Provider value={{
            user,
            allUsers,
            login,
            logout,
            registerCustomer,
            registerStore,
            verifyEmail,
            resendVerification,
            isAuthenticated: !!user,
            pendingVerificationEmail,
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
