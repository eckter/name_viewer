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
 * Clear all tracking data (for development/testing)
 */
export const clearAllTracking = (): void => {
    localStorage.removeItem(ACCEPTED_NAMES_KEY);
    localStorage.removeItem(REJECTED_NAMES_KEY);
};