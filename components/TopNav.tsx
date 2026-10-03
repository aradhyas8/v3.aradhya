"use client";

import { useEffect, useState } from "react";

const resume = "/resume";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

// One passive scroll listener drives both the header's scrolled state and the active link.
// Active = the last [data-nav] block whose top has passed 40% of the viewport.
function useScrollState(trackSections: boolean) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = trackSections ? Array.from(document.querySelectorAll<HTMLElement>("[data-nav]")) : [];
    const update = () => {
      setScrolled(scrollY > 8);
      let current: HTMLElement | undefined;
      for (const el of els) if (el.getBoundingClientRect().top <= innerHeight * 0.4) current = el;
      setActive(current?.dataset.nav ?? null);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [trackSections]);
  return { scrolled, active };
}

export default function TopNav({ archive = false, resumePage = false }: { archive?: boolean; resumePage?: boolean }) {
  const { scrolled, active } = useScrollState(!archive);

  return (
    <header className="topnav" data-scrolled={scrolled}>
      <a className="topnav-name" href={archive ? "/" : "#top"}>Aradhya Singh</a>
      <nav aria-label="Sections">
        <ul className="topnav-links">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={archive ? `/#${s.id}` : `#${s.id}`} aria-current={active === s.id ? "location" : undefined}>{s.label}</a>
            </li>
          ))}
          <li className="topnav-resume">
            <a href={resume} aria-current={resumePage ? "page" : undefined}>Résumé</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
