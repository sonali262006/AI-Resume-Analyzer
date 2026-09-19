import { useRef } from "react";
import { analyzeResume } from "../services/api";

function UploadBox() {
  const fileInput = useRef();

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const result = await analyzeResume(file);

    console.log(result);

    alert(result.analysis);
  };

  return (
    <>
      <button className="upload-btn" onClick={handleButtonClick}>
        Upload Resume
      </button>

      <input
        type="file"
        accept=".pdf"
        ref={fileInput}
        onChange={handleFileChange}
        hidden
      />
    </>
  );
}

export default UploadBox;