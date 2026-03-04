import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { HUPI_BOXES } from '../../data/mockData';
import { TierBadge } from '../../components/shared/TierBadge';
import { BottomNav } from '../../components/shared/BottomNav';

const TIER_BG: Record<string, string> = {
    bronze: 'linear-gradient(160deg, #1B1B2F 0%, #4A2C10 100%)',
    silver: 'linear-gradient(160deg, #1B1B2F 0%, #2A2A3A 100%)',
    gold: 'linear-gradient(160deg, #1B1B2F 0%, #3D2800 100%)',
};

const BOX_EMOJI: Record<string, string[]> = {
    bronze: ['📦', '🥐', '🍞', '🧁'],
    silver: ['🎁', '🥐', '🍰', '☕'],
    gold: ['✨', '🍽️', '🥩', '🍷'],
};

export const BoxDetailsScreen: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const box = HUPI_BOXES.find(b => b.id === id);
    const [isRevealed, setIsRevealed] = useState(false);
    const [quantity, setQuantity] = useState(1);

    if (!box) return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
            <p>Caja no encontrada</p>
            <button onClick={() => navigate('/app/home')} style={{ marginTop: '16px', padding: '10px 24px', borderRadius: '12px', background: '#2D6A4F', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                Volver
            </button>
        </div>
    );

    const savings = Math.round((1 - box.price / box.originalValue) * 100);
    const spotsLeft = box.quantity - box.reserved;
    const emojis = BOX_EMOJI[box.tier];

    return (
        <div style={{ minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif", paddingBottom: '100px' }}>
            {/* Hero */}
            <div style={{
                background: TIER_BG[box.tier],
                padding: '52px 24px 40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <button
                    onClick={() => navigate('/app/home')}
                    style={{
                        position: 'absolute', top: '52px', left: '20px',
                        background: 'rgba(255,255,255,0.15)', border: 'none',
                        borderRadius: '10px', padding: '8px 12px', color: '#fff',
                        fontSize: '20px', cursor: 'pointer',
                    }}
                >
                    ←
                </button>

                {/* Animated box */}
                <div
                    onClick={() => setIsRevealed(!isRevealed)}
                    style={{
                        fontSize: isRevealed ? '110px' : '90px',
                        marginBottom: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        filter: `drop-shadow(0 8px 24px rgba(255,255,255,0.2))`,
                        display: 'inline-block',
                        animation: 'float 3s ease-in-out infinite',
                    }}
                >
                    {isRevealed ? emojis.slice(1).join(' ') : emojis[0]}
                </div>

                {!isRevealed && (
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '12px' }}>
                        Toca la caja para una pista 👆
                    </div>
                )}

                <div style={{ marginBottom: '12px' }}>
                    <TierBadge tier={box.tier} size="lg" />
                </div>

                <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, margin: '0 0 4px', lineHeight: 1.2 }}>
                    {box.storeName}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>
                    📍 {box.storeAddress}
                </p>
            </div>

            {/* Details */}
            <div style={{ padding: '24px 20px' }}>
                {/* Price & Savings */}
                <div style={{
                    background: '#fff', borderRadius: '20px', padding: '20px',
                    marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <div>
                        <div style={{ color: '#717182', fontSize: '13px', marginBottom: '4px' }}>Precio</div>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#2D6A4F' }}>
                            ${box.price.toLocaleString('es-CO')}
                        </div>
                        <div style={{ fontSize: '14px', color: '#aaa', textDecoration: 'line-through' }}>
                            Valor original: ${box.originalValue.toLocaleString('es-CO')}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{
                            background: '#22c55e', color: '#fff', borderRadius: '16px',
                            padding: '8px 16px', fontSize: '20px', fontWeight: 800,
                            boxShadow: '0 4px 12px rgba(34,197,94,0.3)',
                            marginBottom: '8px',
                        }}>
                            -{savings}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#717182' }}>de ahorro</div>
                    </div>
                </div>

                {/* Info cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '4px' }}>⏰</div>
                        <div style={{ fontSize: '12px', color: '#717182', marginBottom: '2px' }}>Retiro</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1B1B2F' }}>{box.pickupStart}–{box.pickupEnd}</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '4px' }}>📦</div>
                        <div style={{ fontSize: '12px', color: '#717182', marginBottom: '2px' }}>Disponibles</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: spotsLeft <= 1 ? '#ef4444' : '#22c55e' }}>
                            {spotsLeft} {spotsLeft === 1 ? 'unidad' : 'unidades'}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1B1B2F', margin: '0 0 8px' }}>¿Qué hay dentro? 🎲</h3>
                    <p style={{ color: '#555', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
                        {box.description}
                    </p>
                    <div style={{ marginTop: '12px', padding: '10px', background: '#F5F5F7', borderRadius: '10px', fontSize: '13px', color: '#717182' }}>
                        ⚠️ El contenido exacto es una sorpresa. ¡Eso es parte de la experiencia Hupit!
                    </div>
                </div>

                {/* Quantity */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1B1B2F' }}>Cantidad</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #e5e7eb', background: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >-</button>
                            <span style={{ fontSize: '18px', fontWeight: 700 }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(spotsLeft, quantity + 1))}
                                style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#2D6A4F', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={() => navigate('/app/checkout', { state: { box, quantity } })}
                    disabled={spotsLeft === 0}
                    style={{
                        width: '100%', padding: '18px',
                        background: spotsLeft === 0 ? '#e5e7eb' : 'linear-gradient(135deg, #2D6A4F, #40916C)',
                        color: spotsLeft === 0 ? '#9CA3AF' : '#fff',
                        border: 'none', borderRadius: '18px', fontSize: '17px', fontWeight: 800,
                        cursor: spotsLeft === 0 ? 'not-allowed' : 'pointer',
                        boxShadow: spotsLeft === 0 ? 'none' : '0 8px 24px rgba(45,106,79,0.35)',
                        transition: 'all 0.2s',
                    }}
                >
                    {spotsLeft === 0 ? '😔 Agotado' : `🎁 Reservar por $${(box.price * quantity).toLocaleString('es-CO')}`}
                </button>
            </div>

            <BottomNav />
            <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
        </div>
    );
};
