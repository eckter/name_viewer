import { loadCSVData } from './data';

// Local storage keys
const ACCEPTED_NAMES_KEY = 'acceptedNames';
const REJECTED_NAMES_KEY = 'rejectedNames';

/**
 * Get the list of accepted names from local storage
 */
const getAcceptedNames = (): string[] => {
    const accepted = localStorage.getItem(ACCEPTED_NAMES_KEY);
    return accepted ? JSON.parse(accepted) : [];
};

/**
 * Get the list of rejected names from local storage
 */
const getRejectedNames = (): string[] => {
    const rejected = localStorage.getItem(REJECTED_NAMES_KEY);
    return rejected ? JSON.parse(rejected) : [];
};

/**
 * Save the list of accepted names to local storage
 */
const saveAcceptedNames = (names: string[]): void => {
    localStorage.setItem(ACCEPTED_NAMES_KEY, JSON.stringify(names));
};

/**
 * Save the list of rejected names to local storage
 */
const saveRejectedNames = (names: string[]): void => {
    localStorage.setItem(REJECTED_NAMES_KEY, JSON.stringify(names));
};

/**
 * Accept a name and add it to the accepted list
 * @param name The name to accept
 */
export const acceptName = (name: string): void => {
    const acceptedNames = getAcceptedNames();
    
    // Remove from rejected list if it was previously rejected
    const rejectedNames = getRejectedNames().filter(rejectedName => rejectedName !== name);
    saveRejectedNames(rejectedNames);
    
    // Add to accepted list if not already there
    if (!acceptedNames.includes(name)) {
        acceptedNames.push(name);
        saveAcceptedNames(acceptedNames);
    }
};

/**
 * Accept a specific spelling and reject all other spellings
 * @param name The name spelling to accept
 * @param otherSpellings Array of other spellings to reject
 */
export const acceptThisRejectOthers = (name: string, otherSpellings: string[]): void => {
    // Accept the main name
    acceptName(name);
    
    // Reject all other spellings
    const rejectedNames = getRejectedNames();
    otherSpellings.forEach(spelling => {
        if (!rejectedNames.includes(spelling) && spelling !== name) {
            rejectedNames.push(spelling);
        }
    });
    saveRejectedNames(rejectedNames);
};

/**
 * Reject a name and add it to the rejected list
 * @param name The name to reject
 */
export const rejectName = (name: string): void => {
    const rejectedNames = getRejectedNames();
    
    // Remove from accepted list if it was previously accepted
    const acceptedNames = getAcceptedNames().filter(acceptedName => acceptedName !== name);
    saveAcceptedNames(acceptedNames);
    
    // Add to rejected list if not already there
    if (!rejectedNames.includes(name)) {
        rejectedNames.push(name);
        saveRejectedNames(rejectedNames);
    }
};

/**
 * Reject a name and all its alternative spellings
 * @param name The name to reject
 * @param otherSpellings Array of other spellings to reject
 */
export const rejectAllSpellings = (name: string, otherSpellings: string[]): void => {
    // Reject the main name
    rejectName(name);
    
    // Reject all other spellings
    const rejectedNames = getRejectedNames();
    otherSpellings.forEach(spelling => {
        if (!rejectedNames.includes(spelling)) {
            rejectedNames.push(spelling);
        }
    });
    saveRejectedNames(rejectedNames);
};

/**
 * Get all names that haven't been accepted or rejected yet
 * @returns Promise<string[]> List of untracked names
 */
export const getUntrackedNames = async (): Promise<string[]> => {
    // Load all names from the dataset
    const data = await loadCSVData();
    const allNames = Object.keys(data.nameData);
    
    const acceptedNames = getAcceptedNames();
    const rejectedNames = getRejectedNames();
    
    // Filter out names that are already tracked
    return allNames.filter(name => 
        !acceptedNames.includes(name) && 
        !rejectedNames.includes(name)
    );
};

/**
 * Get all accepted names
 * @returns string[] List of accepted names
 */
export const getAllAcceptedNames = (): string[] => {
    return getAcceptedNames();
};

/**
 * Get all rejected names
 * @returns string[] List of rejected names
 */
export const getAllRejectedNames = (): string[] => {
    return getRejectedNames();
};

/**
 * Export tracking data as a simple JSON string
 * @returns JSON string containing just the accepted and rejected name arrays
 */
export const exportTrackingData = (): string => {
    const acceptedNames = getAcceptedNames();
    const rejectedNames = getRejectedNames();
    
    const exportData = {
        accepted: acceptedNames,
        rejected: rejectedNames
    };
    
    return JSON.stringify(exportData, null, 2);
};

/**
 * Import tracking data from a JSON string (appends to existing data)
 * @param jsonData JSON string containing accepted and rejected arrays
 * @returns true if import was successful, false otherwise
 */
export const importTrackingData = (jsonData: string): boolean => {
    try {
        const importData = JSON.parse(jsonData);
        
        // Get existing data
        const existingAccepted = getAcceptedNames();
        const existingRejected = getRejectedNames();
        
        // Merge accepted names (avoid duplicates)
        if (Array.isArray(importData.accepted)) {
            const mergedAccepted = [...existingAccepted];
            importData.accepted.forEach(name => {
                if (!mergedAccepted.includes(name)) {
                    mergedAccepted.push(name);
                }
            });
            saveAcceptedNames(mergedAccepted);
        }
        
        // Merge rejected names (avoid duplicates)
        if (Array.isArray(importData.rejected)) {
            const mergedRejected = [...existingRejected];
            importData.rejected.forEach(name => {
                if (!mergedRejected.includes(name)) {
                    mergedRejected.push(name);
                }
            });
            saveRejectedNames(mergedRejected);
        }
        
        return true;
    } catch (error) {
        console.error('Error importing data:', error);
        return false;
    }
};

/**
 * Clear all tracking data (for development/testing)
 */
export const clearAllTracking = (): void => {
    localStorage.removeItem(ACCEPTED_NAMES_KEY);
    localStorage.removeItem(REJECTED_NAMES_KEY);
};