const API_URL = "http://127.0.0.1:5000";

export async function analyzeResume(file) {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}