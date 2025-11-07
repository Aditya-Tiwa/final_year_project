"use client"; // make this a client component
import i18n from "@/lib/i18n";
import React from "react";
import { I18nextProvider } from "react-i18next";


const MainLayout = ({ children }) => {
    return (
        <I18nextProvider i18n={i18n}>
            <div className="container mx-auto my-32">
                {children}
            </div>
        </I18nextProvider>
    );
}

export default MainLayout;
