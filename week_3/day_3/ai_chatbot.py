from openai import OpenAI
import os
from dotenv import load_dotenv


load_dotenv()

model = "openai/gpt-4.1"
endpoint = "https://models.github.ai/inference"
token = os.environ["GITHUB_TOKEN"]

client = OpenAI(
    api_key=os.getenv("GITHUB_TOKEN"),
    base_url="https://models.github.ai/inference"
)

def basic_chat(prompt: str) -> str:
   response = client.chat.completions.create(
      model=model,
      messages=[
         {"role": "user", "content": prompt}
         ]
      )
   return response.choices[0].message.content

if __name__ == "__main__":
   result = basic_chat(prompt="what is the capital of France?")
   print("basic_chat Output:")
   print(result)