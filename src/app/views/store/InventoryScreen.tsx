import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { HUPI_BOXES, ORDERS, type HupiBox } from '../../data/mockData';
import { TierBadge } from '../../components/shared/TierBadge';
import { BottomNav } from '../../components/shared/BottomNav';

export const InventoryScreen: React.FC = () => {
    const navigate = useNavigate();
    const storeBoxes = HUPI_BOXES.filter(b => b.storeId === 's1');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const isReserved = (boxId: string) => {
        return ORDERS.some(o => o.boxId === boxId && (o.status === 'pending' || o.status === 'approved'));
    };

    return (
        <div style={{ minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif", paddingBottom: '90px' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #F77F00, #FCBF49)', padding: '52px 20px 24px' }}>
                <h1 style={{ color: '#1B1B2F', fontSize: '22px', fontWeight: 800, margin: '0 0 4px' }}>Inventario 📦</h1>
                <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', margin: 0 }}>Gestiona tus Hupit Boxes</p>
            </div>

            <div style={{ padding: '16px 20px' }}>
                {/* Create button */}
                <button
                    onClick={() => navigate('/store/box/new')}
                    style={{
                        width: '100%', padding: '16px',
                        background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
                        color: '#fff', border: 'none', borderRadius: '16px',
                        fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        marginBottom: '20px', boxShadow: '0 6px 20px rgba(45,106,79,0.35)',
                    }}
                >
                    <span style={{ fontSize: '20px' }}>+</span>
                    Crear nueva Hupit Box
                </button>

                {/* Info banner */}
                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px', fontSize: '13px', color: '#1E40AF', display: 'flex', gap: '8px' }}>
                    <span>🔒</span>
                    <span>Las cajas con pedidos activos no pueden editarse ni eliminarse.</span>
                </div>

                {/* Boxes list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {storeBoxes.map(box => {
                        const reserved = isReserved(box.id);
                        const spotsLeft = box.quantity - box.reserved;

                        return (
                            <div key={box.id} style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '18px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                                position: 'relative',
                                overflow: 'hidden',
                                border: reserved ? '2px solid rgba(251,191,36,0.3)' : '2px solid rgba(0,0,0,0.05)',
                            }}>
                                {/* Reserved badge */}
                                {reserved && (
                                    <div style={{
                                        position: 'absolute', top: '14px', right: '14px',
                                        background: '#FEF3C7', border: '1px solid #F59E0B',
                                        borderRadius: '8px', padding: '4px 8px',
                                        fontSize: '11px', fontWeight: 700, color: '#B45309',
                                        display: 'flex', alignItems: 'center', gap: '4px',
                                    }}>
                                        🔒 Reservada
                                    </div>
                                )}

                                <div style={{ marginBottom: '8px' }}>
                                    <TierBadge tier={box.tier} size="sm" />
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: '#1B1B2F', marginBottom: '4px' }}>
                                    {box.description.length > 50 ? box.description.slice(0, 50) + '…' : box.description}
                                </div>
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', fontSize: '13px', color: '#717182' }}>
                                    <span>💰 ${box.price.toLocaleString('es-CO')}</span>
                                    <span>⏰ {box.pickupStart}–{box.pickupEnd}</span>
                                    <span>📦 {spotsLeft}/{box.quantity} disp.</span>
                                </div>

                                {/* Action buttons */}
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={() => !reserved && navigate(`/store/box/${box.id}`)}
                                        disabled={reserved}
                                        title={reserved ? 'No puedes editar cajas con pedidos activos' : 'Editar'}
                                        style={{
                                            flex: 1, padding: '10px',
                                            background: reserved ? '#F3F4F6' : '#EFF6FF',
                                            color: reserved ? '#9CA3AF' : '#1D4ED8',
                                            border: reserved ? '1.5px solid #E5E7EB' : '1.5px solid #BFDBFE',
                                            borderRadius: '12px', fontSize: '13px', fontWeight: 700,
                                            cursor: reserved ? 'not-allowed' : 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        {reserved ? '🔒' : '✏️'} Editar
                                    </button>
                                    <button
                                        onClick={() => !reserved && setShowDeleteConfirm(box.id)}
                                        disabled={reserved}
                                        title={reserved ? 'No puedes eliminar cajas con pedidos activos' : 'Eliminar'}
                                        style={{
                                            flex: 1, padding: '10px',
                                            background: reserved ? '#F3F4F6' : '#FEF2F2',
                                            color: reserved ? '#9CA3AF' : '#DC2626',
                                            border: reserved ? '1.5px solid #E5E7EB' : '1.5px solid #FECACA',
                                            borderRadius: '12px', fontSize: '13px', fontWeight: 700,
                                            cursor: reserved ? 'not-allowed' : 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        {reserved ? '🔒' : '🗑️'} Eliminar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Delete confirmation modal */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
                    <div style={{ background: '#fff', borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '420px' }}>
                        <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>🗑️</div>
                        <h3 style={{ textAlign: 'center', fontWeight: 800, color: '#1B1B2F', margin: '0 0 8px' }}>¿Eliminar esta caja?</h3>
                        <p style={{ textAlign: 'center', color: '#717182', fontSize: '14px', margin: '0 0 24px' }}>
                            Esta acción no se puede deshacer. La caja será removida del inventario.
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setShowDeleteConfirm(null)} style={{ flex: 1, padding: '14px', border: '2px solid #E5E7EB', borderRadius: '14px', background: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}>
                                Cancelar
                            </button>
                            <button onClick={() => setShowDeleteConfirm(null)} style={{ flex: 1, padding: '14px', border: 'none', borderRadius: '14px', background: '#DC2626', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
};
