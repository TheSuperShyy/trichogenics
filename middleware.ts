import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// next-intl locale negotiation (EN at "/", HE at "/he/").
// (The plan refers to this as "proxy.ts"; Next.js requires the file be named
// `middleware.ts`, so that is the canonical name here.)
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension (static assets).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
