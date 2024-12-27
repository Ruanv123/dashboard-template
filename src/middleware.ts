// export { auth as middleware } from "@/auth";

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "./lib/auth";

// const publicRoutes = ["/signin", "/signup"];

// export default async function middleware(request: NextRequest) {
//   const session = await auth();

//   const isPublic = publicRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

//   if (!session && isPublic) {
//     return NextResponse.next();
//   }

//   if (session && isPublic) {
//     const absoluteURL = new URL("/", request.nextUrl.origin);
//     console.log("absoluteURL", absoluteURL);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export { auth as middleware } from "@/lib/auth";

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "./lib/auth";

// const protectedRoutes = ["/middleware"];

// export default async function middleware(request: NextRequest) {
//   const session = await auth();

//   const isProtected = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

//   if (!session && isProtected) {
//     const absoluteURL = new URL("/", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
