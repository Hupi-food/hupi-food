import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const NAV_ITEMS = [
    { id: 'overview', icon: '📊', label: 'Dashboard', path: '/admin/overview' },
    { id: 'payments', icon: '💸', label: 'Caja y Pagos', path: '/admin/payments' },
    { id: 'users', icon: '👥', label: 'Usuarios', path: '/admin/users' },
    { id: 'stores', icon: '🏪', label: 'Tiendas', path: '/admin/stores' },
    { id: 'security', icon: '🛡️', label: 'Seguridad', path: '/admin/security' },
];

export const AdminLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{ display: 'flex', minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif" }}>
            {/* Sidebar Navigation */}
            <aside style={{
                width: '260px',
                background: '#1B1B2F',
                display: 'flex', flexDirection: 'column',
                color: '#fff',
                position: 'sticky', top: 0, height: '100dvh',
            }}>
                {/* Logo */}
                <div style={{ padding: '32px 24px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '32px', filter: 'drop-shadow(0 2px 8px rgba(255,215,0,0.3))' }}>🎁</span>
                        <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px' }}>Hupit<span style={{ color: '#F77F00' }}>Admin</span></span>
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {NAV_ITEMS.map(item => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '14px',
                                    width: '100%', padding: '12px 16px',
                                    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    border: 'none', borderRadius: '12px',
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                                    fontSize: '15px', fontWeight: isActive ? 700 : 500,
                                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                                }}
                            >
                                <span style={{ fontSize: '20px', filter: isActive ? 'none' : 'grayscale(100%) opacity(0.5)' }}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* User profile */}
                <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                            {user?.avatar}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.email}</div>
                        </div>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        style={{ width: '100%', padding: '10px', background: 'rgba(239,68,68,0.15)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Top Header */}
                <header style={{
                    height: '72px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 32px', position: 'sticky', top: 0, zIndex: 10,
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1B1B2F', margin: 0 }}>
                        {NAV_ITEMS.find(n => location.pathname.startsWith(n.path))?.label || 'Panel'}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button style={{ background: '#F3F4F6', border: 'none', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', fontSize: '18px' }}>🔔</button>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#2D6A4F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                            {user?.avatar}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
