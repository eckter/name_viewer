import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
    year: number;
    count: number;
}

interface CountPlotProps {
    data: Array<[number, number]>;
    width: number;
    height: number;
}

const TimePlot: React.FC<CountPlotProps> = ({ data, width, height }) => {
    const years = data.map(([year]) => year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const allYears: DataPoint[] = [];
    for (let year = minYear; year <= maxYear; year++) {
        const found = data.find(([y]) => y === year);
        allYears.push({ year, count: found ? found[1] : 0 });
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={allYears}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="year" stroke="var(--text-color)" />
                <YAxis stroke="var(--text-color)" />
                <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }} 
                    labelStyle={{ color: 'var(--text-color)' }}
                    isAnimationActive={false}
                />
                <Line 
                    dataKey="count" 
                    stroke="var(--primary-color)" 
                    strokeWidth={2} 
                    dot={{ stroke: 'var(--primary-color)', strokeWidth: 2, fill: 'var(--card-bg)' }}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TimePlot;