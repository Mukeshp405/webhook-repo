from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = "events.json"

# JSON file create
def load_events():
    """It reads all the events from the file and returns them as a list."""
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

# save the data
def save_events(events):
    """It overwrites the entire list back into the file."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2)

# Create a cache in memory as soon as the app starts.
events_cache = load_events()

# -------- Routes --------
@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.json or {}
    data["timestamp"] = datetime.utcnow().strftime("%d %B %Y - %I:%M %p UTC")

    # cache update + disk write
    events_cache.append(data)
    save_events(events_cache)

    return jsonify({"message": "Event received"}), 200


@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events_cache)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
