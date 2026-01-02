import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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
        <LineChart width={width} height={height} data={allYears}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line dataKey="count" stroke="#8884d8" dot={false} />
        </LineChart>
    );
};

export default TimePlot;