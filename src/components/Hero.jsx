import SocialLinks from "./SocialLinks";
import "./Hero.css";

function Hero({ hero, social }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-text">
        <p className="hero-eyebrow">
          <span className="hero-dot" aria-hidden="true"></span>
          {hero.eyebrow}
        </p>

        <h1 className="hero-name">
          {hero.firstName}
          <br />
          <em>{hero.lastName}</em>
        </h1>

        <ul className="hero-disciplines">
          {hero.disciplines.map((discipline) => (
            <li key={discipline}>{discipline}</li>
          ))}
        </ul>

        <p className="hero-tagline">{hero.tagline}</p>

        <div className="hero-ctas">
          <a href="#proyectos" className="btn btn--primario">Ver proyectos</a>
          <a href="#contacto" className="btn btn--secundario">Hablemos →</a>
        </div>

        <SocialLinks items={social} className="hero-social" />
      </div>

      <div className="hero-media">
        <img src={hero.photo} alt={hero.photoAlt} fetchPriority="high" />
      </div>
    </section>
  );
}

export default Hero;