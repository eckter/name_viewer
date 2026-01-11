import React, {FC, useState, useEffect} from "react";
import {getAllAcceptedNames, getAllRejectedNames, clearAllTracking, exportTrackingData, importTrackingData} from "./nameTracking";
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

    const handleExport = () => {
        const exportData = exportTrackingData();
        const blob = new Blob([exportData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `name-viewer-export-${new Date().toISOString().split('T')[0]}.json`;
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            if (content) {
                const success = importTrackingData(content);
                if (success) {
                    alert('Importation réussie ! Les données ont été ajoutées à votre liste existante. La page va se recharger.');
                    window.location.reload();
                } else {
                    alert('Échec de l\'importation. Veuillez vérifier le format du fichier et réessayer.');
                }
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    };

    function clearTracking() {
        clearAllTracking()
        window.location.reload();
    }

    return (
        <div className="app-container">
            <div className="app-header" style={{ marginBottom: '20px' }}>
                <h1 className="app-title">Liste des noms</h1>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="random-button header-button" onClick={randomRedirect}>Prénom aléatoire</button>
                    <button className="random-button header-button" onClick={handleReset}>Réinitialiser</button>
                    <button className="random-button header-button" onClick={handleExport}>Exporter</button>
                    <label className="random-button header-button" style={{ cursor: 'pointer' }}>
                        Importer
                        <input 
                            type="file" 
                            accept=".json"
                            onChange={handleImport}
                            style={{ display: 'none' }} 
                        />
                    </label>
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