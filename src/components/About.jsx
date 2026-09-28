import { useRef } from "react";
import useScrollProgress from "../hooks/useScrollProgress";
import "./About.css";

function About({ about }) {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const litProgress = Math.min(1, progress / 0.85);

  const words = about.text.split(" ");
  const cleanText = about.text.replaceAll("*", "");
  const totalChars = cleanText.replaceAll(" ", "").length;

  let charIndex = 0;

  return (
    <section id="sobre" ref={sectionRef} className="about">
      <div className="about-sticky">
        <p className="seccion-label">{about.label}</p>

        <p
          className="about-text"
          style={{ "--lit": litProgress, "--total": totalChars }}
        >
          <span className="sr-only">{cleanText}</span>

          <span aria-hidden="true">
            {words.map((word, wordIndex) => {
              const isAccent = word.startsWith("*");
              const cleanWord = word.replaceAll("*", "");

              return (
                <span key={wordIndex}>
                  <span className={isAccent ? "word word--accent" : "word"}>
                    {cleanWord.split("").map((char, i) => {
                      const style = { "--i": charIndex };
                      charIndex++;
                      return (
                        <span key={i} className="char" style={style}>
                          {char}
                        </span>
                      );
                    })}
                  </span>{" "}
                </span>
              );
            })}
          </span>
        </p>
      </div>
    </section>
  );
}

export default About;