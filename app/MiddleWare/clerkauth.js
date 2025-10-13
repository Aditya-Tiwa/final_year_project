import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Lightweight bot protection
const botProtection = (req) => {
  const ua = req.headers.get("user-agent") || "";
  const blockedBots = ["curl", "bot", "spider"];
  return blockedBots.some((bot) => ua.toLowerCase().includes(bot));
};

const clerkAuth = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect to sign-in if unauthenticated
  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  // Block simple bots
  if (botProtection(req)) {
    return new Response("Access denied", { status: 403 });
  }
});

export default clerkAuth;

export const config = {
  matcher: [
    // Protect app routes
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpg|png|svg|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
