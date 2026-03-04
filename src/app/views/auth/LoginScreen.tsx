import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export const LoginScreen: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const ROLE_PATHS: Record<string, string> = {
        customer: '/app/home',
        store_owner: '/store/dashboard',
        super_admin: '/admin/overview',
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) { setError('Completa todos los campos.'); return; }
        setError('');
        setIsLoading(true);
        const result = await login(email.trim().toLowerCase(), password);
        setIsLoading(false);
        if (!result.success) { setError(result.error || 'Error al iniciar sesión.'); return; }
        // La redirección la hace el propio login via useAuth → user.role
        // Leemos el user actualizado del resultado
        // Redirección diferida para que el estado se actualice
        setTimeout(() => {
            const stored = localStorage.getItem('hupit_session');
            if (stored) {
                const u = JSON.parse(stored);
                navigate(ROLE_PATHS[u.role] || '/');
            }
        }, 50);
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
            display: 'block',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '13px',
            marginBottom: '6px',
            fontWeight: 500,
        } as React.CSSProperties,
        input: {
            width: '100%',
            padding: '12px 14px',
            borderRadius: '14px',
            border: '1.5px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.07)',
            color: '#fff',
            fontSize: '15px',
            outline: 'none',
            boxSizing: 'border-box' as const,
            transition: 'border-color 0.2s',
        } as React.CSSProperties,
    };

    return (
        <div style={S.page}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '52px', marginBottom: '8px', filter: 'drop-shadow(0 4px 12px rgba(64,145,108,0.5))' }}>🎁</div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
                    Rescata comida · Gana recompensas
                </div>
            </div>

            <div style={S.card}>
                <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 6px' }}>Iniciar sesión</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: '0 0 24px' }}>
                    Ingresa con tu correo y contraseña.
                </p>

                {/* Credenciales de demo */}
                <div style={{ background: 'rgba(45,106,79,0.12)', border: '1px solid rgba(64,145,108,0.3)', borderRadius: '12px', padding: '12px 14px', marginBottom: '22px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Acceso demo — Super Admin
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', margin: 0, lineHeight: 1.6 }}>
                        Correo: <code style={{ color: '#74C69D' }}>admin@hupit.co</code><br />
                        Contraseña: <code style={{ color: '#74C69D' }}>Hupit@2026!</code>
                    </p>
                </div>

                {error && (
                    <div style={{ background: '#EF444420', border: '1px solid #EF4444', borderRadius: '12px', padding: '12px 14px', marginBottom: '18px', color: '#FCA5A5', fontSize: '13px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '14px' }}>
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
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '16px', padding: '4px' }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: isLoading ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg, #2D6A4F, #40916C)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            fontSize: '16px',
                            fontWeight: 700,
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            boxShadow: isLoading ? 'none' : '0 8px 24px rgba(45,106,79,0.4)',
                            transition: 'all 0.2s',
                        }}
                    >
                        {isLoading ? 'Verificando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" style={{ color: '#40916C', fontWeight: 600, textDecoration: 'none' }}>
                        Regístrate como cliente
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
