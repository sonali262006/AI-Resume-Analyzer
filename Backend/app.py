from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from services.pdf_reader import extract_text_from_pdf
from services.ai_analyzer import (
    analyze_resume as ai_analyze_resume,
    compare_resume
)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route("/")
def home():
    return {
        "message": "AI Resume Analyzer Backend Running Successfully 🚀"
    }


# ===========================
# Resume Analysis
# ===========================
@app.route("/analyze", methods=["POST"])
def analyze():
    try:

        if "resume" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["resume"]

        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        resume_text = extract_text_from_pdf(filepath)

        analysis = ai_analyze_resume(resume_text)

        return jsonify({
            "message": "Resume Uploaded Successfully",
            "filename": file.filename,
            "analysis": analysis
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# ===========================
# Resume vs Job Description
# ===========================
@app.route("/compare", methods=["POST"])
def compare():

    try:

        if "resume" not in request.files or "jd" not in request.files:
            return jsonify({
                "error": "Resume or Job Description missing"
            }), 400

        resume = request.files["resume"]
        jd = request.files["jd"]

        resume_path = os.path.join(UPLOAD_FOLDER, resume.filename)
        jd_path = os.path.join(UPLOAD_FOLDER, jd.filename)

        resume.save(resume_path)
        jd.save(jd_path)

        resume_text = extract_text_from_pdf(resume_path)
        jd_text = extract_text_from_pdf(jd_path)

        result = compare_resume(resume_text, jd_text)

        return jsonify({
            "message": "Comparison Successful",
            "result": result
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)