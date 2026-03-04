import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, type UserRole } from '../../contexts/AuthContext';

const ROLES = [
    { id: 'customer' as UserRole, label: 'Cliente', icon: '🛍️', desc: 'Explora y compra Hupit Boxes', color: '#2D6A4F', path: '/app/home' },
    { id: 'store_owner' as UserRole, label: 'Tienda', icon: '🏪', desc: 'Gestiona tu inventario y pedidos', color: '#F77F00', path: '/store/dashboard' },
    { id: 'super_admin' as UserRole, label: 'Admin', icon: '⚡', desc: 'Panel de control global', color: '#6D28D9', path: '/admin/overview' },
];

export const LoginScreen: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            login(email || 'demo@hupit.co', password || 'demo', selectedRole);
            const role = ROLES.find(r => r.id === selectedRole);
            navigate(role?.path || '/app/home');
        }, 1200);
    };

    const selectedRoleConfig = ROLES.find(r => r.id === selectedRole)!;

    return (
        <div style={{
            minHeight: '100dvh',
            background: 'linear-gradient(160deg, #1B1B2F 0%, #2D2D44 50%, #1B3A2F 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px',
            fontFamily: "'Inter', 'Outfit', sans-serif",
        }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '56px', marginBottom: '8px', filter: 'drop-shadow(0 4px 12px rgba(255,215,0,0.4))' }}>🎁</div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>
                    Hupit
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    Rescata comida · Gana recompensas
                </div>
            </div>

            {/* Card */}
            <div style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '28px',
                padding: '32px 28px',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            }}>
                {/* Role Selector */}
                <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '10px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Modo Demo — Selecciona tu rol
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {ROLES.map(role => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                style={{
                                    padding: '10px 6px',
                                    borderRadius: '14px',
                                    border: selectedRole === role.id
                                        ? `2px solid ${role.color}`
                                        : '2px solid rgba(255,255,255,0.1)',
                                    background: selectedRole === role.id
                                        ? `${role.color}22`
                                        : 'rgba(255,255,255,0.04)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s',
                                    color: selectedRole === role.id ? '#fff' : 'rgba(255,255,255,0.5)',
                                }}
                            >
                                <span style={{ fontSize: '22px' }}>{role.icon}</span>
                                <span style={{ fontSize: '11px', fontWeight: 700 }}>{role.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Role description */}
                <div style={{
                    background: `${selectedRoleConfig.color}18`,
                    border: `1px solid ${selectedRoleConfig.color}40`,
                    borderRadius: '12px',
                    padding: '10px 14px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '13px',
                }}>
                    {selectedRoleConfig.icon} {selectedRoleConfig.desc}
                </div>

                {/* Form */}
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            style={{
                                width: '100%', padding: '12px 14px', borderRadius: '14px',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                background: 'rgba(255,255,255,0.08)', color: '#fff',
                                fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>
                            Contraseña
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%', padding: '12px 44px 12px 14px', borderRadius: '14px',
                                    border: '1.5px solid rgba(255,255,255,0.15)',
                                    background: 'rgba(255,255,255,0.08)', color: '#fff',
                                    fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', opacity: 0.6,
                                }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%', padding: '14px',
                            background: isLoading
                                ? 'rgba(255,255,255,0.2)'
                                : `linear-gradient(135deg, ${selectedRoleConfig.color}, ${selectedRoleConfig.color}CC)`,
                            color: '#fff', border: 'none', borderRadius: '16px',
                            fontSize: '16px', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s', boxShadow: isLoading ? 'none' : `0 8px 24px ${selectedRoleConfig.color}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}
                    >
                        {isLoading ? (
                            <>
                                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                                Entrando...
                            </>
                        ) : (
                            `Entrar como ${selectedRoleConfig.label} ${selectedRoleConfig.icon}`
                        )}
                    </button>
                </form>

                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '20px' }}>
                    Modo demo — todos los accesos son válidos
                </p>
            </div>

            <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
        </div>
    );
};
