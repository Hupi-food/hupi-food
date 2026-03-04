import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
}

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const RegisterScreen: React.FC = () => {
    const { registerCustomer } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState<'form' | 'success'>('form');

    // ── Datos del formulario ────────────────────────────────────────────────
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [globalError, setGlobalError] = useState('');

    // ── Validación formulario ──────────────────────────────────────────────
    const validate = (): boolean => {
        const e: FormErrors = {};
        if (!name.trim() || name.trim().length < 3) e.name = 'Ingresa tu nombre completo (mín. 3 caracteres).';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo electrónico no válido.';
        if (!PASSWORD_REGEX.test(password)) e.password = 'Mínimo 8 caracteres, una mayúscula, una minúscula y un número.';
        if (password !== confirm) e.confirm = 'Las contraseñas no coinciden.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setGlobalError('');
        if (!validate()) return;
        setSubmitting(true);
        const result = await registerCustomer({ name: name.trim(), email: email.trim().toLowerCase(), password });
        setSubmitting(false);
        if (!result.success) { setGlobalError(result.error || 'Error al registrar.'); return; }
        setStep('success');
    };

    const passwordStrength = (): { level: number; label: string; color: string } => {
        if (!password) return { level: 0, label: '', color: '#374151' };
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (score <= 2) return { level: score, label: 'Débil', color: '#EF4444' };
        if (score <= 3) return { level: score, label: 'Regular', color: '#F59E0B' };
        return { level: score, label: 'Fuerte', color: '#22C55E' };
    };

    const strength = passwordStrength();

    // ── Estilos ────────────────────────────────────────────────────────────
    const S = {
        page: {
            minHeight: '100dvh',
            background: 'linear-gradient(160deg, #0A0E27 0%, #1B2A1F 100%)',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px',
            fontFamily: "'Inter', sans-serif",
        },
        card: {
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '28px',
            padding: '36px 28px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        },
        label: { display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '6px', fontWeight: 500 } as React.CSSProperties,
        input: {
            width: '100%', padding: '12px 14px', borderRadius: '14px',
            border: '1.5px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.07)', color: '#fff',
            fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const,
            transition: 'border-color 0.2s',
        } as React.CSSProperties,
        inputError: { borderColor: '#EF4444' } as React.CSSProperties,
        errorMsg: { color: '#EF4444', fontSize: '12px', marginTop: '4px' } as React.CSSProperties,
        btn: {
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
            color: '#fff', border: 'none', borderRadius: '16px',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(45,106,79,0.4)',
            transition: 'opacity 0.2s',
        } as React.CSSProperties,
    };

    // ── Formulario ─────────────────────────────────────────────────────────
    if (step === 'form') return (
        <div style={S.page}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '48px', marginBottom: '6px' }}>🎁</div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '3px' }}>Crea tu cuenta de cliente</div>
            </div>

            <div style={S.card}>
                <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '6px', margin: '0 0 4px' }}>
                    Tus datos
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: '0 0 24px' }}>
                    Solo necesitamos información básica para crear tu cuenta.
                </p>

                {globalError && (
                    <div style={{ background: '#EF444420', border: '1px solid #EF4444', borderRadius: '12px', padding: '12px 14px', marginBottom: '18px', color: '#FCA5A5', fontSize: '13px' }}>
                        {globalError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={S.label}>Nombre completo</label>
                        <input
                            style={{ ...S.input, ...(errors.name ? S.inputError : {}) }}
                            type="text" value={name} autoComplete="name"
                            placeholder="Valentina Gómez"
                            onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: undefined })); }}
                        />
                        {errors.name && <p style={S.errorMsg}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={S.label}>Correo electrónico</label>
                        <input
                            style={{ ...S.input, ...(errors.email ? S.inputError : {}) }}
                            type="email" value={email} autoComplete="email"
                            placeholder="tu@email.com"
                            onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })); }}
                        />
                        {errors.email && <p style={S.errorMsg}>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '8px' }}>
                        <label style={S.label}>Contraseña</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                style={{ ...S.input, paddingRight: '44px', ...(errors.password ? S.inputError : {}) }}
                                type={showPassword ? 'text' : 'password'} value={password} autoComplete="new-password"
                                placeholder="Mín. 8 caracteres"
                                onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: undefined })); }}
                            />
                            <button type="button" onClick={() => setShowPassword(v => !v)}
                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '16px', padding: '4px' }}>
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {/* Strength bar */}
                        {password && (
                            <div style={{ marginTop: '8px' }}>
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= strength.level ? strength.color : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: '11px', color: strength.color }}>{strength.label}</span>
                            </div>
                        )}
                        {errors.password && <p style={S.errorMsg}>{errors.password}</p>}
                    </div>

                    {/* Confirm */}
                    <div style={{ marginBottom: '28px', marginTop: '12px' }}>
                        <label style={S.label}>Confirmar contraseña</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                style={{ ...S.input, paddingRight: '44px', ...(errors.confirm ? S.inputError : {}) }}
                                type={showConfirm ? 'text' : 'password'} value={confirm} autoComplete="new-password"
                                placeholder="Repite tu contraseña"
                                onChange={e => { setConfirm(e.target.value); setErrors(er => ({ ...er, confirm: undefined })); }}
                            />
                            <button type="button" onClick={() => setShowConfirm(v => !v)}
                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '16px', padding: '4px' }}>
                                {showConfirm ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {errors.confirm && <p style={S.errorMsg}>{errors.confirm}</p>}
                    </div>

                    <button type="submit" style={{ ...S.btn, opacity: submitting ? 0.6 : 1 }} disabled={submitting}>
                        {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" style={{ color: '#40916C', fontWeight: 600, textDecoration: 'none' }}>Inicia sesión</Link>
                </div>

                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <Link to="/register/store" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', textDecoration: 'none' }}>
                        ¿Eres dueño de un local? Regístrate aquí
                    </Link>
                </div>
            </div>

            <style>{`input::placeholder { color: rgba(255,255,255,0.25); }`}</style>
        </div>
    );

    // ── Éxito ──────────────────────────────────────────────────────────────
    return (
        <div style={S.page}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '48px', marginBottom: '6px' }}>📬</div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit</div>
            </div>

            <div style={{ ...S.card, textAlign: 'center' }}>
                <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'rgba(45,106,79,0.2)', border: '2px solid #40916C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px', fontSize: '32px',
                }}>
                    ✓
                </div>
                <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: '0 0 10px' }}>
                    ¡Revisa tu correo!
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 12px' }}>
                    Enviamos un enlace de confirmación a <strong style={{ color: '#40916C' }}>{email}</strong>.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.5, margin: '0 0 30px' }}>
                    Haz clic en el enlace del correo para activar tu cuenta y luego inicia sesión.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    style={S.btn}
                >
                    Ir a iniciar sesión
                </button>
            </div>
        </div>
    );
};
