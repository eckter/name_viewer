import { useEffect } from 'react';
import {loadCSVData} from "./data";

export async function randomRedirect() {
    loadCSVData()
        .then(data => {
            const pages = Object.keys(data.nameData)
            const randomPage = "/" + pages[Math.floor(Math.random() * pages.length)];
            window.location.href = randomPage;
        })
}

export default function RandomRedirect() {
    randomRedirect()
        .catch(error => console.log(error));
    return null;
}