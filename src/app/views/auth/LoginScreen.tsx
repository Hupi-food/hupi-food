import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const ROLE_PATH: Record<string, string> = {
    customer: '/app/home',
    store_owner: '/store/dashboard',
    super_admin: '/admin/overview',
};

export const LoginScreen: React.FC = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Si ya está autenticado, redirigir
    React.useEffect(() => {
        if (user) {
            navigate(ROLE_PATH[user.role] || '/app/home', { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Ingresa tu correo y contraseña.');
            return;
        }
        setIsLoading(true);
        const result = await login(email.trim().toLowerCase(), password);
        setIsLoading(false);
        if (!result.success) {
            setError(result.error || 'Error al iniciar sesión.');
        }
        // La redirección ocurre automáticamente vía useEffect + onAuthStateChange
    };

    const S = {
        page: {
            minHeight: '100dvh',
            background: 'linear-gradient(160deg, #0A0E27 0%, #1B2A1F 100%)',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px',
            fontFamily: "'Inter', sans-serif",
        },
        card: {
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '28px',
            padding: '36px 28px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        },
        label: {
            display: 'block', color: 'rgba(255,255,255,0.7)',
            fontSize: '13px', marginBottom: '6px', fontWeight: 500,
        } as React.CSSProperties,
        input: {
            width: '100%', padding: '12px 14px', borderRadius: '14px',
            border: '1.5px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.07)', color: '#fff',
            fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const,
        } as React.CSSProperties,
        btn: {
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
            color: '#fff', border: 'none', borderRadius: '16px',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(45,106,79,0.4)',
            transition: 'opacity 0.2s',
        } as React.CSSProperties,
    };

    return (
        <div style={S.page}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '52px', marginBottom: '8px' }}>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ display: 'inline-block' }}>
                        <circle cx="28" cy="28" r="28" fill="rgba(45,106,79,0.3)" />
                        <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fontSize="28" fill="#40916C">H</text>
                    </svg>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
                    Rescata comida · Gana recompensas
                </div>
            </div>

            <div style={S.card}>
                <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: '0 0 6px' }}>
                    Iniciar sesión
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: '0 0 28px' }}>
                    Ingresa con tu correo y contraseña registrados.
                </p>

                {error && (
                    <div style={{
                        background: '#EF444420', border: '1px solid #EF4444',
                        borderRadius: '12px', padding: '12px 14px', marginBottom: '18px',
                        color: '#FCA5A5', fontSize: '13px',
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={S.label}>Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setError(''); }}
                            placeholder="tu@email.com"
                            autoComplete="email"
                            style={S.input}
                        />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={S.label}>Contraseña</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => { setPassword(e.target.value); setError(''); }}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                style={{ ...S.input, paddingRight: '44px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                style={{
                                    position: 'absolute', right: '12px', top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: 'rgba(255,255,255,0.5)', padding: '4px',
                                }}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{ ...S.btn, opacity: isLoading ? 0.6 : 1 }}
                    >
                        {isLoading ? 'Verificando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" style={{ color: '#40916C', fontWeight: 600, textDecoration: 'none' }}>
                        Regístrate
                    </Link>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link to="/register/store" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textDecoration: 'none' }}>
                        ¿Eres dueño de un local? Regístrate aquí
                    </Link>
                </div>
            </div>

            <style>{`input::placeholder { color: rgba(255,255,255,0.25); }`}</style>
        </div>
    );
};
