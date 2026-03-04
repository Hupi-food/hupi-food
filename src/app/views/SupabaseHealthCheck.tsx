import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface CheckResult {
    status: 'loading' | 'ok' | 'error' | 'warning';
    message: string;
}

export const SupabaseHealthCheck: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const [authCheck, setAuthCheck] = useState<CheckResult>({ status: 'loading', message: 'Verificando...' });
    const [dbCheck, setDbCheck] = useState<CheckResult>({ status: 'loading', message: 'Verificando...' });
    const [envCheck, setEnvCheck] = useState<CheckResult>({ status: 'loading', message: 'Verificando...' });

    useEffect(() => {
        // Check env vars
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        if (!url || !key || url.includes('TU_PROYECTO')) {
            setEnvCheck({ status: 'warning', message: 'Variables de entorno no configuradas. Revisa tu archivo .env' });
        } else {
            setEnvCheck({ status: 'ok', message: `Conectado a ${url}` });
        }

        // Check auth
        supabase.auth.getSession().then(({ data, error }) => {
            if (error) {
                setAuthCheck({ status: 'error', message: `Error: ${error.message}` });
            } else if (data.session) {
                setAuthCheck({ status: 'ok', message: `Sesión activa: ${data.session.user.email}` });
            } else {
                setAuthCheck({ status: 'warning', message: 'Sin sesión activa (no hay usuario logueado).' });
            }
        });

        // Check DB
        supabase.from('profiles').select('id').limit(1).then(({ error }) => {
            if (error) {
                setDbCheck({ status: 'error', message: `Error BD: ${error.message}` });
            } else {
                setDbCheck({ status: 'ok', message: 'Conexión a tabla profiles operativa.' });
            }
        });
    }, []);

    const statusIcon = (s: CheckResult['status']) => {
        if (s === 'loading') return '⏳';
        if (s === 'ok') return '✅';
        if (s === 'warning') return '⚠️';
        return '❌';
    };

    const statusColor = (s: CheckResult['status']) => {
        if (s === 'ok') return '#22C55E';
        if (s === 'warning') return '#F59E0B';
        if (s === 'error') return '#EF4444';
        return 'rgba(255,255,255,0.5)';
    };

    const S = {
        page: { minHeight: '100dvh', background: 'linear-gradient(160deg, #0A0E27 0%, #1B2A1F 100%)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '24px 20px', fontFamily: "'Inter', sans-serif" },
        card: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '28px', padding: '36px 28px', width: '100%', maxWidth: '520px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' },
        row: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', marginBottom: '12px' },
    };

    const checks = [
        { label: 'Variables de entorno', result: envCheck },
        { label: 'Autenticación Supabase', result: authCheck },
        { label: 'Base de datos (profiles)', result: dbCheck },
    ];

    return (
        <div style={S.page}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '42px', marginBottom: '8px' }}>🔍</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Health Check</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>Supabase × Hupit</div>
            </div>

            <div style={S.card}>
                <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, margin: '0 0 20px' }}>Estado de conexión</h2>

                {checks.map((c, i) => (
                    <div key={i} style={S.row}>
                        <span style={{ fontSize: '20px' }}>{statusIcon(c.result.status)}</span>
                        <div>
                            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{c.label}</div>
                            <div style={{ color: statusColor(c.result.status), fontSize: '12px', lineHeight: 1.4 }}>{c.result.message}</div>
                        </div>
                    </div>
                ))}

                {isAuthenticated && user && (
                    <div style={{ ...S.row, background: 'rgba(45,106,79,0.15)', border: '1px solid rgba(64,145,108,0.3)' }}>
                        <span style={{ fontSize: '20px' }}>👤</span>
                        <div>
                            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Usuario activo</div>
                            <div style={{ color: '#74C69D', fontSize: '12px' }}>{user.name} ({user.email}) — Rol: {user.role}</div>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <Link to="/" style={{ color: '#40916C', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>← Volver al inicio</Link>
                </div>
            </div>
        </div>
    );
};
