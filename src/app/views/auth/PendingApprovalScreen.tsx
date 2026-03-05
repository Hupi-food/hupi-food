import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export const PendingApprovalScreen: React.FC = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const S = {
        page: {
            minHeight: '100dvh',
            background: 'linear-gradient(160deg, #F77F00 0%, #D62828 100%)',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px',
            fontFamily: "'Inter', 'Outfit', sans-serif",
            textAlign: 'center' as const,
            color: '#fff'
        },
        card: {
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '32px',
            padding: '48px 32px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 32px 64px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center'
        },
        iconWrapper: {
            width: '90px',
            height: '90px',
            background: 'rgba(255,255,255,1)',
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            marginBottom: '32px',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
        },
        title: {
            fontSize: '32px',
            fontWeight: 900,
            margin: '0 0 16px',
            letterSpacing: '-1px',
            lineHeight: 1.1
        },
        text: {
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '40px'
        },
        logoutBtn: {
            width: '100%',
            padding: '18px',
            borderRadius: '18px',
            background: '#fff',
            color: '#D62828',
            fontSize: '16px',
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s, opacity 0.2s',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
        }
    };

    return (
        <div style={S.page}>
            <div style={S.card}>
                <div style={S.iconWrapper}>⏳</div>
                <h1 style={S.title}>Cuenta en Revisión</h1>
                <p style={S.text}>
                    ¡Hola <strong>{user?.name || 'Comerciante'}</strong>! Tu cuenta ha sido registrada con éxito.
                    <br /><br />
                    Para garantizar la calidad de la plataforma, un administrador revisará tus datos en las próximas 24-48 horas. Te notificaremos por email.
                </p>
                <button
                    onClick={handleLogout}
                    style={S.logoutBtn}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Cerrar Sesión
                </button>
            </div>

            <div style={{ marginTop: '32px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                ¿Tienes dudas? <span style={{ fontWeight: 700, color: '#fff' }}>contacto@hupit.com</span>
            </div>
        </div>
    );
};
