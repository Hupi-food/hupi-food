import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

interface NavItem {
    icon: string;
    label: string;
    path: string;
}

const customerNav: NavItem[] = [
    { icon: '🗺️', label: 'Explorar', path: '/app/home' },
    { icon: '🎁', label: 'Mis Cajas', path: '/app/orders' },
    { icon: '👤', label: 'Perfil', path: '/app/profile' },
];

const storeNav: NavItem[] = [
    { icon: '📊', label: 'Dashboard', path: '/store/dashboard' },
    { icon: '📦', label: 'Inventario', path: '/store/inventory' },
    { icon: '📷', label: 'Scanner', path: '/store/scanner' },
];

export const BottomNav: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const items = user?.role === 'store_owner' ? storeNav : customerNav;

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
            zIndex: 100,
            boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
        }}>
            {items.map(item => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px 16px',
                            borderRadius: '12px',
                            transition: 'all 0.15s',
                            color: isActive ? '#2D6A4F' : '#9CA3AF',
                        }}
                    >
                        <span style={{
                            fontSize: '22px',
                            filter: isActive ? 'none' : 'grayscale(60%)',
                            transform: isActive ? 'scale(1.15)' : 'scale(1)',
                            transition: 'transform 0.15s',
                        }}>
                            {item.icon}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: isActive ? 700 : 500 }}>
                            {item.label}
                        </span>
                        {isActive && (
                            <span style={{
                                width: '4px', height: '4px', borderRadius: '50%',
                                background: '#2D6A4F', marginTop: '1px',
                            }} />
                        )}
                    </button>
                );
            })}
        </nav>
    );
};
