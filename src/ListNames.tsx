import React, {FC} from "react";
import {getAllAcceptedNames, getAllRejectedNames, clearAllTracking} from "./nameTracking";
import {randomRedirect} from "./RedirectPage";

const ListNames: FC = () => {
    const acceptedNames = getAllAcceptedNames();
    const rejectedNames = getAllRejectedNames();

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
                    <button className="random-button header-button" onClick={clearTracking}>Réinitialiser</button>
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div className="stat-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3 className="section-title" style={{ color: '#2e7d32', borderColor: '#c8e6c9' }}>Noms acceptés</h3>
                    <div className="stat-value" style={{ color: '#2e7d32' }}>{acceptedNames.length}</div>
                    {acceptedNames.length > 0 ? (
                        <div className="name-list">
                            {acceptedNames.map((name, index) => (
                                <div key={index} className="name-item accepted-item">
                                    {name}
                                </div>
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
                                <div key={index} className="name-item rejected-item">
                                    {name}
                                </div>
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