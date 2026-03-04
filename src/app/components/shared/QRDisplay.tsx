import React from 'react';

interface QRDisplayProps {
    code: string;
    size?: number;
    label?: string;
}

// Simple SVG-based QR placeholder that looks realistic
export const QRDisplay: React.FC<QRDisplayProps> = ({ code, size = 200, label }) => {
    // Generate a deterministic pattern from the code string
    const hash = code.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const cells = 21;
    const cellSize = size / cells;

    const pattern: boolean[][] = Array.from({ length: cells }, (_, r) =>
        Array.from({ length: cells }, (_, c) => {
            // Fixed finder patterns (top-left, top-right, bottom-left)
            const inFinder = (
                (r < 8 && c < 8) ||
                (r < 8 && c >= cells - 8) ||
                (r >= cells - 8 && c < 8)
            );
            if (inFinder) {
                const isBorder = r === 0 || r === 6 || c === 0 || c === 6 ||
                    (r >= cells - 8 && (r === cells - 8 || r === cells - 2 || c === 0 || c === 6)) ||
                    (c >= cells - 8 && (c === cells - 8 || c === cells - 2 || r === 0 || r === 6));
                const isInner = (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                    (r >= 2 && r <= 4 && c >= cells - 6 && c <= cells - 4) ||
                    (r >= cells - 6 && r <= cells - 4 && c >= 2 && c <= 4);
                return isBorder || isInner;
            }
            return ((r * cells + c + hash) % 3 !== 0) && ((r + c + hash) % 2 === 0);
        })
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
                background: '#fff',
                padding: '16px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                border: '2px solid rgba(0,0,0,0.06)',
            }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <rect width={size} height={size} fill="#fff" />
                    {pattern.map((row, r) =>
                        row.map((on, c) =>
                            on ? (
                                <rect
                                    key={`${r}-${c}`}
                                    x={c * cellSize}
                                    y={r * cellSize}
                                    width={cellSize}
                                    height={cellSize}
                                    fill="#1B1B2F"
                                    rx={cellSize * 0.1}
                                />
                            ) : null
                        )
                    )}
                </svg>
            </div>
            {label && (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Código de retiro</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1B1B2F', fontFamily: 'monospace' }}>{code}</div>
                </div>
            )}
        </div>
    );
};
