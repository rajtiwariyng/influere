import { useEffect } from "react";

/**
 * Adds on-scroll reveal animations to public pages (#3).
 * - Elements with [data-animate] get `is-visible` when scrolled into view.
 * - Elements with [data-reveal-once] only animate the first time.
 * Falls back gracefully (everything visible) if IntersectionObserver is missing.
 */
const useScrollReveal = (deps = []) => {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-animate]"));
    if (elements.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.hasAttribute("data-reveal-once")) {
              observer.unobserve(entry.target);
            }
          } else if (!entry.target.hasAttribute("data-reveal-once")) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useScrollReveal;
