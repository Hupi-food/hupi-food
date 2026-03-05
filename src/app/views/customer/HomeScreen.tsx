import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { BottomNav } from '../../components/shared/BottomNav';
import { HupiBoxCard } from '../../components/shared/HupiBoxCard';
import { HUPI_BOXES, STORES } from '../../data/mockData';

const CATEGORIES = ['Todo', 'Panadería', 'Restaurante', 'Cafetería', 'Japonesa'];

export const HomeScreen: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Todo');
    const [showMap, setShowMap] = useState(true);

    // Optimized filtering: only recalculate when activeCategory changes.
    // This avoids redundant filtering on every render (e.g., when map is toggled).
    const filtered = useMemo(() => {
        const availableBoxes = HUPI_BOXES.filter(b => b.isAvailable);
        return activeCategory === 'Todo'
            ? availableBoxes
            : availableBoxes.filter(b => b.storeCategory === activeCategory);
    }, [activeCategory]);

    return (
        <div style={{
            minHeight: '100dvh',
            background: '#F5F5F7',
            fontFamily: "'Inter', 'Outfit', sans-serif",
            paddingBottom: '80px',
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(160deg, #1B1B2F 0%, #2D6A4F 100%)',
                padding: '52px 20px 20px',
                position: 'relative',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Buenos días 👋</div>
                        <div style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>{user?.name}</div>
                    </div>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px', fontWeight: 700, color: '#fff', border: '2px solid rgba(255,255,255,0.2)',
                    }}>
                        {user?.avatar?.charAt(0)}
                    </div>
                </div>

                {/* Search bar */}
                <div style={{
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
                    borderRadius: '14px', padding: '10px 14px',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    border: '1px solid rgba(255,255,255,0.15)',
                }}>
                    <span style={{ fontSize: '18px' }}>🔍</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Busca tiendas o tipos de caja...</span>
                </div>
            </div>

            {/* Map Toggle */}
            <div style={{
                background: showMap ? '#fff' : 'transparent',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
                maxHeight: showMap ? '240px' : '0',
            }}>
                <div style={{ position: 'relative' }}>
                    {/* Google Maps Embed */}
                    <iframe
                        title="Hupit Nearby Stores"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15907.81!2d-74.0521!3d4.6616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1!5m2!1ses!2sco"
                        style={{ width: '100%', height: '200px', border: 'none', display: 'block' }}
                        loading="lazy"
                        allowFullScreen
                    />
                    {/* Store pins overlay */}
                    <div style={{
                        position: 'absolute', top: '10px', left: '10px',
                        background: 'rgba(255,255,255,0.95)', borderRadius: '10px',
                        padding: '6px 10px', fontSize: '12px', fontWeight: 600, color: '#1B1B2F',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}>
                        📍 {STORES.filter(s => s.status === 'active').length} tiendas activas cerca
                    </div>
                </div>
            </div>

            {/* Toggle map button */}
            <button
                onClick={() => setShowMap(!showMap)}
                style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    margin: '12px 20px',
                    background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '10px', padding: '8px 14px',
                    fontSize: '13px', fontWeight: 600, color: '#2D6A4F', cursor: 'pointer',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
            >
                <span>{showMap ? '📋' : '🗺️'}</span>
                {showMap ? 'Ver lista' : 'Ver mapa'}
            </button>

            {/* Categories */}
            <div style={{ padding: '0 20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '7px 16px', borderRadius: '20px', whiteSpace: 'nowrap',
                                border: activeCategory === cat ? '2px solid #2D6A4F' : '1.5px solid rgba(0,0,0,0.09)',
                                background: activeCategory === cat ? '#2D6A4F' : '#fff',
                                color: activeCategory === cat ? '#fff' : '#555',
                                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                                transition: 'all 0.15s',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Boxes */}
            <div style={{ padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1B1B2F', margin: 0 }}>
                        Cajas disponibles 🎁
                    </h2>
                    <span style={{ fontSize: '13px', color: '#717182' }}>{filtered.length} disponibles</span>
                </div>

                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#aaa' }}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🫙</div>
                        <div style={{ fontWeight: 600 }}>Sin cajas en esta categoría</div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {filtered.map(box => (
                            <HupiBoxCard
                                key={box.id}
                                box={box}
                                onClick={() => navigate(`/app/box/${box.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
};
