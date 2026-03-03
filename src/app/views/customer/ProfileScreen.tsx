import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { BottomNav } from '../../components/shared/BottomNav';
import { ORDERS } from '../../data/mockData';
import { StatusBadge } from '../../components/shared/StatusBadge';

export const ProfileScreen: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const userOrders = ORDERS.filter(o => o.customerId === 'c1');

    return (
        <div style={{ minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif", paddingBottom: '90px' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #2D6A4F, #40916C)', padding: '52px 20px 40px', textAlign: 'center' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#fff', border: '3px solid rgba(255,255,255,0.4)', margin: '0 auto 12px' }}>
                    {user?.avatar}
                </div>
                <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, margin: '0 0 4px' }}>{user?.name}</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>{user?.email}</p>
            </div>

            <div style={{ padding: '20px' }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                    {[
                        { label: 'Pedidos', value: userOrders.length, icon: '📦' },
                        { label: 'Aprobados', value: userOrders.filter(o => o.status === 'approved').length, icon: '✅' },
                        { label: 'Ahorrado', value: '$30K', icon: '💰' },
                    ].map(stat => (
                        <div key={stat.label} style={{ background: '#fff', borderRadius: '16px', padding: '16px 8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: '22px', marginBottom: '4px' }}>{stat.icon}</div>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1B1B2F' }}>{stat.value}</div>
                            <div style={{ fontSize: '11px', color: '#717182' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Recent orders */}
                <div style={{ background: '#fff', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '16px' }}>
                    <div style={{ padding: '16px 18px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#1B1B2F' }}>Pedidos recientes</span>
                        <button onClick={() => navigate('/app/orders')} style={{ background: 'none', border: 'none', color: '#2D6A4F', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>Ver todos</button>
                    </div>
                    {userOrders.slice(0, 3).map(order => (
                        <div key={order.id} style={{ padding: '14px 18px', borderBottom: '1px solid #F9FAFB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '14px', color: '#1B1B2F' }}>{order.storeName}</div>
                                <StatusBadge status={order.status} size="sm" />
                            </div>
                            <div style={{ fontWeight: 700, color: '#2D6A4F' }}>${order.price.toLocaleString('es-CO')}</div>
                        </div>
                    ))}
                </div>

                {/* Logout */}
                <button
                    onClick={() => { logout(); navigate('/login'); }}
                    style={{ width: '100%', padding: '14px', background: '#FEE2E2', color: '#7F1D1D', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
                >
                    Cerrar sesión
                </button>
            </div>

            <BottomNav />
        </div>
    );
};
