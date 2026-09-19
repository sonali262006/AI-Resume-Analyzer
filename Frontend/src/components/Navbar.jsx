function Navbar({ darkMode, toggleTheme }) {

  return (

    <nav className="navbar">

      <h2>🤖 AI Resume Analyzer</h2>

      <button
        className="theme-btn"
        onClick={toggleTheme}
      >
        {darkMode ? "🌞 Light" : "🌙 Dark"}
      </button>

    </nav>

  );

}

export default Navbar;