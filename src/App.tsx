import {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const App: FC = () => {
    const { pageId } = useParams<{ pageId: string }>();

    return (
        <div>
            <h2>Page ID: {pageId}</h2>
        </div>
    );
};

export default App;