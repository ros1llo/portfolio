import data from "./data/portfolio.json";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Divider from "./components/Divider";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";

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

        {/* Provisional: para poder probar el scroll */}
        <section className="section" style={{ minHeight: "100vh" }}>
        <p className="seccion-label">Seggno (siguiente paso)</p>
        </section>
      </main>
    </>
  );
}

export default App;