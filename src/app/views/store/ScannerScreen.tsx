import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../../components/shared/BottomNav';

export const ScannerScreen: React.FC = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

    const handleValidate = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!code) return;

        setStatus('scanning');

        setTimeout(() => {
            // Mock validation logic
            if (code.includes('HUPIT')) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        }, 1200);
    };

    const handleReset = () => {
        setCode('');
        setStatus('idle');
    };

    return (
        <div style={{ minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif", paddingBottom: '90px', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ background: '#fff', padding: '52px 20px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#1B1B2F' }}>Escanear Retiro 📷</h1>
            </div>

            <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Mock Camera View */}
                <div style={{ width: '100%', maxWidth: '340px', aspectRatio: '3/4', background: '#000', borderRadius: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {status === 'idle' || status === 'scanning' ? (
                        <>
                            {/* Scan guides */}
                            <div style={{ position: 'absolute', inset: '40px', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '16px' }}>
                                <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '30px', height: '30px', borderTop: '4px solid #fff', borderLeft: '4px solid #fff', borderRadius: '16px 0 0 0' }} />
                                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '30px', height: '30px', borderTop: '4px solid #fff', borderRight: '4px solid #fff', borderRadius: '0 16px 0 0' }} />
                                <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '30px', height: '30px', borderBottom: '4px solid #fff', borderLeft: '4px solid #fff', borderRadius: '0 0 0 16px' }} />
                                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '30px', height: '30px', borderBottom: '4px solid #fff', borderRight: '4px solid #fff', borderRadius: '0 0 16px 0' }} />
                            </div>

                            {/* Scanning laser */}
                            <div style={{ position: 'absolute', top: '10%', left: '40px', right: '40px', height: '2px', background: '#22c55e', boxShadow: '0 0 12px 4px rgba(34,197,94,0.5)', animation: 'scan 2s linear infinite' }} />

                            <div style={{ position: 'absolute', bottom: '20px', color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600 }}>
                                {status === 'scanning' ? '🔍 Validando...' : 'Apunta al código QR del cliente'}
                            </div>
                        </>
                    ) : status === 'success' ? (
                        <div style={{ textAlign: 'center', color: '#fff' }}>
                            <div style={{ width: '80px', height: '80px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 16px', boxShadow: '0 0 30px rgba(34,197,94,0.5)' }}>✅</div>
                            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px' }}>¡Código Válido!</h2>
                            <p style={{ margin: '0 0 16px', opacity: 0.8, fontSize: '14px' }}>Entrega el pedido al cliente.</p>
                            <button onClick={handleReset} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Escanear otro</button>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#fff' }}>
                            <div style={{ width: '80px', height: '80px', background: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 16px', boxShadow: '0 0 30px rgba(239,68,68,0.5)' }}>❌</div>
                            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px' }}>Código Inválido</h2>
                            <p style={{ margin: '0 0 16px', opacity: 0.8, fontSize: '14px' }}>Este QR no existe o ya fue usado.</p>
                            <button onClick={handleReset} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Intentar de nuevo</button>
                        </div>
                    )}
                </div>

                {/* Manual entry fallback */}
                {status === 'idle' && (
                    <div style={{ width: '100%', maxWidth: '340px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }} />
                            <div style={{ fontSize: '12px', color: '#717182', fontWeight: 600, textTransform: 'uppercase' }}>O ingreso manual</div>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }} />
                        </div>

                        <form onSubmit={handleValidate} style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                value={code}
                                onChange={e => setCode(e.target.value.toUpperCase())}
                                placeholder="Ej: HUPIT-ABC"
                                style={{ flex: 1, padding: '14px 16px', borderRadius: '14px', border: '1.5px solid #E5E7EB', background: '#fff', fontSize: '15px', outline: 'none', 'boxSizing': 'border-box', fontFamily: 'monospace' }}
                            />
                            <button
                                type="submit"
                                disabled={!code}
                                style={{ background: code ? '#1B1B2F' : '#E5E7EB', color: code ? '#fff' : '#9CA3AF', border: 'none', borderRadius: '14px', padding: '0 20px', fontWeight: 700, cursor: code ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
                            >
                                Validar
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <style>{`@keyframes scan { 0% { top: 10%; opacity: 0; } 10% { opacity: 1; } 90% { top: 90%; opacity: 1; } 100% { top: 90%; opacity: 0; } }`}</style>
            <BottomNav />
        </div>
    );
};
