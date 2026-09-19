import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function ATSGauge({ score = 0 }) {
  let color = "#ef4444";
  let status = "Needs Improvement";
  let description = "Your resume needs improvement for better ATS compatibility.";

  if (score >= 80) {
    color = "#22c55e";
    status = "Excellent";
    description = "Your resume has strong ATS compatibility.";
  } else if (score >= 60) {
    color = "#f59e0b";
    status = "Good";
    description = "Your resume is fairly ATS-friendly, but can be improved.";
  }

  return (
    <div className="ats-score-card">

      <div className="ats-title">
        <span>🎯</span>
        <h2>ATS Score</h2>
      </div>

      <div className="gauge">
        <CircularProgressbar
          value={score}
          maxValue={100}
          text={`${score}%`}
          styles={buildStyles({
            rotation: 0,
            strokeLinecap: "round",
            textSize: "18px",
            pathTransitionDuration: 0.8,
            textColor: color,
            pathColor: color,
            trailColor: "#e5e7eb",
          })}
        />
      </div>

      <h3
        className="ats-status"
        style={{ color: color }}
      >
        {status}
      </h3>

      <p className="ats-description">
        {description}
      </p>

      <div className="ats-scale">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>

    </div>
  );
}

export default ATSGauge;