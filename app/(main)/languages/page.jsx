"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../lib/i18n";
import PriceCard from "@/components/PriceCard";


export default function LanguagesPage() {
  const { t, i18n } = useTranslation();
  const [currency, setCurrency] = useState("USD");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "50px" }}>
      <h1>{t("welcome")}</h1>

      {/* Language Switch */}
      <div>
        <button onClick={() => i18n.changeLanguage("en")}>English</button>
        <button onClick={() => i18n.changeLanguage("hi")}>हिन्दी</button>
      </div>

      {/* Currency Switch */}
      <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>

      {/* Price Card */}
      <PriceCard
        basePriceUSD={25}
        currency={currency}
        locale={i18n.language === "hi" ? "hi-IN" : "en-US"}
      />
    </div>
  );
}

