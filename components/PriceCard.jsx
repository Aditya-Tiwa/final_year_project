"use client";

import { useEffect, useState } from "react";
import axios from "axios";

function formatCurrency(amount, currency, locale) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

export default function PriceCard({ basePriceUSD, currency, locale }) {
  const [converted, setConverted] = useState(basePriceUSD);

  useEffect(() => {
    axios
      .get(`/api/convert?amount=${basePriceUSD}&from=USD&to=${currency}`)
      .then(res => setConverted(res.data.converted))
      .catch(() => setConverted(basePriceUSD));
  }, [currency]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", textAlign: "center", width: "200px" }}>
      <h3>AI Plan</h3>
      <p>{formatCurrency(converted, currency, locale)}</p>
    </div>
  );
}
