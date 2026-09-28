import { useState, useEffect } from "react";

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const recorrido = rect.height - window.innerHeight;
      const value = recorrido > 0 ? -rect.top / recorrido : 0;

      setProgress(Math.min(1, Math.max(0, value)));
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

export default useScrollProgress;