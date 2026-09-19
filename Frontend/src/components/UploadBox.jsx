import { useRef, useState } from "react";
import { analyzeResume } from "../services/api";
import Dashboard from "./Dashboard";
import ResumePreview from "./ResumePreview";
import DownloadReport from "./DownloadReport";
import JobDescriptionUpload from "./JobDescriptionUpload";

function UploadBox() {
  const fileInput = useRef();

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJDFile] = useState(null);

  const [match, setMatch] = useState(null);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Clear previous result
    setAnalysis("");
    setError("");
    setMatch(null);

    // Validate file type
    if (file.type !== "application/pdf") {
      setError("❌ Please upload a PDF file only.");
      e.target.value = "";
      return;
    }

    // Validate file size - maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError("❌ File size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setResumeFile(file);
    setFileName(file.name);
    setLoading(true);

    try {
      const result = await analyzeResume(file);

      console.log("API Response:", result);

      if (result && result.analysis) {
        setAnalysis(result.analysis);
      } else {
        setError("⚠️ No analysis received from server.");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError("❌ Upload failed. Please check whether backend is running.");
    } finally {
      setLoading(false);
    }

    // Allow selecting same file again
    e.target.value = "";
  };

  const compareResume = () => {
    if (!resumeFile) {
      setError("Please upload your resume first.");
      return;
    }

    if (!jdFile) {
      setError("Please upload a Job Description first.");
      return;
    }

    setError("");

    // Temporary demo score
    // Replace this with actual backend comparison API later
    setMatch(87);
  };

  return (
    <div className="upload-container">

      {/* Upload Button */}
      <button className="upload-btn" onClick={handleButtonClick}>
        📄 Upload Resume
      </button>

      <input
        type="file"
        accept=".pdf,application/pdf"
        hidden
        ref={fileInput}
        onChange={handleFileChange}
      />

      {/* Selected File */}
      {fileName && (
        <p className="file-name">
          <strong>Selected File:</strong> {fileName}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>🤖 AI is analyzing your resume...</p>
          <small>Please wait a few seconds.</small>
        </div>
      )}

      {/* Analysis Result */}
      {!loading && selectedFile && analysis && (
        <>
          <div className="dashboard-container">

            {/* Resume Preview */}
            <ResumePreview file={selectedFile} />

            {/* AI Dashboard */}
            <Dashboard analysis={analysis} />

          </div>

          {/* Download Report */}
          <DownloadReport analysis={analysis} />

          {/* Job Description Upload */}
          <JobDescriptionUpload setJD={setJDFile} />

          {/* Compare Button */}
          <button
            className="compare-btn"
            onClick={compareResume}
          >
            🚀 Compare Resume with Job Description
          </button>

          {/* Match Score */}
          {match !== null && (
            <div className="match-box">
              <h2>🎯 Resume Match Score</h2>
              <h1>{match}%</h1>
              <p>Resume compatibility with this job description</p>
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default UploadBox;