import React from 'react';
import { PLATFORM_STATS, ORDERS } from '../../data/mockData';
import { StatusBadge } from '../../components/shared/StatusBadge';

export const AdminOverviewScreen: React.FC = () => {
    const statsList = [
        { label: 'Usuarios Totales', value: PLATFORM_STATS.totalUsers.toLocaleString(), icon: '👥', color: '#3B82F6', change: '+12% este mes' },
        { label: 'Tiendas Activas', value: PLATFORM_STATS.activeStores, icon: '🏪', color: '#10B981', change: '+3 nuevas' },
        { label: 'Ingresos Históricos', value: `$${(PLATFORM_STATS.totalRevenue / 1000000).toFixed(1)}M`, icon: '💰', color: '#F59E0B', change: '+5% v/s mes ant.' },
        { label: 'Comprobantes Pendientes', value: PLATFORM_STATS.pendingPayments, icon: '⏳', color: '#EF4444', change: 'Requieren atención' },
    ];

    const recentActivity = ORDERS.slice(0, 5);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1B1B2F', margin: '0 0 8px' }}>Visión Global</h1>
                    <p style={{ color: '#717182', margin: 0 }}>Métricas de rendimiento en tiempo real</p>
                </div>
                <div>
                    <button style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#374151', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <span>📅</span> Últimos 30 días <span>▾</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {statsList.map(stat => (
                    <div key={stat.label} style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                {stat.icon}
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#10B981', background: '#D1FAE5', padding: '4px 8px', borderRadius: '8px' }}>
                                {stat.change}
                            </div>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 800, color: '#1B1B2F', margin: '0 0 4px', letterSpacing: '-0.5px' }}>{stat.value}</div>
                        <div style={{ fontSize: '14px', color: '#717182', fontWeight: 500 }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Recent Orders table */}
                <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px', color: '#1B1B2F' }}>Transacciones Recientes</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
                                <th style={{ padding: '0 12px 12px', color: '#9CA3AF', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase' }}>Cliente / Tienda</th>
                                <th style={{ padding: '0 12px 12px', color: '#9CA3AF', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase' }}>Monto</th>
                                <th style={{ padding: '0 12px 12px', color: '#9CA3AF', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase' }}>Estado</th>
                                <th style={{ padding: '0 12px 12px', color: '#9CA3AF', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', textAlign: 'right' }}>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                                    <td style={{ padding: '16px 12px' }}>
                                        <div style={{ fontWeight: 600, color: '#1B1B2F', fontSize: '14px' }}>{order.customerName}</div>
                                        <div style={{ color: '#6B7280', fontSize: '13px' }}>{order.storeName}</div>
                                    </td>
                                    <td style={{ padding: '16px 12px', fontWeight: 700, color: '#111827', fontSize: '14px' }}>
                                        ${order.price.toLocaleString('es-CO')}
                                    </td>
                                    <td style={{ padding: '16px 12px' }}>
                                        <StatusBadge status={order.status} size="sm" />
                                    </td>
                                    <td style={{ padding: '16px 12px', color: '#6B7280', fontSize: '13px', textAlign: 'right' }}>
                                        {order.createdAt.split('T')[0]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Quick Impact Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #2D6A4F, #40916C)', borderRadius: '24px', padding: '24px', color: '#fff', boxShadow: '0 12px 24px rgba(45,106,79,0.3)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px', color: 'rgba(255,255,255,0.9)' }}>Impacto Hupit Hoy 🌍</h3>
                        <div style={{ fontSize: '48px', fontWeight: 900, marginBottom: '8px', lineHeight: 1 }}>{PLATFORM_STATS.boxesSavedToday}</div>
                        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>Cajas rescatadas del desperdicio</div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '75%', background: '#fff', borderRadius: '3px' }} />
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '8px', textAlign: 'right' }}>75% de la meta diaria</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
