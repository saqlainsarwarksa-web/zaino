"""Optional local Flask API: python app.py  (GitHub Pages is static, so this runs on your PC)."""
from flask import Flask, jsonify
import plan

app = Flask(__name__, static_folder="dist", static_url_path="")

@app.get("/api/plan")
def api_plan():
    return jsonify(phases=plan.PHASES, days=plan.days())

@app.get("/api/day/<int:n>")
def api_day(n):
    d = plan.days()
    return jsonify(d[n - 1]) if 1 <= n <= 40 else (jsonify(error="1-40 only"), 404)

@app.get("/")
def home():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(debug=True)
