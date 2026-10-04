"use client";

import { useEffect } from "react";

// Drives the Selected Work cards. Each card plays its story (data-play) once as it scrolls in and again on hover;
// data-live marks cards on screen so ambient loops (rain, sound bars, archive ledger) stop when off screen.
// The pointer position feeds the stage light. Reduced motion leaves every card on its finished frame.
export default function CardMotion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const play = (card: HTMLElement) => {
      card.removeAttribute("data-play");
      void card.offsetWidth; // restart the CSS animations
      card.setAttribute("data-play", "");
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const card = e.target as HTMLElement;
          card.toggleAttribute("data-live", e.isIntersecting);
          if (e.isIntersecting && !card.dataset.played) {
            card.dataset.played = "";
            play(card);
          }
        }),
      { threshold: 0.45 },
    );
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>(".work-card").forEach((card) => {
      io.observe(card);
      const frame = card.querySelector<HTMLElement>(".stage-frame")!;
      const onEnter = () => play(card);
      const onMove = (ev: PointerEvent) => {
        const r = frame.getBoundingClientRect();
        frame.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        frame.style.setProperty("--my", `${ev.clientY - r.top}px`);
      };
      card.addEventListener("mouseenter", onEnter);
      frame.addEventListener("pointermove", onMove);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        frame.removeEventListener("pointermove", onMove);
      });
    });
    return () => {
      io.disconnect();
      cleanups.forEach((f) => f());
    };
  }, []);
  return null;
}
