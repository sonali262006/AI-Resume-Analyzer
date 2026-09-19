from google import genai
from config import GEMINI_API_KEY
import time
import json
import re

client = genai.Client(api_key=GEMINI_API_KEY)

MODELS = [
    
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash"
]


def generate_ai_response(prompt):
    last_error = ""

    for model_name in MODELS:
        try:
            print(f"Trying model: {model_name}")

            response = client.models.generate_content(
                model=model_name,
                contents=prompt
            )

            if response and response.text:
                print(f"Success: {model_name}")
                return response.text

        except Exception as error:
            last_error = str(error)
            print(f"Failed: {model_name}")
            print(last_error)

        
            time.sleep(2)

    return (
        "AI service is temporarily unavailable. "
        "Please try again later. "
        f"Last error: {last_error}"
    )


def analyze_resume(resume_text):
    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze this resume and provide:

1. ATS Score out of 100
2. Resume Summary
3. Skills Found
4. Missing Skills
5. Strengths
6. Weaknesses
7. Improvement Suggestions
8. Recommended Job Roles

Use clear headings and bullet points.

Resume:
{resume_text}
"""

    return generate_ai_response(prompt)


def compare_resume(resume_text, jd_text):
    prompt = f"""
Compare the resume with the job description.

Return ONLY valid JSON:

{{
  "match_score": 0,
  "matching_skills": [],
  "missing_skills": [],
  "suggestions": [],
  "summary": ""
}}

Resume:
{resume_text}

Job Description:
{jd_text}
"""

    result = generate_ai_response(prompt)

    cleaned = result.strip()
    cleaned = re.sub(r"^```json\s*", "", cleaned)
    cleaned = re.sub(r"\s*```$", "", cleaned)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        return {
            "match_score": 0,
            "matching_skills": [],
            "missing_skills": [],
            "suggestions": ["Could not parse AI response"],
            "summary": cleaned
        }