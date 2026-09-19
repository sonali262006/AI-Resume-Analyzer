import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function ResumePreview({ file }) {
  const [pages, setPages] = useState(null);

  if (!file) return null;

  return (
    <div className="resume-preview">

      <h2>📄 Resume Preview</h2>

      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setPages(numPages)}
      >
        <Page pageNumber={1} width={350} />
      </Document>

      <p>{pages} Pages</p>

    </div>
  );
}

export default ResumePreview;