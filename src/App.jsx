import data from "./data/portfolio.json";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Divider from "./components/Divider";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useLenis from "./hooks/useLenis";

function App() {
  const { theme, toggleTheme } = useTheme();
  useLenis();

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
        <Contact contact={data.contact} social={data.social} />
        
        <Footer footer={data.footer} social={data.social} />
      </main>
    </>
  );
}

export default App;