# 0. Import packages and models

from flask import Flask, request, render_template, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv

# 1. Configuration and Setup

app = Flask(__name__)

load_dotenv()
try:
    client = OpenAI(
        api_key=os.getenv("GITHUB_TOKEN"),
        base_url="https://models.github.ai/inference"
        )
except Exception as e:
    print(f"Error initializing OpenAI Client: {e}")
    client = None

# 2. Agent Persona and Core Prompt
SYSTEM_INSTRUCTION = (
    "You are a talented, 10-year experienced social media content writer. "
    "Your goal is to transform a raw user transcript into an engaging, "
    "humorous, informative, and highly readable social media post. "
    "Analyze the transcript, extract key points, and rewrite them in a fun, "
    "educational, and shareable format. Use platform-appropriate formatting "
    "(e.g., line breaks, emojis, relevant hashtags, and a clear call-to-action). "
    "Do not include any conversational filler; only output the final post text."
)

def generate_social_media_post(transcript: str, platform: str) -> str:
    """Interfaces with the LLM to generate the final post."""
    if not client:
        return "ERROR: AI client is not configured. Please set the API key."
    
    # Customize the prompt based on the platform for length/style
    platform_prompt = {
        "X": "The post should be concise (under 280 characters), punchy, and use 3-4 trending hashtags.",
        "linkedin": "The post should be professional yet insightful, using bullet points for readability and focusing on a clear, value-driven lesson.",
        "instagram": "The post should be visually engaging (even in text form), with lots of emojis, and a clear story arc. Keep the body short and use a longer section of 5-8 relevant hashtags at the end.",
    }.get(platform.lower(), "Ensure the post is highly engaging and informative.")

    user_prompt = f"User Transcript: \"{transcript}\n\nPlatform: {platform}\n\nInstructions:b{platform_prompt}"

    # API Call with System Instruction for agent behavior
    response = client.chat.completions.create(
        model=os.getenv("MODEL"),
        messages=[
            {"role": "user", "contents": user_prompt}
        ]
    )
    
    return response.choices[0].message.content

# 3. Flask Routes
@app.route('/')
def home():
    """Serves the single-page HTML fronted."""
    # Flask will look for index.html in a 'template' folder
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    """API endpoint to receive data and return the generated post."""
    # Safetly get the user input from the AJAX request
    transcript = request.form.get('transcript', '')
    platform = request.form.get('platform', 'instagram')

    if not transcript:
        return jsonify({"success": False, "post": "Please provide a transcript to analyse."}), 400
    
    try:
        transcript = request.form.get('transcript', '').strip()
        platform = request.form.get('platform')

        if not transcript:
            return jsonify({'success': False, 'post': 'AI Generation Error: The transcript field cannot be empty.'}), 400
        
        # Create the full prompt based on the platform and transcript
        prompt = f"""
        You are an expert social media copywriter.
        Based on the following raw text/transcript, generate a highly engaging and professional social media post
        optimized for the {platform} platform.

        Raw Text: "{transcript}"

        Requirements:
        1. Be concise, punchy, and value-driven.
        2. Use relevant emojis and line breaks to maximize readability.
        3. Do NOT include any introductory or concluding remarks (e.g., "Here is the post," "This is the generated content").
        4. Output only the final social media post content.
        """

        response = client.models.generate_content(
            model=os.getenv("MODEL"),
            contents=prompt
        )

        return jsonify({'success': True, 'post': response.text})
    
    except Exception as e:
        app.logger.error(f"AI Generation Error: {e}")
        return jsonify({"success": False, "post": "An error occurred during AI content generation."}), 500    
    
# 4. Run the App 
if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True)
    