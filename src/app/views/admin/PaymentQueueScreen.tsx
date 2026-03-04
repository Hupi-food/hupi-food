import React, { useState } from 'react';
import { ORDERS, type Order } from '../../data/mockData';
import { TierBadge } from '../../components/shared/TierBadge';

export const PaymentQueueScreen: React.FC = () => {
    const [queue, setQueue] = useState<Order[]>(ORDERS.filter(o => o.status === 'pending'));
    const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const activeOrder = queue[0];

    const handleApprove = () => {
        setActionMessage({ type: 'success', text: `✅ Pedido de ${activeOrder.customerName} aprobado. QR generado.` });
        processNext();
    };

    const handleReject = () => {
        setActionMessage({ type: 'error', text: `❌ Pedido cancelado. Hupit Box devuelta al inventario de ${activeOrder.storeName}.` });
        processNext();
    };

    const processNext = () => {
        setTimeout(() => {
            setQueue(prev => prev.slice(1));
            setActionMessage(null);
        }, 2500);
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1B1B2F', margin: '0 0 8px' }}>Cola de Pagos Centralizada</h1>
                <p style={{ color: '#717182', margin: 0 }}>
                    {queue.length} pedidos esperando validación de transferencia
                </p>
            </div>

            {actionMessage && (
                <div style={{
                    padding: '16px 24px', borderRadius: '16px', marginBottom: '24px', fontWeight: 600, fontSize: '15px',
                    background: actionMessage.type === 'success' ? '#D1FAE5' : '#FEE2E2',
                    color: actionMessage.type === 'success' ? '#065F46' : '#991B1B',
                    border: `1px solid ${actionMessage.type === 'success' ? '#10B981' : '#EF4444'}`,
                    animation: 'slideIn 0.3s ease',
                }}>
                    {actionMessage.text}
                </div>
            )}

            {!activeOrder ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '24px', border: '2px dashed #E5E7EB' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1B1B2F', margin: '0 0 8px' }}>¡Carpeta Limpia!</h2>
                    <p style={{ color: '#9CA3AF', fontSize: '16px', margin: 0 }}>No hay transferencias pendientes por revisar.</p>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr', gap: '24px' }}>
                    {/* Left panel: Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #F3F4F6', paddingBottom: '20px' }}>
                                <div style={{ fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1px' }}>
                                    Pedido ID {activeOrder.id}
                                </div>
                                <div style={{ background: '#FEF3C7', color: '#B45309', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
                                    ⏳ Esperando
                                </div>
                            </div>

                            {/* Amount - Large focus */}
                            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <div style={{ fontSize: '14px', color: '#717182', fontWeight: 600, marginBottom: '8px' }}>Monto a verificar</div>
                                <div style={{ fontSize: '56px', fontWeight: 900, color: '#2D6A4F', letterSpacing: '-1px', lineHeight: 1 }}>
                                    ${activeOrder.price.toLocaleString('es-CO')}
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1B1B2F', marginTop: '12px', background: '#F3F4F6', display: 'inline-block', padding: '6px 16px', borderRadius: '20px' }}>
                                    Vía {activeOrder.paymentMethod}
                                </div>
                            </div>

                            {/* Data table */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#F9FAFB', borderRadius: '16px' }}>
                                    <span style={{ color: '#6B7280', fontSize: '14px', fontWeight: 600 }}>Usuario</span>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 700, color: '#1B1B2F', fontSize: '15px' }}>{activeOrder.customerName}</div>
                                        <div style={{ fontSize: '13px', color: '#9CA3AF' }}>{activeOrder.customerEmail}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#F9FAFB', borderRadius: '16px' }}>
                                    <span style={{ color: '#6B7280', fontSize: '14px', fontWeight: 600 }}>Caja a liberar</span>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ marginBottom: '4px' }}><TierBadge tier={activeOrder.boxTier} size="sm" showLabel={false} /> <span style={{ fontWeight: 700, color: '#1B1B2F', fontSize: '15px' }}>{activeOrder.storeName}</span></div>
                                        <div style={{ fontSize: '13px', color: '#9CA3AF' }}>Recogida: {activeOrder.pickupStart}–{activeOrder.pickupEnd}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <button
                                onClick={handleReject}
                                disabled={!!actionMessage}
                                style={{
                                    padding: '24px 20px', background: '#FEE2E2', border: '1.5px solid #FCA5A5', color: '#991B1B',
                                    borderRadius: '20px', fontSize: '18px', fontWeight: 800, cursor: actionMessage ? 'not-allowed' : 'pointer',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                                    opacity: actionMessage ? 0.5 : 1, boxShadow: '0 4px 12px rgba(220,38,38,0.1)',
                                }}
                            >
                                <span style={{ fontSize: '32px' }}>❌</span>
                                Rechazar y Liberar
                            </button>

                            <button
                                onClick={handleApprove}
                                disabled={!!actionMessage}
                                style={{
                                    padding: '24px 20px', background: '#10B981', border: 'none', color: '#fff',
                                    borderRadius: '20px', fontSize: '18px', fontWeight: 800, cursor: actionMessage ? 'not-allowed' : 'pointer',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                                    opacity: actionMessage ? 0.5 : 1, boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
                                }}
                            >
                                <span style={{ fontSize: '32px' }}>✅</span>
                                Aprobar y Crear QR
                            </button>
                        </div>
                    </div>

                    {/* Right panel: Receipt */}
                    <div style={{ background: '#1B1B2F', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 40px rgba(0,0,0,0.1)' }}>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '14px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Comprobante adjunto</span>
                            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>Enviado hoy</span>
                        </div>
                        <div style={{ flex: 1, background: '#2D2D44', borderRadius: '16px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <img
                                src={activeOrder.receiptUrl}
                                alt="Comprobante de pago"
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Optional zoom/drag handles could go here */}
                        </div>
                    </div>
                </div>
            )}

            <style>{`@keyframes slideIn { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
        </div>
    );
};
