import React, {FC, useState} from 'react';
import { useParams } from 'react-router-dom';
import {getNameData, getNameRanking, getRecentNameRanking, NameData} from "./data";
import TimePlot from "./components/TimePlot";
import OtherSpellings from "./components/OtherSpellings";
import GenderPiePlot from "./components/GenderPiePlot";
import {randomRedirect} from "./RedirectPage";

const App: FC = () => {
    const { pageId } = useParams<{ pageId: string }>();
    if (pageId == undefined)
        return;

    const [nameData, setNameData] = useState<NameData | null>(null)
    const [nameFound, setNameFound] = useState<Boolean | null>(null)
    const [nameRanking, setNameRanking] = useState<number | null>(null)
    const [recentNameRanking, setRecentNameRanking] = useState<number | null>(null)

    let name = nameData?.name ?? pageId.charAt(0).toUpperCase() + pageId.slice(1).toLowerCase()
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    getNameData(name)
        .then((nameData) => {
            setNameData(nameData)
            setNameFound(nameData != null)
        })

    if (!nameFound) {
        return (
            <div className="not-found-container">
                <h2 className="not-found-title">{name}</h2>
                <div>Prénom non trouvé</div>
            </div>
        );
    }

    if (nameData == null) {
        return (
            <div className="loading-container">
                <h2>{name}</h2>
                <div>Chargement...</div>
            </div>
        )
    }
    
    getNameRanking(nameData.count_per_k)
        .then(setNameRanking)
    getRecentNameRanking(nameData.recent_count_per_k)
        .then(setRecentNameRanking)

    return (
        <div className="app-container">
            <div className="app-header">
                <div>
                    <h1 className="app-title">{name}</h1>
                    <p className="app-subtitle">Prononciation: {nameData.phonetic}</p>
                </div>
                <button className="random-button header-button" onClick={randomRedirect}>Prénom aléatoire</button>
            </div>
            
            {nameRanking != null && recentNameRanking != null && (
                <div className="statistics-grid">
                    <div className="stat-card">
                        <div className="stat-label">Popularité (80 ans)</div>
                        <div className="stat-value">{nameData.count_per_k.toFixed(2)} ‰</div>
                        <div className="stat-label">Position: {nameRanking}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Popularité (10 ans)</div>
                        <div className="stat-value">{nameData.recent_count_per_k.toFixed(2)} ‰</div>
                        <div className="stat-label">Position: {recentNameRanking}</div>
                    </div>
                </div>
            )}

            <div className="chart-container">
                <h3 className="section-title">Évolution dans le temps</h3>
                <TimePlot data={nameData.years} height={300} width={800}/>
            </div>

            {nameData.other_spellings.length > 1 && (
                <div className="other-spellings-container">
                    <h3 className="other-spellings-title">Autres orthographes</h3>
                    <OtherSpellings width={800} entries={nameData.other_spellings}/>
                </div>
            )}

            {nameData.other_spellings.length > 1 ? (
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <div className="gender-scale-container" style={{ flex: 1, minWidth: '250px', padding: '15px' }}>
                        <h3 className="gender-scale-title" style={{ marginBottom: '10px', fontSize: '1rem' }}>Genre (orthographe)</h3>
                        <GenderPiePlot width={250} height={160} relativeFemale={nameData.F}/>
                    </div>
                    <div className="gender-scale-container" style={{ flex: 1, minWidth: '250px', padding: '15px' }}>
                        <h3 className="gender-scale-title" style={{ marginBottom: '10px', fontSize: '1rem' }}>Genre (toutes)</h3>
                        <GenderPiePlot width={250} height={160} relativeFemale={nameData.phonetic_relative_f}/>
                    </div>
                </div>
            ) : (
                <div className="gender-scale-container" style={{ padding: '15px' }}>
                    <h3 className="gender-scale-title" style={{ marginBottom: '10px', fontSize: '1rem' }}>Répartition de genre</h3>
                    <GenderPiePlot width={250} height={160} relativeFemale={nameData.F}/>
                </div>
            )}
        </div>
    );
};

export default App;