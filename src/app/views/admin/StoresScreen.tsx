import React, { useState } from 'react';
import { STORES } from '../../data/mockData';

export const StoresScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = STORES.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.ownerName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1B1B2F', margin: '0 0 8px' }}>Gestión de Tiendas</h1>
                    <p style={{ color: '#717182', margin: 0 }}>Administra los establecimientos aliados ({STORES.length} activas)</p>
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
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cajas Activas</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Ventas Totales</th>
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
                                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '2px' }}>{store.name}</div>
                                            <div style={{ color: '#6B7280', fontSize: '13px' }}>{store.category} · {store.address}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ fontWeight: 600, color: '#374151', fontSize: '14px', marginBottom: '2px' }}>{store.ownerName}</div>
                                    <div style={{ color: '#6B7280', fontSize: '13px' }}>{store.email}</div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ background: '#F3F4F6', color: '#4B5563', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
                                        {store.activeBoxes}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    {/* Toggle switch visual mockup */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <div style={{ width: '36px', height: '20px', background: store.status === 'active' ? '#10B981' : '#D1D5DB', borderRadius: '10px', position: 'relative', transition: 'all 0.2s' }}>
                                            <div style={{ position: 'absolute', top: '2px', left: store.status === 'active' ? '18px' : '2px', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                                        </div>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: store.status === 'active' ? '#10B981' : '#6B7280' }}>
                                            {store.status === 'active' ? 'On' : 'Off'}
                                        </span>
                                    </div>
                                </td>
                                <td style={{ padding: '20px', textAlign: 'right', fontWeight: 700, color: '#111827' }}>
                                    {store.totalSales}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
