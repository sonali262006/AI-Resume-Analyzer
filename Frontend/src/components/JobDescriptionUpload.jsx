import { useState } from "react";

function JobDescriptionUpload({ setJD }) {

  const handleChange = (e) => {
    const file = e.target.files[0];

    if(file){
      setJD(file);
    }
  };

  return (
    <div className="jd-upload">

      <h2>📄 Upload Job Description</h2>

      <input
        type="file"
        accept=".txt,.pdf"
        onChange={handleChange}
      />

    </div>
  );
}

export default JobDescriptionUpload;