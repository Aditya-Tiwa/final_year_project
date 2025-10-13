import clerkAuth from "./middleware";


export default clerkAuth;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpg|png|svg|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
