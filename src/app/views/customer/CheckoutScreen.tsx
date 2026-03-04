import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { HUPI_BOXES } from '../../data/mockData';
import { TierBadge } from '../../components/shared/TierBadge';
import { BottomNav } from '../../components/shared/BottomNav';

const PAYMENT_METHODS = [
    { id: 'nequi', name: 'Nequi', icon: '💜', color: '#7C3AED', account: '300 123 4567', gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)' },
    { id: 'daviplata', name: 'Daviplata', icon: '❤️', color: '#DC2626', account: '311 456 7890', gradient: 'linear-gradient(135deg, #DC2626, #EF4444)' },
    { id: 'breb', name: 'Bre-b', icon: '🔵', color: '#2563EB', account: '320 789 0123', gradient: 'linear-gradient(135deg, #2563EB, #3B82F6)' },
    { id: 'uala', name: 'Ualá', icon: '🐱', color: '#EA580C', account: '315 234 5678', gradient: 'linear-gradient(135deg, #EA580C, #F97316)' },
];

export const CheckoutScreen: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { box: stateBox, quantity = 1 } = (location.state || {}) as { box?: any; quantity?: number };
    const box = stateBox || HUPI_BOXES[0];

    const [selectedMethod, setSelectedMethod] = useState('nequi');
    const [receipt, setReceipt] = useState<File | null>(null);
    const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [copiedMethod, setCopiedMethod] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const total = box.price * quantity;
    const method = PAYMENT_METHODS.find(m => m.id === selectedMethod)!;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setReceipt(file);
            const reader = new FileReader();
            reader.onload = ev => setReceiptPreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text).catch(() => { });
        setCopiedMethod(id);
        setTimeout(() => setCopiedMethod(null), 2000);
    };

    const handleSubmit = () => {
        if (!receipt) return;
        setSubmitted(true);
        setTimeout(() => navigate('/app/orders'), 2500);
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #1B1B2F, #1B3A2F)', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
                <div style={{ fontSize: '80px', marginBottom: '20px', animation: 'bounce 0.6s ease' }}>🎉</div>
                <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, margin: '0 0 8px', textAlign: 'center' }}>¡Pedido enviado!</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', margin: '0 0 24px' }}>
                    Tu comprobante fue recibido. Espera la aprobación del equipo Hupit.
                </p>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px 24px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    ⏳ Revisando pago...
                </div>
                <style>{`@keyframes bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }`}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif", paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #1B1B2F, #2D2D44)', padding: '52px 20px 24px' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: '#fff', fontSize: '20px', cursor: 'pointer', marginBottom: '16px' }}>←</button>
                <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, margin: 0 }}>Finalizar compra</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '4px 0 0' }}>Pago manual por transferencia</p>
            </div>

            <div style={{ padding: '20px' }}>
                {/* Order summary */}
                <div style={{ background: '#fff', borderRadius: '18px', padding: '18px', marginBottom: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                    <h3 style={{ fontSize: '14px', color: '#717182', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tu pedido</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ marginBottom: '6px' }}><TierBadge tier={box.tier} size="sm" /></div>
                            <div style={{ fontWeight: 700, color: '#1B1B2F', fontSize: '15px' }}>{box.storeName}</div>
                            <div style={{ color: '#717182', fontSize: '13px' }}>⏰ Retiro {box.pickupStart}–{box.pickupEnd}</div>
                            <div style={{ color: '#717182', fontSize: '13px' }}>x{quantity} unidad{quantity > 1 ? 'es' : ''}</div>
                        </div>
                        <div style={{ fontWeight: 900, fontSize: '22px', color: '#2D6A4F' }}>
                            ${total.toLocaleString('es-CO')}
                        </div>
                    </div>
                </div>

                {/* Payment method selector */}
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1B1B2F', marginBottom: '10px' }}>1. Elige tu billetera</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {PAYMENT_METHODS.map(pm => (
                            <button
                                key={pm.id}
                                onClick={() => setSelectedMethod(pm.id)}
                                style={{
                                    padding: '14px',
                                    borderRadius: '16px',
                                    border: selectedMethod === pm.id ? `2px solid ${pm.color}` : '2px solid rgba(0,0,0,0.08)',
                                    background: selectedMethod === pm.id ? `${pm.color}12` : '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                                    boxShadow: selectedMethod === pm.id ? `0 4px 12px ${pm.color}30` : 'none',
                                }}
                            >
                                <span style={{ fontSize: '28px' }}>{pm.icon}</span>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: pm.id === selectedMethod ? pm.color : '#555' }}>
                                    {pm.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transfer details */}
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1B1B2F', marginBottom: '10px' }}>2. Realiza la transferencia</h3>
                    <div style={{
                        background: method.gradient,
                        borderRadius: '20px',
                        padding: '24px',
                        color: '#fff',
                        boxShadow: `0 8px 24px ${method.color}40`,
                    }}>
                        <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '4px' }}>Transferir a</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>{method.name}</div>
                        <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '16px' }}>Cuenta: Hupit Colombia S.A.S</div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px 16px', marginBottom: '10px' }}>
                            <div>
                                <div style={{ fontSize: '12px', opacity: 0.7 }}>Número</div>
                                <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '1px' }}>{method.account}</div>
                            </div>
                            <button
                                onClick={() => handleCopy(method.account, 'account')}
                                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '6px 12px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                            >
                                {copiedMethod === 'account' ? '✓ Copiado' : '📋 Copiar'}
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px 16px' }}>
                            <div>
                                <div style={{ fontSize: '12px', opacity: 0.7 }}>Monto exacto</div>
                                <div style={{ fontSize: '22px', fontWeight: 900 }}>${total.toLocaleString('es-CO')}</div>
                            </div>
                            <button
                                onClick={() => handleCopy(String(total), 'amount')}
                                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '6px 12px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                            >
                                {copiedMethod === 'amount' ? '✓ Copiado' : '📋 Copiar'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Receipt upload */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1B1B2F', marginBottom: '10px' }}>3. Sube tu comprobante</h3>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

                    {receiptPreview ? (
                        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '10px' }}>
                            <img src={receiptPreview} alt="Comprobante" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }} />
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <button
                                    onClick={() => fileRef.current?.click()}
                                    style={{ background: '#fff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                                >
                                    ↺ Cambiar foto
                                </button>
                            </div>
                            <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#22c55e', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✓</div>
                        </div>
                    ) : (
                        <button
                            onClick={() => fileRef.current?.click()}
                            style={{
                                width: '100%', padding: '28px 20px',
                                background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                                border: '2px dashed #3B82F6',
                                borderRadius: '18px', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                                transition: 'all 0.2s', boxSizing: 'border-box',
                            }}
                        >
                            <span style={{ fontSize: '40px' }}>📸</span>
                            <span style={{ fontSize: '16px', fontWeight: 700, color: '#1D4ED8' }}>Subir Comprobante de Pago</span>
                            <span style={{ fontSize: '13px', color: '#60A5FA' }}>Captura de pantalla o foto de la transferencia</span>
                        </button>
                    )}
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={!receipt}
                    style={{
                        width: '100%', padding: '18px',
                        background: receipt ? 'linear-gradient(135deg, #2D6A4F, #40916C)' : '#E5E7EB',
                        color: receipt ? '#fff' : '#9CA3AF',
                        border: 'none', borderRadius: '18px', fontSize: '17px', fontWeight: 800,
                        cursor: receipt ? 'pointer' : 'not-allowed',
                        boxShadow: receipt ? '0 8px 24px rgba(45,106,79,0.35)' : 'none',
                        transition: 'all 0.2s',
                    }}
                >
                    {receipt ? '✅ Enviar Pedido' : '📸 Sube el comprobante para continuar'}
                </button>
            </div>

            <BottomNav />
        </div>
    );
};
