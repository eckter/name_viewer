import React, { useState } from 'react';

interface GenderScaleProps {
    width: number;
    height: number;
    value: number;
}

const GenderScale: React.FC<GenderScaleProps> = ({ width, height, value }) => {
    const labelSpace = 20;
    const scaleWidth = width - 2 * labelSpace;
    const position = value * scaleWidth + labelSpace;
    const percentage = Math.round(value * 100);
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="tooltip" style={{ position: 'relative', width: `${width}px`, height: `${height}px`, display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}>M</span>
            <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}>F</span>
            <div style={{ position: 'absolute', left: `${labelSpace}px`, width: `${scaleWidth}px`, height: '2px', backgroundColor: '#ccc', borderRadius: '1px' }} />
            <div
                className="tooltip"
                style={{
                    position: 'absolute',
                    left: `${position}px`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'var(--accent-color)',
                    borderRadius: '50%',
                    border: '2px solid var(--accent-color)',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {showTooltip && (
                    <div className="tooltiptext">
                        {percentage}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenderScale;