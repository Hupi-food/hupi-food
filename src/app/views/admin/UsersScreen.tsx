import React, { useState } from 'react';

const MOCK_USERS = [
    { id: 'u1', name: 'Valentina Gómez', email: 'valentina@email.com', role: 'customer', joined: '2026-01-10', status: 'active', orders: 12 },
    { id: 'u2', name: 'Mateo Torres', email: 'mateo@email.com', role: 'customer', joined: '2026-02-15', status: 'active', orders: 4 },
    { id: 'u3', name: 'Carlos Rincón', email: 'panaderia@email.com', role: 'store_owner', joined: '2025-11-10', status: 'active', orders: 0 },
    { id: 'u4', name: 'Ana Murillo', email: 'lamesa@email.com', role: 'store_owner', joined: '2025-12-01', status: 'active', orders: 0 },
    { id: 'u5', name: 'Suspicious User', email: 'fake@email.com', role: 'customer', joined: '2026-03-01', status: 'suspended', orders: 0 },
    { id: 'a1', name: 'Admin Hupit', email: 'admin@hupit.co', role: 'super_admin', joined: '2025-10-01', status: 'active', orders: 0 },
];

export const UsersScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = MOCK_USERS.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1B1B2F', margin: '0 0 8px' }}>Gestión de Usuarios</h1>
                    <p style={{ color: '#717182', margin: 0 }}>Administra cuentas de clientes, tiendas y admins ({MOCK_USERS.length} total)</p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ padding: '12px 16px 12px 40px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', width: '280px', fontSize: '14px' }}
                        />
                    </div>
                    <button style={{ background: 'linear-gradient(135deg, #1B1B2F, #2D2D44)', color: '#fff', border: 'none', borderRadius: '12px', padding: '0 20px', fontWeight: 600, cursor: 'pointer' }}>
                        + Invitar
                    </button>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Usuario</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rol</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pedidos</th>
                            <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#374151' }}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '2px' }}>{user.name}</div>
                                            <div style={{ color: '#6B7280', fontSize: '13px' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                                        background: user.role === 'customer' ? '#F3F4F6' : user.role === 'store_owner' ? '#FEF3C7' : '#EDE9FE',
                                        color: user.role === 'customer' ? '#4B5563' : user.role === 'store_owner' ? '#92400E' : '#5B21B6',
                                    }}>
                                        {user.role === 'customer' ? 'Cliente' : user.role === 'store_owner' ? 'Tienda' : 'Admin'}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        color: user.status === 'active' ? '#10B981' : '#EF4444', fontSize: '14px', fontWeight: 600
                                    }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: user.status === 'active' ? '#10B981' : '#EF4444' }} />
                                        {user.status === 'active' ? 'Activo' : 'Suspendido'}
                                    </span>
                                </td>
                                <td style={{ padding: '20px', color: '#4B5563', fontWeight: 600 }}>
                                    {user.orders > 0 ? user.orders : '-'}
                                </td>
                                <td style={{ padding: '20px', textAlign: 'right' }}>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: '4px 8px', borderRadius: '6px' }} title="Editar">✏️</button>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: '4px 8px', borderRadius: '6px' }} title="Más acciones">⋮</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
