import { clerkMiddleware } from "@clerk/nextjs/server";
import { isProtectedRoute } from "./routematcher";
import { botProtection } from "./botprotection";


export const clerkAuth = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  if (botProtection(req)) {
    return new Response("Access denied", { status: 403 });
  }
});
