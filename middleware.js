import clerkAuth from "./middleware./clerkAuth";

export default clerkAuth;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpg|png|svg|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
