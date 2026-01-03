import React, {FC, useState, useEffect} from "react";
import {getAllAcceptedNames, getAllRejectedNames, clearAllTracking} from "./nameTracking";
import {randomRedirect} from "./RedirectPage";

const ListNames: FC = () => {
    const acceptedNames = getAllAcceptedNames();
    const rejectedNames = getAllRejectedNames();
    
    // Gender filter state
    const [includeBoys, setIncludeBoys] = useState<boolean>(() => {
        const saved = localStorage.getItem('includeBoys');
        return saved === null ? true : JSON.parse(saved);
    });
    
    const [includeGirls, setIncludeGirls] = useState<boolean>(() => {
        const saved = localStorage.getItem('includeGirls');
        return saved === null ? true : JSON.parse(saved);
    });
    
    // Save to local storage when filters change
    useEffect(() => {
        localStorage.setItem('includeBoys', JSON.stringify(includeBoys));
    }, [includeBoys]);
    
    useEffect(() => {
        localStorage.setItem('includeGirls', JSON.stringify(includeGirls));
    }, [includeGirls]);
    
    // Enhanced reset function that also clears gender filters
    const handleReset = () => {
        clearAllTracking();
        localStorage.removeItem('includeBoys');
        localStorage.removeItem('includeGirls');
        setIncludeBoys(true);
        setIncludeGirls(true);
    };

    function clearTracking() {
        clearAllTracking()
        window.location.reload();
    }

    return (
        <div className="app-container">
            <div className="app-header" style={{ marginBottom: '20px' }}>
                <h1 className="app-title">Liste des noms</h1>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button className="random-button header-button" onClick={randomRedirect}>Prénom aléatoire</button>
                    <button className="random-button header-button" onClick={handleReset}>Réinitialiser</button>
                </div>
            </div>
            
            {/* Gender filter checkboxes */}
            <div style={{ 
                backgroundColor: 'var(--card-bg)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px',
                padding: '15px', 
                marginBottom: '20px',
                display: 'flex', 
                gap: '20px',
                alignItems: 'center'
            }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input 
                        type="checkbox" 
                        checked={includeGirls} 
                        onChange={(e) => setIncludeGirls(e.target.checked)} 
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ color: 'var(--text-color)', fontSize: '0.95rem' }}>Inclure les prénoms de filles</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input 
                        type="checkbox" 
                        checked={includeBoys} 
                        onChange={(e) => setIncludeBoys(e.target.checked)} 
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ color: 'var(--text-color)', fontSize: '0.95rem' }}>Inclure les prénoms de garçons</span>
                </label>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div className="stat-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3 className="section-title" style={{ color: '#2e7d32', borderColor: '#c8e6c9' }}>Noms acceptés</h3>
                    <div className="stat-value" style={{ color: '#2e7d32' }}>{acceptedNames.length}</div>
                    {acceptedNames.length > 0 ? (
                        <div className="name-list">
                            {acceptedNames.map((name, index) => (
                                <a key={index} href={`/${name}`} className="name-item accepted-item name-link-item">
                                    {name}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--light-text)', fontStyle: 'italic' }}>Aucun nom accepté</p>
                    )}
                </div>
                
                <div className="stat-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3 className="section-title" style={{ color: '#c62828', borderColor: '#ffcdd2' }}>Noms refusés</h3>
                    <div className="stat-value" style={{ color: '#c62828' }}>{rejectedNames.length}</div>
                    {rejectedNames.length > 0 ? (
                        <div className="name-list">
                            {rejectedNames.map((name, index) => (
                                <a key={index} href={`/${name}`} className="name-item rejected-item name-link-item">
                                    {name}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--light-text)', fontStyle: 'italic' }}>Aucun nom refusé</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListNames;