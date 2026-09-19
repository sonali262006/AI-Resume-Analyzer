import ATSGauge from "./ATSGauge";
import SkillsChart from "./SkillsChart";

function Dashboard({ analysis }) {
  if (!analysis) return null;

  // Temporary demo data
  // Later backend/API response मधून dynamic data घेऊ शकतो
  const skillsData = [
    { name: "Python", value: 30 },
    { name: "Java", value: 20 },
    { name: "React", value: 20 },
    { name: "SQL", value: 15 },
    { name: "Others", value: 15 },
  ];

  return (
    <section className="dashboard">

      {/* Dashboard Heading */}
      <div className="dashboard-heading">
        <h2>📊 Resume Analysis Dashboard</h2>
        <p>AI-powered insights to improve your resume</p>
      </div>

      {/* Top Cards */}
      <div className="dashboard-grid">

        {/* ATS Score Card */}
        <div className="dashboard-card ats-card">
          <h3>🎯 ATS Compatibility Score</h3>
          <ATSGauge score={82} />
          <p className="card-description">
            Your resume is compatible with most Applicant Tracking Systems.
          </p>
        </div>

        {/* Skills Card */}
        <div className="dashboard-card skills-card">
          <h3>🧠 Skills Distribution</h3>
          <SkillsChart skills={skillsData} />
        </div>

      </div>

      {/* AI Analysis */}
      <div className="analysis-box">
        <div className="analysis-header">
          <h2>📋 AI Resume Analysis</h2>
          <span className="ai-badge">AI Generated</span>
        </div>

        <pre>{analysis}</pre>
      </div>

      {/* Improvement Suggestions */}
      <div className="suggestion-card">
        <h2>💡 Resume Improvement Tips</h2>

        <ul>
          <li>Use strong action verbs in your work experience.</li>
          <li>Add measurable achievements wherever possible.</li>
          <li>Include relevant technical skills from the job description.</li>
          <li>Keep the resume clean, concise, and ATS-friendly.</li>
          <li>Avoid unnecessary graphics, tables, and complex formatting.</li>
        </ul>
      </div>

    </section>
  );
}

export default Dashboard;