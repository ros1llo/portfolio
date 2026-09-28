import data from "./data/portfolio.json";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Divider from "./components/Divider";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar
        logo={data.logo}
        links={data.nav}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero hero={data.hero} social={data.social} />
        <Divider />
        <About about={data.about} />
        <Divider />
        <Technologies tech={data.tech} />
        <Divider />
        <Projects projects={data.projects} />
        <Divider />

        {/* Reservado: bloque Seggno */}
        <section className="section" style={{ minHeight: "60vh" }}>
        <p className="seccion-label">// 04 — seggno (próximamente)</p>
        </section>

        <Skills skills={data.skills} />

        {/* Provisional: siguiente bloque */}
        <section id="contacto" className="section" style={{ minHeight: "100vh" }}>
        <p className="seccion-label">Contacto (siguiente paso)</p>
        </section>
      </main>
    </>
  );
}

export default App;