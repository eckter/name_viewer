import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';

interface GenderScaleProps {
    width: number;
    height: number;
    relativeFemale: number; // [0-1]
}

const GenderPiePlot: React.FC<GenderScaleProps> = ({ width, height, relativeFemale }) => {
    const relativeMale = 1 - relativeFemale;
    
    // Prepare data for the pie chart with softer pastel colors
    const data = [
        { name: 'Female', value: relativeFemale, color: '#f4c2c2' },
        { name: 'Male', value: relativeMale, color: '#c2d4f4' }
    ];
    
    // Custom tooltip formatter
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                }}>
                    <p style={{ color: 'var(--text-color)', margin: 0 }}>
                        {payload[0].name}: {(payload[0].value * 100).toFixed(1)}%
                    </p>
                </div>
            );
        }
        return null;
    };
    
    // Custom label for the center of the pie chart
    const renderCustomizedLabel = ({ cx, cy }: any) => {
        return (
            <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: '0.9rem', fontWeight: 'bold', fill: 'var(--text-color)' }}
            >
                {`${Math.round(relativeMale * 100)}%`}
            </text>
        );
    };
    
    return (
        <div style={{ width: '100%', height: height }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={40}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GenderPiePlot;