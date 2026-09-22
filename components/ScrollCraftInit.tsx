"use client";

import { useEffect } from "react";
import { ScrollCraft } from "scroll-craft";

/**
 * Initialize scroll-craft globally for all entrance animations.
 * Handles reveals on sections, cards, and other scroll-triggered elements.
 */
export default function ScrollCraftInit() {
  useEffect(() => {
    const sc = new ScrollCraft();

    // Reveal animations for main sections
    sc.reveal("[data-reveal-section]", {
      distance: "28px",
      duration: 700,
      ease: "cubicOut",
      threshold: 0.15,
    });

    // Reveal animations for project cards
    sc.reveal("[data-reveal-card]", {
      distance: "24px",
      duration: 650,
      delay: 50,
      ease: "cubicOut",
      threshold: 0.12,
    });

    // Reveal animations for skill items
    sc.reveal("[data-reveal-item]", {
      distance: "20px",
      duration: 600,
      ease: "cubicOut",
      threshold: 0.15,
    });

    return () => {
      sc.destroy();
    };
  }, []);

  return null;
}
