import UploadBox from "./UploadBox";

function Hero() {
  return (
    <section className="hero">
      <h1>
        Get Your Resume
        <br />
        Analyzed By AI
      </h1>

      <p>
        Upload your resume and receive ATS Score, Skill Analysis,
        AI Suggestions and Resume Improvement Tips instantly.
      </p>

      <UploadBox />
    </section>
  );
}

export default Hero;