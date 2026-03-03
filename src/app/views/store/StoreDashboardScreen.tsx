import React from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../../components/shared/BottomNav';
import { HUPI_BOXES, ORDERS } from '../../data/mockData';

export const StoreDashboardScreen: React.FC = () => {
    const navigate = useNavigate();
    const storeBoxes = HUPI_BOXES.filter(b => b.storeId === 's1');
    const storeOrders = ORDERS.filter(o => o.storeId === 's1');
    const pendingOrders = storeOrders.filter(o => o.status === 'pending');
    const todayRevenue = storeOrders.filter(o => o.status === 'approved').reduce((acc, o) => acc + o.price, 0);

    const stats = [
        { label: 'Cajas activas', value: storeBoxes.filter(b => b.isAvailable).length, icon: '📦', color: '#2D6A4F', bg: '#D1FAE5' },
        { label: 'Pedidos pendientes', value: pendingOrders.length, icon: '⏳', color: '#B45309', bg: '#FEF3C7' },
        { label: 'Ingresos hoy', value: `$${todayRevenue.toLocaleString('es-CO')}`, icon: '💰', color: '#1D4ED8', bg: '#DBEAFE' },
        { label: 'Pedidos totales', value: storeOrders.length, icon: '📋', color: '#6D28D9', bg: '#EDE9FE' },
    ];

    return (
        <div style={{ minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif", paddingBottom: '90px' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #F77F00, #FCBF49)', padding: '52px 20px 28px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', marginBottom: '4px' }}>Panel de Tienda</div>
                <h1 style={{ color: '#1B1B2F', fontSize: '22px', fontWeight: 800, margin: '0 0 4px' }}>Panadería El Sol 🏪</h1>
                <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', margin: 0 }}>Calle 72 #10-45, Bogotá</p>
            </div>

            <div style={{ padding: '20px' }}>
                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                    {stats.map(s => (
                        <div key={s.label} style={{ background: '#fff', borderRadius: '18px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '10px' }}>
                                {s.icon}
                            </div>
                            <div style={{ fontSize: '22px', fontWeight: 900, color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: '12px', color: '#717182', marginTop: '2px' }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Quick actions */}
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1B1B2F', margin: '0 0 12px' }}>Acciones rápidas</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {[
                        { label: 'Gestionar inventario', icon: '📦', path: '/store/inventory', color: '#2D6A4F' },
                        { label: 'Escanear QR de retiro', icon: '📷', path: '/store/scanner', color: '#F77F00' },
                    ].map(action => (
                        <button
                            key={action.path}
                            onClick={() => navigate(action.path)}
                            style={{
                                width: '100%', padding: '16px 20px',
                                background: '#fff', border: `2px solid ${action.color}20`,
                                borderRadius: '16px', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '14px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.15s',
                                textAlign: 'left',
                            }}
                        >
                            <span style={{ fontSize: '28px', background: `${action.color}15`, borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{action.icon}</span>
                            <span style={{ fontSize: '16px', fontWeight: 700, color: action.color }}>{action.label}</span>
                            <span style={{ marginLeft: 'auto', color: '#D1D5DB', fontSize: '18px' }}>›</span>
                        </button>
                    ))}
                </div>

                {/* Recent orders */}
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1B1B2F', margin: '0 0 12px' }}>Pedidos recientes</h3>
                <div style={{ background: '#fff', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                    {storeOrders.length === 0 ? (
                        <div style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF' }}>Sin pedidos aún</div>
                    ) : (
                        storeOrders.slice(0, 4).map((order, i) => (
                            <div key={order.id} style={{ padding: '14px 18px', borderBottom: i < storeOrders.length - 1 ? '1px solid #F9FAFB' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1B1B2F' }}>{order.customerName}</div>
                                    <div style={{ fontSize: '13px', color: '#717182' }}>Caja {order.boxTier} · ⏰ {order.pickupStart}</div>
                                </div>
                                <div>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                                        background: order.status === 'approved' ? '#D1FAE5' : '#FEF3C7',
                                        color: order.status === 'approved' ? '#065F46' : '#92400E',
                                    }}>
                                        {order.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <BottomNav />
        </div>
    );
};
