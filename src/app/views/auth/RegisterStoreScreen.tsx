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
    'Supermercado',
    'Sushi / Comida asiática',
    'Pizzería',
    'Comida saludable',
    'Otro',
];

const S = {
    page: {
        minHeight: '100dvh',
        background: 'linear-gradient(160deg, #0A0E27 0%, #1F1B0E 100%)',
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
        maxWidth: '480px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
    },
    label: {
        display: 'block',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '13px',
        marginBottom: '6px',
        fontWeight: 500,
    } as React.CSSProperties,
    input: {
        width: '100%',
        padding: '12px 14px',
        borderRadius: '14px',
        border: '1.5px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.07)',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        boxSizing: 'border-box' as const,
        transition: 'border-color 0.2s',
    } as React.CSSProperties,
    inputError: { borderColor: '#EF4444' } as React.CSSProperties,
    errorMsg: { color: '#EF4444', fontSize: '12px', marginTop: '4px' } as React.CSSProperties,
    btn: {
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(135deg, #F77F00, #D62828)',
        color: '#fff',
        border: 'none',
        borderRadius: '16px',
        fontSize: '16px',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(247,127,0,0.35)',
        transition: 'opacity 0.2s',
    } as React.CSSProperties,
    select: {
        width: '100%',
        padding: '12px 14px',
        borderRadius: '14px',
        border: '1.5px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.07)',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        boxSizing: 'border-box' as const,
        appearance: 'none' as const,
        cursor: 'pointer',
    } as React.CSSProperties,
};

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
        if (!storeName.trim() || storeName.trim().length < 2) e.storeName = 'Ingresa el nombre del local (mín. 2 caracteres).';
        if (!storeCategory) e.storeCategory = 'Selecciona una categoría.';
        if (!storeAddress.trim() || storeAddress.trim().length < 5) e.storeAddress = 'Ingresa la dirección del local.';
        if (!/^\+?\d{7,15}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Número de teléfono no válido.';
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

    // ── Código OTP ─────────────────────────────────────────────────────────────
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

    // ── STEP 1: Formulario ─────────────────────────────────────────────────────
    if (step === 'form') return (
        <div style={S.page}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '46px', marginBottom: '6px' }}>🏪</div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '3px' }}>Registro de dueño de local</div>
            </div>

            <StepsIndicator current={0} />

            <div style={S.card}>
                <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 4px' }}>Datos del local y propietario</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: '0 0 22px' }}>
                    Tu solicitud será revisada por el administrador antes de activarse.
                </p>

                {globalError && (
                    <div style={{ background: '#EF444420', border: '1px solid #EF4444', borderRadius: '12px', padding: '12px 14px', marginBottom: '18px', color: '#FCA5A5', fontSize: '13px' }}>
                        {globalError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* ── Sección: Propietario ── */}
                    <SectionDivider label="Datos del propietario" icon="👤" color="#F77F00" />

                    <Field label="Nombre completo" error={errors.ownerName}>
                        <input
                            style={{ ...S.input, ...(errors.ownerName ? S.inputError : {}) }}
                            type="text" value={ownerName} autoComplete="name"
                            placeholder="Carlos Rodríguez"
                            onChange={e => { setOwnerName(e.target.value); setErrors(er => ({ ...er, ownerName: undefined })); }}
                        />
                    </Field>

                    <Field label="Correo electrónico" error={errors.email}>
                        <input
                            style={{ ...S.input, ...(errors.email ? S.inputError : {}) }}
                            type="email" value={email} autoComplete="email"
                            placeholder="tu@local.com"
                            onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })); }}
                        />
                    </Field>

                    <Field label="Contraseña" error={errors.password}>
                        <div style={{ position: 'relative' }}>
                            <input
                                style={{ ...S.input, paddingRight: '44px', ...(errors.password ? S.inputError : {}) }}
                                type={showPassword ? 'text' : 'password'} value={password} autoComplete="new-password"
                                placeholder="Mín. 8 caracteres"
                                onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: undefined })); }}
                            />
                            <ToggleEye show={showPassword} onToggle={() => setShowPassword(v => !v)} />
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
                    </Field>

                    <Field label="Confirmar contraseña" error={errors.confirm}>
                        <div style={{ position: 'relative' }}>
                            <input
                                style={{ ...S.input, paddingRight: '44px', ...(errors.confirm ? S.inputError : {}) }}
                                type={showConfirm ? 'text' : 'password'} value={confirm} autoComplete="new-password"
                                placeholder="Repite tu contraseña"
                                onChange={e => { setConfirm(e.target.value); setErrors(er => ({ ...er, confirm: undefined })); }}
                            />
                            <ToggleEye show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
                        </div>
                    </Field>

                    {/* ── Sección: Local ── */}
                    <SectionDivider label="Datos del local" icon="🍽️" color="#F77F00" />

                    <Field label="Nombre del local" error={errors.storeName}>
                        <input
                            style={{ ...S.input, ...(errors.storeName ? S.inputError : {}) }}
                            type="text" value={storeName}
                            placeholder="Panadería La Esperanza"
                            onChange={e => { setStoreName(e.target.value); setErrors(er => ({ ...er, storeName: undefined })); }}
                        />
                    </Field>

                    <Field label="Categoría" error={errors.storeCategory}>
                        <div style={{ position: 'relative' }}>
                            <select
                                style={{ ...S.select, ...(errors.storeCategory ? S.inputError : {}) }}
                                value={storeCategory}
                                onChange={e => { setStoreCategory(e.target.value); setErrors(er => ({ ...er, storeCategory: undefined })); }}
                            >
                                <option value="" style={{ background: '#1B1B2F' }}>Selecciona una categoría</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat} style={{ background: '#1B1B2F' }}>{cat}</option>
                                ))}
                            </select>
                            <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', fontSize: '12px' }}>▼</span>
                        </div>
                    </Field>

                    <Field label="Dirección del local" error={errors.storeAddress}>
                        <input
                            style={{ ...S.input, ...(errors.storeAddress ? S.inputError : {}) }}
                            type="text" value={storeAddress}
                            placeholder="Calle 80 #45-12, Bogotá"
                            onChange={e => { setStoreAddress(e.target.value); setErrors(er => ({ ...er, storeAddress: undefined })); }}
                        />
                    </Field>

                    <Field label="Teléfono de contacto" error={errors.phone}>
                        <input
                            style={{ ...S.input, ...(errors.phone ? S.inputError : {}) }}
                            type="tel" value={phone} autoComplete="tel"
                            placeholder="+57 300 123 4567"
                            onChange={e => { setPhone(e.target.value); setErrors(er => ({ ...er, phone: undefined })); }}
                        />
                    </Field>

                    {/* Aviso de aprobación */}
                    <div style={{ background: 'rgba(247,127,0,0.1)', border: '1px solid rgba(247,127,0,0.3)', borderRadius: '12px', padding: '12px 14px', marginBottom: '24px', marginTop: '4px' }}>
                        <p style={{ color: 'rgba(255,200,100,0.9)', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>
                            Tu cuenta sera revisada por el equipo de Hupit. Recibirás confirmación por correo una vez aprobada.
                        </p>
                    </div>

                    <button type="submit" style={{ ...S.btn, opacity: submitting ? 0.6 : 1 }} disabled={submitting}>
                        {submitting ? 'Enviando solicitud...' : 'Solicitar registro'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" style={{ color: '#F77F00', fontWeight: 600, textDecoration: 'none' }}>Inicia sesión</Link>
                </div>

                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link to="/register" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textDecoration: 'none' }}>
                        ¿Eres cliente? Regístrate aquí
                    </Link>
                </div>
            </div>

            <style>{`
        input::placeholder, select option[value=""] { color: rgba(255,255,255,0.25); }
        select option { color: #fff; }
      `}</style>
        </div>
    );

    // ── STEP 2: Verificación de correo ─────────────────────────────────────────
    if (step === 'verification') return (
        <div style={S.page}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '48px', marginBottom: '6px' }}>📬</div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit</div>
            </div>

            <StepsIndicator current={1} />

            <div style={S.card}>
                <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>Verifica tu correo</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '0 0 6px' }}>
                    Enviamos un código de 6 dígitos a:
                </p>
                <p style={{ color: '#F77F00', fontSize: '14px', fontWeight: 600, margin: '0 0 24px', wordBreak: 'break-all' }}>
                    {currentEmail}
                </p>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '10px 12px', marginBottom: '20px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>
                        En entorno demo, el código aparece en la consola del navegador (F12).
                    </p>
                </div>

                {/* OTP Input */}
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
                                background: digit ? 'rgba(247,127,0,0.2)' : 'rgba(255,255,255,0.07)',
                                border: `2px solid ${digit ? '#F77F00' : 'rgba(255,255,255,0.15)'}`,
                                borderRadius: '14px', outline: 'none', caretColor: '#F77F00',
                                transition: 'all 0.2s',
                            }}
                        />
                    ))}
                </div>

                {verifyError && (
                    <div style={{ background: '#EF444418', border: '1px solid #EF4444', borderRadius: '10px', padding: '10px 12px', marginBottom: '16px', color: '#FCA5A5', fontSize: '13px', textAlign: 'center' }}>
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
                        style={{ background: 'none', border: 'none', cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer', color: resendCooldown > 0 ? 'rgba(255,255,255,0.3)' : '#F77F00', fontSize: '13px', fontWeight: 600 }}
                    >
                        {resendCooldown > 0 ? `Reenviar en ${resendCooldown}s` : 'Reenviar código'}
                    </button>
                </div>
            </div>
        </div>
    );

    // ── STEP 3: Éxito / Pendiente de aprobación ────────────────────────────────
    return (
        <div style={S.page}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '48px', marginBottom: '6px' }}>✅</div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Hupit</div>
            </div>

            <StepsIndicator current={2} />

            <div style={{ ...S.card, textAlign: 'center' }}>
                <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'rgba(247,127,0,0.15)', border: '2px solid #F77F00',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px', fontSize: '30px',
                }}>
                    🏪
                </div>
                <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: '0 0 10px' }}>
                    Solicitud enviada
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px' }}>
                    Tu correo fue verificado exitosamente. Tu cuenta de local está <strong style={{ color: '#F59E0B' }}>pendiente de aprobación</strong> por el equipo de Hupit.
                </p>
                <div style={{ background: 'rgba(247,127,0,0.1)', border: '1px solid rgba(247,127,0,0.3)', borderRadius: '14px', padding: '14px 16px', marginBottom: '28px' }}>
                    <p style={{ color: 'rgba(255,200,100,0.9)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                        Te notificaremos por correo cuando el administrador apruebe tu local. El proceso toma máximo 24 horas hábiles.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/login')}
                    style={S.btn}
                >
                    Volver al inicio de sesión
                </button>
            </div>
        </div>
    );
};

