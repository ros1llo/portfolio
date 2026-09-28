import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaWordpress, FaPhp,
  FaJava, FaGitAlt, FaGithub, FaFigma,
} from "react-icons/fa6";
import { SiMysql, SiVercel } from "react-icons/si";
import "./Technologies.css";

const ICONS = {
  html: FaHtml5,
  css: FaCss3Alt,
  js: FaJs,
  react: FaReact,
  wordpress: FaWordpress,
  php: FaPhp,
  java: FaJava,
  mysql: SiMysql,
  git: FaGitAlt,
  github: FaGithub,
  figma: FaFigma,
  vercel: SiVercel,
};

const REPETICIONES = 3;

function Technologies({ tech }) {
  const items = tech.items;
  const repeated = Array.from({ length: REPETICIONES }, () => items).flat();

  const renderList = (isCopy) => (
    <ul className="marquee-list" aria-hidden={isCopy ? "true" : undefined}>
      {repeated.map((item, index) => {
        const Icon = ICONS[item.id];
        const isRepeat = index >= items.length;

        return (
          <li
            key={`${item.id}-${index}`}
            className={isRepeat ? "marquee-item is-repeat" : "marquee-item"}
            aria-hidden={isRepeat ? "true" : undefined}
          >
            {Icon && <Icon aria-hidden="true" />}
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section id="tecnologias" className="tech">
      <p className="seccion-label tech-label">{tech.label}</p>

      <div className="marquee">
        <div className="marquee-track">
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>
    </section>
  );
}

export default Technologies;