import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation helpers. Use these instead of next/link and
// next/navigation so links resolve to the correct per-locale URL (see routing.ts).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