// ── Componentes auxiliares ─────────────────────────────────────────────────────

const Field: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
    <div style={{ marginBottom: '16px' }}>
        <label style={S.label}>{label}</label>
        {children}
        {error && <p style={S.errorMsg}>{error}</p>}
    </div>
);

const SectionDivider: React.FC<{ label: string; icon: string; color: string }> = ({ label, icon, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '20px 0 16px' }}>
        <span style={{ fontSize: '16px' }}>{icon}</span>
        <span style={{ color, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
        <div style={{ flex: 1, height: '1px', background: `${color}30` }} />
    </div>
);

const ToggleEye: React.FC<{ show: boolean; onToggle: () => void }> = ({ show, onToggle }) => (
    <button
        type="button"
        onClick={onToggle}
        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '16px', padding: '4px' }}
        aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
    >
        {show ? '🙈' : '👁️'}
    </button>
);

const STEPS = ['Datos', 'Verificación', 'Confirmación'];

const StepsIndicator: React.FC<{ current: number }> = ({ current }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        {STEPS.map((label, i) => (
            <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: i < current ? '#F77F00' : i === current ? 'rgba(247,127,0,0.4)' : 'rgba(255,255,255,0.1)',
                        border: `2px solid ${i <= current ? '#F77F00' : 'rgba(255,255,255,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', fontWeight: 700,
                        color: i <= current ? '#fff' : 'rgba(255,255,255,0.3)',
                        transition: 'all 0.3s',
                    }}>
                        {i < current ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '10px', color: i <= current ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)', fontWeight: i === current ? 700 : 400 }}>
                        {label}
                    </span>
                </div>
                {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: '2px', background: i < current ? '#F77F00' : 'rgba(255,255,255,0.1)', margin: '0 6px', marginBottom: '18px', transition: 'background 0.3s' }} />
                )}
            </React.Fragment>
        ))}
    </div>
);
