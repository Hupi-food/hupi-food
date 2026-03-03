import React from 'react';
import type { OrderStatus } from '../../data/mockData';

interface StatusBadgeProps {
    status: OrderStatus;
    size?: 'sm' | 'md';
}

const STATUS_CONFIG = {
    pending: { label: 'Esperando Aprobación', icon: '⏳', bg: '#FEF3C7', color: '#92400E', border: '#F59E0B' },
    approved: { label: 'Aprobado — ¡Recoge!', icon: '✅', bg: '#D1FAE5', color: '#064E3B', border: '#10B981' },
    rejected: { label: 'Rechazado', icon: '❌', bg: '#FEE2E2', color: '#7F1D1D', border: '#EF4444' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
    const cfg = STATUS_CONFIG[status];
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            background: cfg.bg, color: cfg.color,
            border: `1px solid ${cfg.border}`,
            borderRadius: '20px',
            padding: size === 'sm' ? '2px 8px' : '4px 12px',
            fontSize: size === 'sm' ? '11px' : '13px',
            fontWeight: 600,
        }}>
            <span>{cfg.icon}</span>
            <span>{cfg.label}</span>
        </span>
    );
};
