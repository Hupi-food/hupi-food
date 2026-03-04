import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

type Step = 'form' | 'verification' | 'success';

interface FormErrors {
    ownerName?: string;
    email?: string;
    password?: string;
    confirm?: string;
    storeName?: string;
    storeCategory?: string;
    storeAddress?: string;
    phone?: string;
}

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const CATEGORIES = [
    'Panadería / Pastelería',
    'Restaurante',
    'Cafetería',
    'Comida rápida',
    'Frutería / Verdulería',
    'Sushi / Japonesa',
    'Pizzería',
    'Otro',
];

export const RegisterStoreScreen: React.FC = () => {
    const { registerStore, verifyEmail, resendVerification, pendingVerificationEmail } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState<Step>('form');

    // ── Datos del formulario ───────────────────────────────────────────────────
    const [ownerName, setOwnerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeCategory, setStoreCategory] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [globalError, setGlobalError] = useState('');

    // ── Verificación OTP ───────────────────────────────────────────────────────
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [verifying, setVerifying] = useState(false);
    const [verifyError, setVerifyError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const [currentEmail, setCurrentEmail] = useState('');

    useEffect(() => {
        if (pendingVerificationEmail) setCurrentEmail(pendingVerificationEmail);
    }, [pendingVerificationEmail]);

    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    // ── Validación ─────────────────────────────────────────────────────────────
    const validate = (): boolean => {
        const e: FormErrors = {};
        if (!ownerName.trim() || ownerName.trim().length < 3) e.ownerName = 'Ingresa tu nombre completo (mín. 3 caracteres).';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo electrónico no válido.';
        if (!PASSWORD_REGEX.test(password)) e.password = 'Mínimo 8 caracteres, una mayúscula, una minúscula y un número.';
        if (password !== confirm) e.confirm = 'Las contraseñas no coinciden.';
        if (!storeName.trim() || storeName.trim().length < 2) e.storeName = 'Ingresa el nombre del local.';
        if (!storeCategory) e.storeCategory = 'Selecciona una categoría.';
        if (!storeAddress.trim() || storeAddress.trim().length < 5) e.storeAddress = 'Ingresa la dirección del local.';
        if (!/^\+?[\d\s\-()]{7,}$/.test(phone)) e.phone = 'Número de teléfono no válido.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setGlobalError('');
        if (!validate()) return;
        setSubmitting(true);
        const result = await registerStore({
            ownerName: ownerName.trim(),
            email: email.trim().toLowerCase(),
            password,
            storeName: storeName.trim(),
            storeCategory,
            storeAddress: storeAddress.trim(),
            phone: phone.trim(),
        });
        setSubmitting(false);
        if (!result.success) { setGlobalError(result.error || 'Error al registrar.'); return; }
        setStep('verification');
    };

    // ── OTP handlers ───────────────────────────────────────────────────────────
    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const next = [...code];
        next[index] = value.slice(-1);
        setCode(next);
        setVerifyError('');
        if (value && index < 5) codeRefs.current[index + 1]?.focus();
    };

    const handleCodeKeyDown = (index: number, ev: React.KeyboardEvent) => {
        if (ev.key === 'Backspace' && !code[index] && index > 0) {
            codeRefs.current[index - 1]?.focus();
        }
    };

    const handleCodePaste = (ev: React.ClipboardEvent) => {
        ev.preventDefault();
        const pasted = ev.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const next = [...code];
        pasted.split('').forEach((ch, i) => { next[i] = ch; });
        setCode(next);
        codeRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleVerify = async () => {
        const fullCode = code.join('');
        if (fullCode.length < 6) { setVerifyError('Ingresa el código completo de 6 dígitos.'); return; }
        setVerifying(true);
        setVerifyError('');
        const result = await verifyEmail(currentEmail, fullCode);
        setVerifying(false);
        if (!result.success) { setVerifyError(result.error || 'Error al verificar.'); return; }
        setStep('success');
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;
        await resendVerification(currentEmail);
        setResendCooldown(60);
        setCode(['', '', '', '', '', '']);
        setVerifyError('');
        codeRefs.current[0]?.focus();
    };

    const passwordStrength = () => {
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

    // ── Estilos ────────────────────────────────────────────────────────────────
    const S = {
        page: {
            minHeight: '100dvh',
            background: 'linear-gradient(160deg, #0A0E27 0%, #1A1A0E 50%, #1C1408 100%)',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '32px 20px 48px',
            fontFamily: "'Inter', sans-serif",
        },
        card: {
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '28px',
            padding: '36px 28px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        },
        label: {
            display: 'block', color: 'rgba(255,255,255,0.7)',
            fontSize: '13px', marginBottom: '6px', fontWeight: 500,
        } as React.CSSProperties,
        input: {
            width: '100%', padding: '12px 14px', borderRadius: '14px',
            border: '1.5px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.07)', color: '#fff',
            fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const,
        } as React.CSSProperties,
        inputError: { borderColor: '#EF4444' } as React.CSSProperties,
        errorMsg: { color: '#EF4444', fontSize: '12px', marginTop: '4px' } as React.CSSProperties,
        btn: {
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #B45309, #D97706)',
            color: '#fff', border: 'none', borderRadius: '16px',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(180,83,9,0.4)',
            transition: 'opacity 0.2s',
        } as React.CSSProperties,
        sectionTitle: {
            color: 'rgba(255,255,255,0.4)', fontSize: '11px',
            textTransform: 'uppercase' as const, letterSpacing: '0.1em',
            margin: '24px 0 14px', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '8px',
        } as React.CSSProperties,
        divider: {
            flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)',
        } as React.CSSProperties,
    };

    // ── STEP 1: Formulario ─────────────────────────────────────────────────────
    if (step === 'form') return (
        <div style={S.page}>
            <div style={{ textAlign: 'center', marginBottom: '28px', width: '100%', maxWidth: '480px' }}>
                <div style={{ fontSize: '40px', marginBottom: '6px' }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ display: 'inline-block' }}>
                        <circle cx="24" cy="24" r="24" fill="rgba(180,83,9,0.25)" />
                        <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fontSize="22" fill="#D97706">H</text>
                    </svg>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit · Local</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                    Registra tu establecimiento
                </div>
            </div>

            <StepsIndicator current={0} />

            <div style={S.card}>
                {globalError && (
                    <div style={{
                        background: '#EF444420', border: '1px solid #EF4444',
                        borderRadius: '12px', padding: '12px 14px', marginBottom: '18px',
                        color: '#FCA5A5', fontSize: '13px',
                    }}>
                        {globalError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* ── Datos del propietario ── */}
                    <div style={S.sectionTitle}>
                        <span>Propietario</span>
                        <div style={S.divider} />
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={S.label}>Nombre completo del propietario</label>
                        <input
                            style={{ ...S.input, ...(errors.ownerName ? S.inputError : {}) }}
                            type="text" value={ownerName} autoComplete="name"
                            placeholder="Carlos Ramírez"
                            onChange={e => { setOwnerName(e.target.value); setErrors(er => ({ ...er, ownerName: undefined })); }}
                        />
                        {errors.ownerName && <p style={S.errorMsg}>{errors.ownerName}</p>}
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={S.label}>Correo electrónico</label>
                        <input
                            style={{ ...S.input, ...(errors.email ? S.inputError : {}) }}
                            type="email" value={email} autoComplete="email"
                            placeholder="tulocal@email.com"
                            onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })); }}
                        />
                        {errors.email && <p style={S.errorMsg}>{errors.email}</p>}
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={S.label}>Teléfono de contacto</label>
                        <input
                            style={{ ...S.input, ...(errors.phone ? S.inputError : {}) }}
                            type="tel" value={phone} autoComplete="tel"
                            placeholder="+57 300 000 0000"
                            onChange={e => { setPhone(e.target.value); setErrors(er => ({ ...er, phone: undefined })); }}
                        />
                        {errors.phone && <p style={S.errorMsg}>{errors.phone}</p>}
                    </div>

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
                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '4px' }}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
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

                    <div style={{ marginBottom: '14px', marginTop: '12px' }}>
                        <label style={S.label}>Confirmar contraseña</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                style={{ ...S.input, paddingRight: '44px', ...(errors.confirm ? S.inputError : {}) }}
                                type={showConfirm ? 'text' : 'password'} value={confirm} autoComplete="new-password"
                                placeholder="Repite tu contraseña"
                                onChange={e => { setConfirm(e.target.value); setErrors(er => ({ ...er, confirm: undefined })); }}
                            />
                            <button type="button" onClick={() => setShowConfirm(v => !v)}
                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '4px' }}
                                aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showConfirm ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.confirm && <p style={S.errorMsg}>{errors.confirm}</p>}
                    </div>

                    {/* ── Datos del local ── */}
                    <div style={S.sectionTitle}>
                        <span>Local</span>
                        <div style={S.divider} />
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={S.label}>Nombre del local</label>
                        <input
                            style={{ ...S.input, ...(errors.storeName ? S.inputError : {}) }}
                            type="text" value={storeName}
                            placeholder="Panadería El Trigal"
                            onChange={e => { setStoreName(e.target.value); setErrors(er => ({ ...er, storeName: undefined })); }}
                        />
                        {errors.storeName && <p style={S.errorMsg}>{errors.storeName}</p>}
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={S.label}>Categoría</label>
                        <select
                            value={storeCategory}
                            onChange={e => { setStoreCategory(e.target.value); setErrors(er => ({ ...er, storeCategory: undefined })); }}
                            style={{
                                ...S.input,
                                appearance: 'none' as const,
                                cursor: 'pointer',
                                ...(errors.storeCategory ? S.inputError : {}),
                            }}
                        >
                            <option value="" style={{ background: '#1a1a2e' }}>Selecciona una categoría...</option>
                            {CATEGORIES.map(c => (
                                <option key={c} value={c} style={{ background: '#1a1a2e' }}>{c}</option>
                            ))}
                        </select>
                        {errors.storeCategory && <p style={S.errorMsg}>{errors.storeCategory}</p>}
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={S.label}>Dirección del local</label>
                        <input
                            style={{ ...S.input, ...(errors.storeAddress ? S.inputError : {}) }}
                            type="text" value={storeAddress}
                            placeholder="Calle 50 # 20-35, Medellín"
                            onChange={e => { setStoreAddress(e.target.value); setErrors(er => ({ ...er, storeAddress: undefined })); }}
                        />
                        {errors.storeAddress && <p style={S.errorMsg}>{errors.storeAddress}</p>}
                    </div>

                    {/* Aviso de aprobación */}
                    <div style={{
                        background: 'rgba(180,83,9,0.12)', border: '1px solid rgba(217,119,6,0.3)',
                        borderRadius: '12px', padding: '12px 14px', marginBottom: '24px',
                    }}>
                        <p style={{ color: '#FCD34D', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
                            Tu solicitud quedara pendiente de aprobacion por el administrador de Hupit. Te notificaremos por correo cuando sea aprobada.
                        </p>
                    </div>

                    <button type="submit" style={{ ...S.btn, opacity: submitting ? 0.6 : 1 }} disabled={submitting}>
                        {submitting ? 'Enviando solicitud...' : 'Continuar'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" style={{ color: '#D97706', fontWeight: 600, textDecoration: 'none' }}>Inicia sesión</Link>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link to="/register" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textDecoration: 'none' }}>
                        ¿Eres cliente? Regístrate aquí
                    </Link>
                </div>
            </div>

            <style>{`input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); } select option { color: #fff; }`}</style>
        </div>
    );

    // ── STEP 2: Verificación OTP ───────────────────────────────────────────────
    if (step === 'verification') return (
        <div style={{ ...S.page, justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit · Local</div>
            </div>

            <StepsIndicator current={1} />

            <div style={S.card}>
                <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
                    Verifica tu correo
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '0 0 6px' }}>
                    Enviamos un código de 6 dígitos a:
                </p>
                <p style={{ color: '#D97706', fontSize: '14px', fontWeight: 600, margin: '0 0 24px', wordBreak: 'break-all' }}>
                    {currentEmail}
                </p>

                <div style={{
                    background: 'rgba(255,255,255,0.04)', borderRadius: '10px',
                    padding: '10px 12px', marginBottom: '20px',
                }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>
                        En entorno demo, el codigo aparece en la consola del navegador (F12).
                    </p>
                </div>

                {/* OTP */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }} onPaste={handleCodePaste}>
                    {code.map((digit, i) => (
                        <input
                            key={i}
                            ref={el => { codeRefs.current[i] = el; }}
                            type="text" inputMode="numeric" maxLength={1} value={digit}
                            onChange={e => handleCodeChange(i, e.target.value)}
                            onKeyDown={e => handleCodeKeyDown(i, e)}
                            style={{
                                width: '48px', height: '58px', textAlign: 'center',
                                fontSize: '24px', fontWeight: 700, color: '#fff',
                                background: digit ? 'rgba(180,83,9,0.2)' : 'rgba(255,255,255,0.07)',
                                border: `2px solid ${digit ? '#D97706' : 'rgba(255,255,255,0.15)'}`,
                                borderRadius: '14px', outline: 'none', caretColor: '#D97706',
                                transition: 'all 0.2s',
                            }}
                        />
                    ))}
                </div>

                {verifyError && (
                    <div style={{
                        background: '#EF444418', border: '1px solid #EF4444',
                        borderRadius: '10px', padding: '10px 12px', marginBottom: '16px',
                        color: '#FCA5A5', fontSize: '13px', textAlign: 'center',
                    }}>
                        {verifyError}
                    </div>
                )}

                <button
                    onClick={handleVerify}
                    disabled={verifying || code.join('').length < 6}
                    style={{ ...S.btn, opacity: (verifying || code.join('').length < 6) ? 0.5 : 1, marginBottom: '16px' }}
                >
                    {verifying ? 'Verificando...' : 'Verificar correo'}
                </button>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={handleResend}
                        disabled={resendCooldown > 0}
                        style={{ background: 'none', border: 'none', cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer', color: resendCooldown > 0 ? 'rgba(255,255,255,0.3)' : '#D97706', fontSize: '13px', fontWeight: 600 }}
                    >
                        {resendCooldown > 0 ? `Reenviar en ${resendCooldown}s` : 'Reenviar código'}
                    </button>
                </div>
            </div>
        </div>
    );

    // ── STEP 3: Éxito ──────────────────────────────────────────────────────────
    return (
        <div style={{ ...S.page, justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit · Local</div>
            </div>

            <StepsIndicator current={2} />

            <div style={{ ...S.card, textAlign: 'center' }}>
                <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'rgba(180,83,9,0.2)', border: '2px solid #D97706',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: '0 0 10px' }}>
                    Solicitud enviada
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 12px' }}>
                    Tu correo fue verificado exitosamente. Tu cuenta esta en revision.
                </p>
                <div style={{
                    background: 'rgba(180,83,9,0.1)', border: '1px solid rgba(217,119,6,0.25)',
                    borderRadius: '12px', padding: '14px 16px', marginBottom: '28px',
                    color: '#FCD34D', fontSize: '13px', lineHeight: 1.5,
                }}>
                    El equipo de Hupit revisara tu solicitud y te notificara por correo cuando sea aprobada para que puedas empezar a publicar tus Hupit Boxes.
                </div>
                <button
                    onClick={() => navigate('/login')}
                    style={S.btn}
                >
                    Ir al inicio de sesión
                </button>
            </div>
        </div>
    );
};

// ── Indicador de pasos ─────────────────────────────────────────────────────────
const STEPS = ['Datos', 'Verificación', 'Confirmación'];
const ACCENT = '#D97706';

const StepsIndicator: React.FC<{ current: number }> = ({ current }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', width: '100%', maxWidth: '480px' }}>
        {STEPS.map((label, i) => (
            <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: i < current ? ACCENT : i === current ? 'rgba(180,83,9,0.3)' : 'rgba(255,255,255,0.08)',
                        border: `2px solid ${i <= current ? ACCENT : 'rgba(255,255,255,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', fontWeight: 700,
                        color: i <= current ? '#fff' : 'rgba(255,255,255,0.3)',
                        transition: 'all 0.3s',
                    }}>
                        {i < current ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        ) : i + 1}
                    </div>
                    <span style={{ fontSize: '10px', color: i <= current ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)', fontWeight: i === current ? 700 : 400 }}>
                        {label}
                    </span>
                </div>
                {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: '2px', background: i < current ? ACCENT : 'rgba(255,255,255,0.1)', margin: '0 6px', marginBottom: '18px', transition: 'background 0.3s' }} />
                )}
            </React.Fragment>
        ))}
    </div>
);
