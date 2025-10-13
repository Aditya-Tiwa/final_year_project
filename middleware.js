import clerkAuth from "./app/MiddleWare/clerkauth";



// middleware/index.js
export default clerkAuth;


export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpg|png|svg|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
