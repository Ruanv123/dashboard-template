import { auth } from "@/lib/auth";

const publicRoutes = ["/signin", "/signup"];

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("isLoggedIn", isLoggedIn);
  console.log("nextUrl", nextUrl);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isPublicRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher match all the routes where the middleware will be invoked!
};
