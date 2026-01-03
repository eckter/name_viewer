import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import RedirectPage from "./RedirectPage";
import "./index.css";
import ListNames from "./ListNames";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/list" element={<ListNames />} />
            <Route path="/liste" element={<ListNames />} />
            <Route path="/random" element={<RedirectPage />} />
            <Route path="/aléatoire" element={<RedirectPage />} />
            <Route path="/:pageId" element={<App />} />
            <Route path="/" element={<ListNames />} />
        </Routes>
    </BrowserRouter>,
);
