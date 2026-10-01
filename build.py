"""Static site builder (Python backend for GitHub Pages). Run: python build.py"""
import json, shutil
from pathlib import Path
import plan

SRC, OUT = Path("site"), Path("dist")

def build():
    OUT.mkdir(exist_ok=True)
    data = {"phases": plan.PHASES, "days": plan.days(), "habits": plan.HABITS, "meals": plan.MEALS}
    html = (SRC / "template.html").read_text(encoding="utf-8")
    html = html.replace("__DATA__", json.dumps(data))
    (OUT / "index.html").write_text(html, encoding="utf-8")
    for f in ("style.css", "app.js"):
        shutil.copy(SRC / f, OUT / f)
    (OUT / "plan.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
    (OUT / ".nojekyll").write_text("")
    print("Built", OUT.resolve())

if __name__ == "__main__":
    build()
