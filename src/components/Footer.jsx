import SocialLinks from "./SocialLinks";
import "./Footer.css";

function Footer({ footer, social }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer tema-invertido">
      <div className="footer-inner">
        <div className="footer-top">
          <p className="footer-tagline">{footer.tagline}</p>
          <SocialLinks items={social} className="footer-social" />
        </div>

        <p className="footer-wordmark" aria-hidden="true">
          {footer.wordmark}<span className="footer-dot">.</span>
        </p>

        <div className="footer-bottom">
          <span>© {year} {footer.name}</span>
          <span>Hecho con React + Vite · Valencia</span>
          <a href="#hero" className="footer-up">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;