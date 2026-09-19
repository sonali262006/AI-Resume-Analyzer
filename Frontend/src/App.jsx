import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import "./App.css";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "dark" : "light"}>

      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <Hero />

    </div>
  );
}

export default App;