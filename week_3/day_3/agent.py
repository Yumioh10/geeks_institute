# app.py
from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
# Import necessary AI libraries (OpenAI)
from openai import OpenAI
from openai import OpenAIError

app = Flask(__name__)
# Replace with your actual API key and client setup
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# --- Placeholder AI Functions (Replace with real API calls) ---

def generate_text_ai(prompt: str, platform: str, tone: str) -> str:
    # Example: Use an LLM to generate the post text
    # A full prompt would include platform and tone instructions
    full_prompt = f"Write an engaging social media post for {platform} in a {tone} tone about: {prompt}. Include relevant hashtags and emojis."
    
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": full_prompt}]
        )
        # Safely extract content, fallback to empty string if None or missing
        content = ""
        if response and getattr(response, "choices", None):
            try:
                content = response.choices[0].message.content or ""
            except Exception:
                # fallback in case attributes are different
                content = ""
        return content
    except OpenAIError as e:
        return f"Error generating text: {e}"

def generate_image_ai(prompt: str) -> str:
    # Example: Use a text-to-image model to generate an image
    # For real use, this returns an image URL or a base64 encoded image data
    try:
        # Example API call structure (Replace with your actual call)
        # image_response = client.models.generate_images(
        #     model='imagen-3.0-generate-002',
        #     prompt=f"A visually striking image for a social media post about: {prompt}",
        #     config=dict(number_of_images=1)
        # )
        # return image_response.generated_images[0].url # URL to the generated image
        return "/static/placeholder_image.png"  # Placeholder image path
    except OpenAIError as e:
        return f"Error generating image: {e}"

# --- Flask Routes ---

@app.route('/')
def index():
    # Renders the HTML frontend 
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_post():
    # Safely parse JSON body; fall back to form data or empty dict to avoid None
    data = request.get_json(silent=True) or request.form.to_dict() or {}

    topic = data.get('topic')
    platform = data.get('platform')
    tone = data.get('tone')

    if not all([topic, platform, tone]):
        return jsonify({"error": "Missing input fields"}), 400

    # 1. Generate Text
    generated_text = generate_text_ai(str(topic), str(platform), str(tone))
    
    # 2. Generate Image (Use the topic for the image prompt)
    generated_image_url = generate_image_ai(str(topic))
    
    # 3. Return results
    return jsonify({
        "text": generated_text,
        "imageUrl": generated_image_url
    })

if __name__ == '__main__':
    # Ensure a 'static' folder exists for placeholder image/CSS
    os.makedirs('static', exist_ok=True)
    app.run(debug=True, port=5000)