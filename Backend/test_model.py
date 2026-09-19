from google import genai
from config import GEMINI_API_KEY

print("TEST FILE RUNNING...")

client = genai.Client(api_key=GEMINI_API_KEY)

try:
    print("Sending request to Gemini...")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say only: Gemini API is working"
    )

    print("SUCCESS")
    print(response.text)

except Exception as e:
    print("ERROR")
    print(type(e).__name__)
    print(str(e))