export const botProtection = (req) => {
  const ua = req.headers.get("user-agent") || "";
  const blockedBots = ["curl", "bot", "spider"];
  return blockedBots.some((bot) => ua.toLowerCase().includes(bot));
};
