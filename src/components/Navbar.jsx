import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

function Navbar({ logo, links, theme, onToggleTheme }) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setAtTop(y < 10);

      if (y > lastScrollY.current && y > 120) {
        setHidden(true);   // bajando → esconder
      } else if (y < lastScrollY.current) {
        setHidden(false);  // subiendo → mostrar
      }

      lastScrollY.current = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navClasses = [
    "navbar",
    !atTop && "navbar--solid",
    hidden && !menuOpen && "navbar--hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClasses}>
      <a href="#hero" className="navbar-logo" onClick={closeMenu}>
        {logo}
      </a>

      <ul className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
        {links.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} onClick={closeMenu}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          className={`navbar-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;