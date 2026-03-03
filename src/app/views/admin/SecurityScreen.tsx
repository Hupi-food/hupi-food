import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const SecurityScreen: React.FC = () => {
    const { user } = useAuth();
    const [tfaEnabled, setTfaEnabled] = useState(false);
    const [showTfaSetup, setShowTfaSetup] = useState(false);

    const toggleTfa = () => {
        if (tfaEnabled) {
            setTfaEnabled(false);
        } else {
            setShowTfaSetup(true);
        }
    };

    const confirmTfa = () => {
        setTfaEnabled(true);
        setShowTfaSetup(false);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1B1B2F', margin: '0 0 8px' }}>Seguridad del Perfil</h1>
                <p style={{ color: '#717182', margin: 0 }}>Gestiona la configuración de acceso de la cuenta nivel Admin.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Profile Info */}
                <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1B1B2F', margin: '0 0 24px' }}>Información Básica</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '24px', alignItems: 'center' }}>
                        <div style={{ width: '100px', height: '100px', borderRadius: '24px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 800, color: '#374151', border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            {user?.avatar}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6B7280', marginBottom: '6px' }}>Nombre completo</label>
                                <input type="text" defaultValue={user?.name} style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '15px', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6B7280', marginBottom: '6px' }}>Correo electrónico (Login)</label>
                                <input type="email" defaultValue={user?.email} disabled style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', background: '#F9FAFB', color: '#9CA3AF', fontSize: '15px', outline: 'none' }} />
                            </div>
                            <button style={{ alignSelf: 'flex-start', background: '#1B1B2F', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>

                {/* Change Password */}
                <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1B1B2F', margin: '0 0 24px' }}>Cambiar Contraseña</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6B7280', marginBottom: '6px' }}>Contraseña actual</label>
                            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '15px', outline: 'none', 'boxSizing': 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6B7280', marginBottom: '6px' }}>Nueva contraseña</label>
                            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '15px', outline: 'none', 'boxSizing': 'border-box' }} />
                        </div>
                        <button style={{ alignSelf: 'flex-start', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: 700, cursor: 'pointer', marginTop: '8px' }}>Actualizar Contraseña</button>
                    </div>
                </div>

                {/* Two-Factor Auth */}
                <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showTfaSetup ? '24px' : 0 }}>
                        <div>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1B1B2F', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                Autenticación en dos pasos (2FA)
                                {tfaEnabled && <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Activo</span>}
                            </h2>
                            <p style={{ color: '#717182', fontSize: '14px', margin: 0 }}>Protege tu cuenta Admin con un código adicional al iniciar sesión.</p>
                        </div>

                        {/* Toggle */}
                        <button onClick={toggleTfa} style={{ background: tfaEnabled ? '#10B981' : '#E5E7EB', border: 'none', borderRadius: '20px', width: '56px', height: '32px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}>
                            <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '4px', left: tfaEnabled ? '28px' : '4px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                        </button>
                    </div>

                    {/* Setup pane */}
                    {showTfaSetup && (
                        <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '24px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                            <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '2px solid rgba(0,0,0,0.05)' }}>
                                {/* Visual Fake QR */}
                                <div style={{ width: '120px', height: '120px', background: `repeating-linear-gradient(45deg, #1B1B2F, #1B1B2F 4px, transparent 4px, transparent 8px)` }} />
                            </div>
                            <div>
                                <ol style={{ paddingLeft: '20px', margin: '0 0 20px', color: '#4B5563', fontSize: '14px', lineHeight: 1.6 }}>
                                    <li>Descarga Google Authenticator o Authy en tu celular.</li>
                                    <li>Escanea el código QR que aparece en pantalla o introduce el código manualmente: <strong>JBSWY3DPEHPK3PXP</strong></li>
                                    <li>Ingresa el código de 6 dígitos generado por la aplicación.</li>
                                </ol>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="text" placeholder="000 000" style={{ width: '120px', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '16px', outline: 'none', textAlign: 'center', letterSpacing: '2px', fontWeight: 700 }} />
                                    <button onClick={confirmTfa} style={{ background: '#2D6A4F', color: '#fff', border: 'none', borderRadius: '10px', padding: '0 20px', fontWeight: 700, cursor: 'pointer' }}>Activar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
