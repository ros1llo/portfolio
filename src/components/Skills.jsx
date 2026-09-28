import { useEffect, useRef, useState } from "react";
import "./Skills.css";

function Skills({ skills }) {
  const rowRefs = useRef([]);
  const followerRef = useRef(null);
  const [active, setActive] = useState(-1);

  // 1. Entrada ligada al scroll: cada fila calcula su progreso (0 → 1)
  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.6;

      rowRefs.current.forEach((row) => {
        if (!row) return;
        const top = row.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (start - top) / (start - end)));
        row.style.setProperty("--p", p.toFixed(3));
      });
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
  }, []);

  // 3. Imagen flotante con inercia e inclinación
  useEffect(() => {
    const follower = followerRef.current;
    const canHover = window.matchMedia("(hover: hover) and (min-width: 1024px)").matches;
    if (!follower || !canHover) return;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;
    let prevX = 0;
    let rotation = 0;
    let started = false;
    let frame;

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!started) {
        x = mouseX;
        y = mouseY;
        prevX = x;
        started = true;
      }
    };

    const loop = () => {
      x += (mouseX - x) * 0.13;
      y += (mouseY - y) * 0.13;

      const velocity = x - prevX;
      prevX = x;
      const targetRotation = Math.max(-14, Math.min(14, velocity * 0.5));
      rotation += (targetRotation - rotation) * 0.15;

      follower.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotation}deg)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="que-hago" className="skills-section">
      <div className="skills-inner">
        <p className="seccion-label">{skills.label}</p>
        <h2 className="seccion-titulo skills-heading">{skills.title} <em>{skills.titleAccent}</em></h2>

        <ul className="skills-list" onMouseLeave={() => setActive(-1)}>
          {skills.items.map((skill, index) => (
            <li key={skill.id} className="skill-row" ref={(el) => { rowRefs.current[index] = el; }} onMouseEnter={() => setActive(index)}>
              <div className="skill-content">
                <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
              <div className="skill-line" aria-hidden="true"></div>
            </li>
          ))}
        </ul>
      </div>

      <div ref={followerRef} className="skill-follower" aria-hidden="true">
        {skills.items.map((skill, index) => (
          <div key={skill.id} className={index === active ? "skill-card is-active" : "skill-card"}>
            {skill.image && <img src={skill.image} alt="" loading="lazy" />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;