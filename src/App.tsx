import React, {FC, useState} from 'react';
import { useParams } from 'react-router-dom';
import {getNameData, NameData} from "./data";
import TimePlot from "./components/TimePlot";
import OtherSpellings from "./components/OtherSpellings";
import GenderScale from "./components/GenderScale";

const App: FC = () => {
    const { pageId } = useParams<{ pageId: string }>();
    if (pageId == undefined)
        return;

    const [nameData, setNameData] = useState<NameData | null>(null)
    const [nameFound, setNameFound] = useState<Boolean | null>(null)

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

    return (
        <div>
            <h2>{name}</h2>
            <div>{JSON.stringify(nameData)}</div>
            <h4>Répartition dans le temps:</h4>
            <TimePlot data={nameData.years} height={200} width={300}/>
            {spellings}
            <h4>Répartition de genre (orthographe précise):</h4>
            <GenderScale width={300} height={20} value={nameData.F}/>
            {genderAcrossSpellings}
        </div>
    );
};

export default App;