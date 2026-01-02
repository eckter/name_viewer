import {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {getNameData, loadCSVData, NameData} from "./data";

const App: FC = () => {
    const { pageId } = useParams<{ pageId: string }>();
    if (pageId == undefined)
        return;
    const name = pageId.charAt(0).toUpperCase() + pageId.slice(1).toLowerCase();

    const [nameData, setNameData] = useState<NameData | null>(null)
    const [nameFound, setNameFound] = useState<Boolean | null>(null)

    getNameData(name)
        .then((nameData) => {
            setNameData(nameData)
            setNameFound(nameData != null)
        })
    console.log(nameData)

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

    return (
        <div>
            <h2>{name}</h2>
            <div>{JSON.stringify(nameData)}</div>
        </div>
    );
};

export default App;