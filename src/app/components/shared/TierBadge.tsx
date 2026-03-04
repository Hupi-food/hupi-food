import React from 'react';
import type { BoxTier } from '../../data/mockData';

interface TierBadgeProps {
    tier: BoxTier;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

const tierConfig = {
    bronze: {
        label: 'Bronce',
        emoji: '🥉',
        bg: 'linear-gradient(135deg, #CD7F32, #A0522D)',
        color: '#fff',
        glow: 'rgba(205, 127, 50, 0.5)',
        border: '#CD7F32',
    },
    silver: {
        label: 'Plata',
        emoji: '🥈',
        bg: 'linear-gradient(135deg, #C0C0C0, #808080)',
        color: '#fff',
        glow: 'rgba(192, 192, 192, 0.5)',
        border: '#C0C0C0',
    },
    gold: {
        label: 'Oro',
        emoji: '🥇',
        bg: 'linear-gradient(135deg, #FFD700, #B8860B)',
        color: '#1a1a1a',
        glow: 'rgba(255, 215, 0, 0.6)',
        border: '#FFD700',
    },
};

const sizeMap = {
    sm: { padding: '2px 8px', fontSize: '11px', borderRadius: '20px' },
    md: { padding: '4px 12px', fontSize: '13px', borderRadius: '20px' },
    lg: { padding: '8px 20px', fontSize: '16px', borderRadius: '24px', fontWeight: 700 },
};

export const TierBadge: React.FC<TierBadgeProps> = ({ tier, size = 'md', showLabel = true }) => {
    const config = tierConfig[tier];
    const sz = sizeMap[size];

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: config.bg,
                color: config.color,
                fontWeight: 700,
                boxShadow: `0 0 12px ${config.glow}, 0 2px 4px rgba(0,0,0,0.2)`,
                border: `1px solid ${config.border}`,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                animation: tier === 'gold' ? 'goldPulse 2s ease-in-out infinite' : 'none',
                ...sz,
            }}
        >
            <span>{config.emoji}</span>
            {showLabel && <span>Caja {config.label}</span>}
        </span>
    );
};
