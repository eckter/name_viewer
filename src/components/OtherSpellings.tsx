import React from 'react';
import {OtherSpellingEntry} from "../data";

interface OtherSpellingsProps {
    width: number;
    entries: OtherSpellingEntry[];
}

const OtherSpellings: React.FC<OtherSpellingsProps> = ({ width, entries }) => {
    if (entries.length <= 1) {
        return null;
    }
    entries.sort((a, b) => b.relative_frequency - a.relative_frequency)
    const maxNameLength = Math.max(...entries.map(entry => entry.name.length));
    const nameColumnWidth = `${maxNameLength}ch`;

    return (
        <div style={{ width: `${width}px` }}>
            {entries.map((entry, index) => (
                <div key={index} className="other-spelling-item">
                    <a href={`/${entry.name}`} className="other-spelling-link" style={{ display: 'inline-block', width: nameColumnWidth }}>
                        {entry.name}
                    </a>
                    <div className="frequency-bar-container">
                        <div className="frequency-bar" style={{
                            width: `${entry.relative_frequency * 100}%`,
                        }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OtherSpellings;