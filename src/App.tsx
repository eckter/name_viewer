import React, {FC, useState} from 'react';
import { useParams } from 'react-router-dom';
import {getNameData, getNameRanking, getRecentNameRanking, NameData} from "./data";
import TimePlot from "./components/TimePlot";
import OtherSpellings from "./components/OtherSpellings";
import GenderScale from "./components/GenderScale";
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
            <div>
                <h2>{name}</h2>
                <div>Not found</div>
            </div>
        );
    }

    if (nameData == null) {
        return (
            <div>
            <h2>{name}</h2>
            <div>loading...</div>
        </div>
        )
    }
    const spellings =
        nameData.other_spellings.length > 1?
            <div>
                <h4>Autres orthographes:</h4>
                <OtherSpellings width={300} entries={nameData.other_spellings}/>
            </div>
            : null
    const genderAcrossSpellings =
        nameData.other_spellings.length > 1?
            <div>
                <h4>Répartition de genre (toute orthographe):</h4>
                <GenderScale width={300} height={20} value={nameData.phonetic_relative_f}/>
            </div>
            : null
    getNameRanking(nameData.count_per_k)
        .then(setNameRanking)
    getRecentNameRanking(nameData.recent_count_per_k)
        .then(setRecentNameRanking)
    let rankingComponent = null
    if (nameRanking != null && recentNameRanking != null) {
        rankingComponent = (
            <div>
                <h4>Répartition dans la population:</h4>
                <div>Dans les 80 dernières années: {nameData.count_per_k.toFixed(2)} pour 1000, position {nameRanking}</div>
                <div>Dans les 10 dernières années: {nameData.recent_count_per_k.toFixed(2)} pour 1000, position {recentNameRanking}</div>
            </div>
        )
    }

    return (
        <div>
            <h2>{name} - {nameData.phonetic}</h2>
            {rankingComponent}
            <h4>Répartition dans le temps:</h4>
            <TimePlot data={nameData.years} height={200} width={300}/>
            {spellings}
            <h4>Répartition de genre (orthographe précise):</h4>
            <GenderScale width={300} height={20} value={nameData.F}/>
            {genderAcrossSpellings}
            <button onClick={randomRedirect} style={{ marginTop: "100px" }}>Prénom aléatoire</button>
        </div>
    );
};

export default App;