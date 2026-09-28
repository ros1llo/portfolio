import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
    });

    return () => lenis.destroy();
  }, []);
}

export default useLenis;