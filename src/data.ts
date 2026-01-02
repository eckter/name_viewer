import Papa from 'papaparse';

let data: SavedData = {
    nameData: {},
    nameDataNoAccent: {},
    loaded: false,
}

export interface SavedData {
    nameData: Record<string, NameData>;
    nameDataNoAccent: Record<string, NameData>;
    loaded: boolean;
}

export interface OtherSpellingEntry {
    name: String;
    relative_frequency: number;
}

export interface NameData {
    name: string;
    F: number;
    count: number;
    count_per_k: number;
    recent_count_per_k: number;
    other_spellings: OtherSpellingEntry[];
    years: Array<[number, number]>;
    phonetic: string;
    phonetic_relative_f: number;
}

export interface RawNameData {
    name: string;
    F: number;
    count: number;
    count_per_k: number;
    recent_count_per_k: number;
    other_spellings: string;
    years: string;
    phonetic: string;
    phonetic_relative_f: number;
}

export async function loadCSVData(): Promise<SavedData> {
    if (data.loaded) return data;
    console.log('Loading CSV data...');
    const text = await fetch( "./name_stats.csv" )
        .then( response => response.text() );
    const dataEntries = Papa.parse(text, {
        header: true,
        dynamicTyping: true,
    }).data as RawNameData[];
    for (let entry of dataEntries) {
        if (entry.name == undefined) {
            continue;
        }
        try {
            const newEntry: NameData = {
                F: entry.F,
                count: entry.count,
                count_per_k: entry.count_per_k,
                name: entry.name,
                other_spellings: JSON.parse(entry.other_spellings) as OtherSpellingEntry[],
                phonetic: entry.phonetic,
                phonetic_relative_f: entry.phonetic_relative_f,
                recent_count_per_k: entry.recent_count_per_k,
                years:JSON.parse(entry.years) as Array<[number,number]>,
            };
            data.nameData[entry.name] = newEntry;
            data.nameDataNoAccent[removeAccent(entry.name)] = newEntry;
        } catch (e) {
            console.error("error on data " + entry + ": " + e);
        }
    }
    console.log('Loading CSV data: done');
    data.loaded = true;
    return data;
}

function removeAccent(name: string): string {
    return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function getNameData(name: string): Promise<NameData | null> {
    const data = await loadCSVData()
    const res = data.nameData[name.toLowerCase()]
    if (res != null)
        return res
    return data.nameDataNoAccent[removeAccent(name.toLowerCase())]
}
