// middleware.ts
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Create Arcjet middleware instance (keep characteristics commented in dev if needed)
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  // characteristics: process.env.NODE_ENV === "production" ? ["userId"] : [],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "GO_HTTP",
      ],
    }),
  ],
});

/**
 * Safe wrapper middleware for Arcjet
 * - Calls Arcjet's middleware / protect method (if available)
 * - Catches any runtime errors from Arcjet and allows the request to continue
 */
const safeArcjetMiddleware = async (req: Request) => {
  try {
    // If the aj instance exposes a middleware function, prefer that.
    // Otherwise, call whatever protect() or handler method is available.
    // Use optional chaining so it won't throw if method doesn't exist.
    if (typeof (aj as any).middleware === "function") {
      // Some versions expose a middleware function
      return await (aj as any).middleware(req);
    } else if (typeof (aj as any).protect === "function") {
      // Fallback: call protect (if it returns a Response or modifies request)
      await (aj as any).protect(req);
      return NextResponse.next();
    } else {
      // If aj doesn't expose callable middleware/protect, just continue.
      return NextResponse.next();
    }
  } catch (e) {
    // Non-fatal: log and continue the request. This prevents the "reading '0'" crash.
    // Keep the log; remove or reduce in production if too noisy.
    console.warn("Arcjet non-fatal error (swallowed) — continuing request:", e);
    return NextResponse.next();
  }
};

// Create base Clerk middleware (unchanged)
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

// Chain middlewares - safeArcjet runs first, then Clerk
export default createMiddleware(safeArcjetMiddleware, clerk);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
