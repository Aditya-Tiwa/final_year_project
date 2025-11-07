import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const amount = parseFloat(searchParams.get("amount") || 1);
  const from = searchParams.get("from") || "USD";
  const to = searchParams.get("to") || "INR";

  try {
    const response = await axios.get(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    const converted = amount * response.data.rates[to];
    return new Response(JSON.stringify({ converted }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Conversion failed" }), { status: 500 });
  }
}
