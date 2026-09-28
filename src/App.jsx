import data from "./data/portfolio.json";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

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

        {/* Provisional: para poder probar el scroll */}
        <section id="sobre" className="section" style={{ minHeight: "150vh" }}>
          <p className="seccion-label">Descripción (siguiente paso)</p>
        </section>
      </main>
    </>
  );
}

export default App;