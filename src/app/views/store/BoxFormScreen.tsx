import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { HUPI_BOXES, type BoxTier } from '../../data/mockData';

export const BoxFormScreen: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = id !== 'new';
    const existingBox = isEditing ? HUPI_BOXES.find(b => b.id === id) : null;

    const [tier, setTier] = useState<BoxTier>(existingBox?.tier || 'bronze');
    const [price, setPrice] = useState(existingBox?.price?.toString() || '');
    const [originalValue, setOriginalValue] = useState(existingBox?.originalValue?.toString() || '');
    const [quantity, setQuantity] = useState(existingBox?.quantity?.toString() || '1');
    const [pickupStart, setPickupStart] = useState(existingBox?.pickupStart || '18:00');
    const [pickupEnd, setPickupEnd] = useState(existingBox?.pickupEnd || '20:00');
    const [description, setDescription] = useState(existingBox?.description || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate save
        navigate('/store/inventory');
    };

    return (
        <div style={{ minHeight: '100dvh', background: '#F5F5F7', fontFamily: "'Inter', 'Outfit', sans-serif" }}>
            {/* Header */}
            <div style={{ background: '#fff', padding: '52px 20px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
                <button onClick={() => navigate(-1)} style={{ background: '#F3F4F6', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px' }}>←</button>
                <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#1B1B2F' }}>
                    {isEditing ? 'Editar Hupit Box' : 'Nueva Hupit Box'}
                </h1>
            </div>

            <div style={{ padding: '20px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Tier Selection */}
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1B1B2F', marginBottom: '10px' }}>Nivel de la caja 🎁</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {[
                                { id: 'bronze', label: 'Bronce', accent: '#CD7F32' },
                                { id: 'silver', label: 'Plata', accent: '#808080' },
                                { id: 'gold', label: 'Oro', accent: '#D4AF37' },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setTier(t.id as BoxTier)}
                                    style={{
                                        padding: '12px 8px', borderRadius: '14px', border: tier === t.id ? `2px solid ${t.accent}` : '2px solid transparent',
                                        background: tier === t.id ? `${t.accent}15` : '#fff', color: tier === t.id ? t.accent : '#717182',
                                        fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.15s'
                                    }}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1B1B2F', marginBottom: '6px' }}>Precio ($)</label>
                            <input type="number" required value={price} onChange={e => setPrice(e.target.value)} placeholder="0" style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #E5E7EB', background: '#fff', fontSize: '16px', outline: 'none', 'boxSizing': 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1B1B2F', marginBottom: '6px' }}>Valor Original ($)</label>
                            <input type="number" required value={originalValue} onChange={e => setOriginalValue(e.target.value)} placeholder="0" style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #E5E7EB', background: '#fff', fontSize: '16px', outline: 'none', 'boxSizing': 'border-box' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1B1B2F', marginBottom: '6px' }}>Cantidad Disponible</label>
                        <input type="number" required min="1" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="1" style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #E5E7EB', background: '#fff', fontSize: '16px', outline: 'none', 'boxSizing': 'border-box' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1B1B2F', marginBottom: '6px' }}>Hora inicio recolección</label>
                            <input type="time" required value={pickupStart} onChange={e => setPickupStart(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #E5E7EB', background: '#fff', fontSize: '16px', outline: 'none', 'boxSizing': 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1B1B2F', marginBottom: '6px' }}>Hora fin recolección</label>
                            <input type="time" required value={pickupEnd} onChange={e => setPickupEnd(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #E5E7EB', background: '#fff', fontSize: '16px', outline: 'none', 'boxSizing': 'border-box' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1B1B2F', marginBottom: '6px' }}>Descripción del contenido</label>
                        <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Ej: Dos croissants y un pan campesino del día anterior pero perfectos." style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #E5E7EB', background: '#fff', fontSize: '15px', outline: 'none', resize: 'vertical', 'boxSizing': 'border-box' }} />
                    </div>

                    <button
                        type="submit"
                        style={{ width: '100%', padding: '16px', marginTop: '10px', background: 'linear-gradient(135deg, #2D6A4F, #40916C)', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(45,106,79,0.3)', marginBottom: '40px' }}
                    >
                        {isEditing ? 'Guardar Cambios' : 'Crear Hupit Box'}
                    </button>
                </form>
            </div>
        </div>
    );
};
