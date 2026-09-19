const API_URL = "https://ai-resume-analyzer-rtap.onrender.com";

export async function analyzeResume(file) {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}
