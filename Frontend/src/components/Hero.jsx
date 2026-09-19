import UploadBox from "./UploadBox";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="badge">
          🚀 AI Powered Resume Analyzer
        </span>

        <h1>
          Get Your Resume
          <br />
          <span>Analyzed By AI</span>
        </h1>

        <p>
          Transform your resume into a career advantage.
          Get an intelligent ATS score, skill analysis,
          missing skills, resume summary, and personalized
          AI-powered improvement suggestions.
        </p>

      </div>

      <div className="hero-right">
        <UploadBox />
      </div>

    </section>
  );
}

export default Hero;