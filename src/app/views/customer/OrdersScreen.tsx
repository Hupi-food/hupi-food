import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ORDERS } from '../../data/mockData';
import { TierBadge } from '../../components/shared/TierBadge';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { QRDisplay } from '../../components/shared/QRDisplay';
import { BottomNav } from '../../components/shared/BottomNav';

export const OrdersScreen: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    const userOrders = ORDERS.filter(o => o.customerId === 'c1');
    const pending = userOrders.filter(o => o.status === 'pending');
    const approved = userOrders.filter(o => o.status === 'approved');
    const displayed = activeTab === 'pending' ? pending : approved;

    const selected = selectedOrder ? userOrders.find(o => o.id === selectedOrder) : null;

    return (
        <div style={{ minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif", paddingBottom: '90px' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #1B1B2F, #2D2D44)', padding: '52px 20px 24px' }}>
                <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, margin: '0 0 4px' }}>Mis Pedidos 🎁</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Sigue el estado de tus Hupit Boxes</p>
            </div>

            {/* Tabs */}
            <div style={{ padding: '16px 20px 0', display: 'flex', gap: '10px' }}>
                {[
                    { id: 'pending', label: `Pendientes (${pending.length})`, icon: '⏳' },
                    { id: 'approved', label: `Aprobados (${approved.length})`, icon: '✅' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        style={{
                            flex: 1, padding: '10px 8px', borderRadius: '14px',
                            border: activeTab === tab.id ? '2px solid #2D6A4F' : '2px solid transparent',
                            background: activeTab === tab.id ? '#2D6A4F' : '#fff',
                            color: activeTab === tab.id ? '#fff' : '#717182',
                            fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                            transition: 'all 0.15s',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                        }}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Orders list */}
            <div style={{ padding: '16px 20px' }}>
                {displayed.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9CA3AF' }}>
                        <div style={{ fontSize: '56px', marginBottom: '12px' }}>
                            {activeTab === 'pending' ? '⏳' : '🎊'}
                        </div>
                        <h3 style={{ fontWeight: 700, color: '#6B7280', margin: '0 0 8px' }}>
                            {activeTab === 'pending' ? 'Sin pedidos pendientes' : '¡Sin pedidos aprobados aún!'}
                        </h3>
                        <p style={{ fontSize: '14px', margin: '0 0 20px' }}>
                            {activeTab === 'pending' ? 'Tus comprobantes revisados aparecerán aquí' : 'Cuando aprueban tu pago, el QR aparece aquí'}
                        </p>
                        {activeTab === 'pending' && (
                            <button
                                onClick={() => navigate('/app/home')}
                                style={{ padding: '12px 24px', background: '#2D6A4F', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                            >
                                🎁 Explorar cajas
                            </button>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {displayed.map(order => (
                            <div
                                key={order.id}
                                onClick={() => setSelectedOrder(order.id === selectedOrder ? null : order.id)}
                                style={{
                                    background: '#fff', borderRadius: '18px',
                                    padding: '18px', cursor: 'pointer',
                                    boxShadow: selectedOrder === order.id ? '0 4px 20px rgba(45,106,79,0.2)' : '0 2px 10px rgba(0,0,0,0.06)',
                                    border: selectedOrder === order.id ? '2px solid #2D6A4F' : '2px solid transparent',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                    <TierBadge tier={order.boxTier} size="sm" />
                                    <StatusBadge status={order.status} size="sm" />
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '15px', color: '#1B1B2F', marginBottom: '4px' }}>{order.storeName}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#717182', fontSize: '13px' }}>
                                        ⏰ {order.pickupStart}–{order.pickupEnd} · {order.paymentMethod}
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#2D6A4F' }}>
                                        ${order.price.toLocaleString('es-CO')}
                                    </div>
                                </div>

                                {/* Expanded: QR or pending info */}
                                {selectedOrder === order.id && (
                                    <div style={{ marginTop: '16px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                                        {order.status === 'approved' && order.qrCode ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ background: '#D1FAE5', borderRadius: '12px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, color: '#064E3B', textAlign: 'center' }}>
                                                    🎉 ¡Pago aprobado! Muestra este QR en la tienda.
                                                </div>
                                                <QRDisplay code={order.qrCode} size={180} label={order.qrCode} />
                                                <div style={{ fontSize: '13px', color: '#717182', textAlign: 'center' }}>
                                                    Válido para recogida entre {order.pickupStart} y {order.pickupEnd}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ background: '#FEF3C7', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '28px', marginBottom: '6px' }}>⏳</div>
                                                <div style={{ fontWeight: 700, color: '#92400E', fontSize: '14px' }}>
                                                    Validando tu comprobante
                                                </div>
                                                <div style={{ color: '#B45309', fontSize: '13px', marginTop: '4px' }}>
                                                    El equipo Hupit revisará tu transferencia en breve
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
};
