import {loadCSVData} from "./data";
import {getAllAcceptedNames, getAllRejectedNames} from "./nameTracking";

function getLocalStorageBool(key: string, defaultValue: boolean): Boolean {
    const entry = localStorage.getItem(key);
    if (entry == null)
        return defaultValue;
    return JSON.parse(entry) === true;
}

async function getEligibleNames(): Promise<string[]> {
    const data = await loadCSVData()
    const accepted = getAllAcceptedNames()
    const rejected = getAllRejectedNames()
    const names = Object.keys(data.nameData)
    const includeBoys = getLocalStorageBool("includeBoys", true)
    const includeGirls = getLocalStorageBool("includeGirls", true)
    let result: string[] = []
    for (let i = 0; i < names.length; i++) {
        const name = names[i]
        const nameWithCase = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        if (rejected.includes(nameWithCase) || accepted.includes(nameWithCase)) {
            continue
        }
        const nameData = data.nameData[name]
        if (!includeGirls && nameData.F > 0.6) {
            continue
        }
        if (!includeBoys && nameData.F < 0.4) {
            continue
        }
        result.push(name)
    }
    return result
}

export async function randomRedirect() {
    const names = await getEligibleNames()
    const randomPage = "/" + names[Math.floor(Math.random() * names.length)];
    window.location.href = randomPage;
}

export default function RandomRedirect() {
    randomRedirect()
        .catch(error => console.log(error));
    return (
        <h2>Redirecting...</h2>
    );
}