import jsPDF from "jspdf";

function DownloadReport({ analysis }) {

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("AI Resume Analysis Report", 20, 20);

    doc.setFontSize(12);

    doc.text(analysis, 20, 40, {
      maxWidth: 170,
    });

    doc.save("AI_Resume_Report.pdf");
  };

  return (
    <button
      className="download-btn"
      onClick={downloadPDF}
    >
      📥 Download AI Report
    </button>
  );
}

export default DownloadReport;