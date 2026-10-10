import { notFound } from "next/navigation";

// Any path that no route matches lands here and renders [locale]/not-found.tsx,
// so unknown URLs get the site's own 404 (with header, footer and locale).
export default function CatchAllNotFound() {
  notFound();
}
