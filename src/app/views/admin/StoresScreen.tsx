import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const StoresScreen: React.FC = () => {
    const { allUsers, updateUserStatus } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [isProcessing, setIsProcessing] = useState<string | null>(null);

    const handleUpdateStatus = async (userId: string, status: 'active' | 'rejected') => {
        setIsProcessing(userId);
        await updateUserStatus(userId, status);
        setIsProcessing(null);
    };

    const stores = allUsers.filter(u => u.role === 'store_owner');
    const filtered = stores.filter(s =>
        s.storeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1B1B2F', margin: '0 0 8px' }}>Gestión de Tiendas</h1>
                    <p style={{ color: '#717182', margin: 0 }}>Administra los establecimientos aliados ({stores.length} registrados)</p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar por tienda o dueño..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ padding: '12px 16px 12px 40px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', width: '280px', fontSize: '14px' }}
                        />
                    </div>
                    <button style={{ background: 'linear-gradient(135deg, #1B1B2F, #2D2D44)', color: '#fff', border: 'none', borderRadius: '12px', padding: '0 20px', fontWeight: 600, cursor: 'pointer' }}>
                        + Registrar Tienda
                    </button>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Comercio</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contacto</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(store => (
                            <tr key={store.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                                            🏪
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '2px' }}>{store.storeName || 'Sin nombre'}</div>
                                            <div style={{ color: '#6B7280', fontSize: '13px' }}>{store.storeCategory} · {store.storeAddress}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ fontWeight: 600, color: '#374151', fontSize: '14px', marginBottom: '2px' }}>{store.name}</div>
                                    <div style={{ color: '#6B7280', fontSize: '13px' }}>{store.email}</div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        background: store.storeOwnerStatus === 'active' ? '#D1FAE5' : store.storeOwnerStatus === 'rejected' ? '#FEE2E2' : '#FEF3C7',
                                        color: store.storeOwnerStatus === 'active' ? '#065F46' : store.storeOwnerStatus === 'rejected' ? '#991B1B' : '#92400E',
                                    }}>
                                        {store.storeOwnerStatus === 'active' ? 'Activo' : store.storeOwnerStatus === 'rejected' ? 'Rechazado' : 'Pendiente'}
                                    </span>
                                </td>
                                <td style={{ padding: '20px', textAlign: 'right' }}>
                                    {store.storeOwnerStatus === 'pending_approval' && (
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                disabled={isProcessing === store.id}
                                                onClick={() => handleUpdateStatus(store.id, 'active')}
                                                style={{ background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', opacity: isProcessing === store.id ? 0.5 : 1 }}
                                            >
                                                Aprobar
                                            </button>
                                            <button
                                                disabled={isProcessing === store.id}
                                                onClick={() => handleUpdateStatus(store.id, 'rejected')}
                                                style={{ background: '#EF4444', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', opacity: isProcessing === store.id ? 0.5 : 1 }}
                                            >
                                                Rechazar
                                            </button>
                                        </div>
                                    )}
                                    {store.storeOwnerStatus === 'active' && (
                                        <button
                                            disabled={isProcessing === store.id}
                                            onClick={() => handleUpdateStatus(store.id, 'rejected')}
                                            style={{ background: 'transparent', color: '#EF4444', border: '1px solid #EF4444', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                            Desactivar
                                        </button>
                                    )}
                                    {store.storeOwnerStatus === 'rejected' && (
                                        <button
                                            disabled={isProcessing === store.id}
                                            onClick={() => handleUpdateStatus(store.id, 'active')}
                                            style={{ background: 'transparent', color: '#10B981', border: '1px solid #10B981', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                            Reactivar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
