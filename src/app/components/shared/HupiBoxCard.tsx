import React from 'react';
import type { HupiBox } from '../../data/mockData';
import { TierBadge } from './TierBadge';

interface HupiBoxCardProps {
    box: HupiBox;
    onClick?: () => void;
    compact?: boolean;
}

const tierBoxStyle: Record<string, { accent: string; bg: string; borderColor: string }> = {
    bronze: { accent: '#CD7F32', bg: 'linear-gradient(135deg, #FFF8F0 0%, #FDE8C8 100%)', borderColor: 'rgba(205,127,50,0.3)' },
    silver: { accent: '#808080', bg: 'linear-gradient(135deg, #F8F9FA 0%, #E8EAED 100%)', borderColor: 'rgba(192,192,192,0.4)' },
    gold: { accent: '#B8860B', bg: 'linear-gradient(135deg, #FFFDF0 0%, #FFF3C4 100%)', borderColor: 'rgba(255,215,0,0.5)' },
};

const BOX_EMOJI: Record<string, string> = {
    bronze: '📦',
    silver: '🎁',
    gold: '✨',
};

export const HupiBoxCard: React.FC<HupiBoxCardProps> = ({ box, onClick, compact = false }) => {
    const style = tierBoxStyle[box.tier];
    const savings = Math.round((1 - box.price / box.originalValue) * 100);
    const spotsLeft = box.quantity - box.reserved;

    return (
        <div
            onClick={onClick}
            style={{
                background: style.bg,
                border: `1.5px solid ${style.borderColor}`,
                borderRadius: '20px',
                padding: compact ? '14px' : '18px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px rgba(0,0,0,0.14)`;
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
        >
            {/* Decorative box emoji */}
            <div style={{ position: 'absolute', top: '-8px', right: '-4px', fontSize: '64px', opacity: 0.1, pointerEvents: 'none' }}>
                {BOX_EMOJI[box.tier]}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <TierBadge tier={box.tier} size={compact ? 'sm' : 'md'} />
                <span style={{ background: '#22c55e', color: '#fff', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 700 }}>
                    -{savings}%
                </span>
            </div>

            <div style={{ marginBottom: '6px' }}>
                <div style={{ fontWeight: 700, fontSize: compact ? '14px' : '16px', color: '#1B1B2F', marginBottom: '2px' }}>
                    {box.storeName}
                </div>
                <div style={{ color: '#717182', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>📍</span> {box.storeAddress}
                </div>
            </div>

            {!compact && (
                <div style={{ color: '#555', fontSize: '13px', marginBottom: '10px', lineHeight: 1.4 }}>
                    {box.description}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span style={{ fontSize: compact ? '18px' : '22px', fontWeight: 800, color: style.accent }}>
                        ${box.price.toLocaleString('es-CO')}
                    </span>
                    <span style={{ fontSize: '12px', color: '#aaa', textDecoration: 'line-through', marginLeft: '6px' }}>
                        ${box.originalValue.toLocaleString('es-CO')}
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                    <span style={{ fontSize: '12px', color: '#717182' }}>⏰ {box.pickupStart}–{box.pickupEnd}</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: spotsLeft <= 1 ? '#ef4444' : '#22c55e' }}>
                        {spotsLeft > 0 ? `${spotsLeft} disponible${spotsLeft > 1 ? 's' : ''}` : 'Agotado'}
                    </span>
                </div>
            </div>
        </div>
    );
};
