import data from "./data/portfolio.json";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";

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
        <section id="hero" style={{ minHeight: "300vh", paddingTop: "8rem" }}>
          <p className="seccion-label" style={{ paddingLeft: "4rem" }}>
            Hero (siguiente paso)
          </p>
        </section>
      </main>
    </>
  );
}

export default App;