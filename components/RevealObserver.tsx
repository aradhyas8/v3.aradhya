"use client";

import { useEffect } from "react";

// Marks each [data-reveal] element with data-inview the first time it scrolls into view.
// Elements that enter together get a 40ms stagger via --d, capped at 160ms so long lists never queue up. The scroll-reveal rules in portfolio.css key off both.
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            (e.target as HTMLElement).style.setProperty("--d", `${Math.min(i, 4) * 40}ms`);
            e.target.setAttribute("data-inview", "");
            io.unobserve(e.target);
          }),
      // Threshold 0 so tall elements (whole sections on phones) still trigger once their top edge is in.
      { rootMargin: "0px 0px -4% 0px", threshold: 0 },
    );
    document.querySelectorAll("[data-reveal]:not([data-inview])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
