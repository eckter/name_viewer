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
    const maxNameLength = Math.max(...entries.map(entry => entry.name.length));
    const nameColumnWidth = `${maxNameLength}ch`;

    return (
        <div style={{ width: `${width}px` }}>
            {entries.map((entry, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <a href={`/${entry.name}`} style={{ display: 'inline-block', width: nameColumnWidth }}>
                        {entry.name}
                    </a>
                    <div style={{ flexGrow: 1, marginLeft: '10px', backgroundColor: '#eee' }}>
                        <div style={{
                            width: `${entry.relative_frequency * 100}%`,
                            height: '10px',
                            backgroundColor: 'blue',
                            borderRadius: '5px'
                        }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OtherSpellings;