import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import RedirectPage from "./RedirectPage";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/:pageId" element={<App />} />
            <Route path="/" element={<RedirectPage />} />
        </Routes>
    </BrowserRouter>,
);
