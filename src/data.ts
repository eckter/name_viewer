import Papa from 'papaparse';

let data: Record<string, NameData> = {};
let loaded = false;

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
    years: number[][];
    phonetic: string;
    phonetic_relative_f: string;
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
    phonetic_relative_f: string;
}

export async function loadCSVData(): Promise<Record<string, NameData>> {
    if (loaded) return data;
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
            data[entry.name] = {
                F: entry.F,
                count: entry.count,
                count_per_k: entry.count_per_k,
                name: entry.name,
                other_spellings: JSON.parse(entry.other_spellings) as OtherSpellingEntry[],
                phonetic: entry.phonetic,
                phonetic_relative_f: entry.phonetic_relative_f,
                recent_count_per_k: entry.recent_count_per_k,
                years:JSON.parse(entry.years) as number[][],
            };
        } catch (e) {
            console.error("error on data " + entry + ": " + e);
        }
    }
    console.log('Loading CSV data: done');
    loaded = true;
    return data;
}

export async function getNameData(name: string): Promise<NameData | null> {
    const data = await loadCSVData()
    return data[name.toLowerCase()]
}
