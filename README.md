# ZAINO - 40 Day Reset

Free 3D mint-green and blue challenge site. Python builds the static site; GitHub Pages hosts it.

## Run
```
python build.py          # creates dist/
python -m http.server -d dist
```
Optional local API: `pip install -r requirements.txt && python app.py`

## Deploy
Repo Settings > Pages > Source: **GitHub Actions**. Every push to `main` runs `build.py` and publishes.

Not medical advice. See a doctor for low testosterone, anxiety or compulsive behaviour concerns.
