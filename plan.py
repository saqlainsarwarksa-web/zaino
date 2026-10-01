"""ZAINO 40-day plan data. Edit here, then run: python build.py"""
PHASES = [
    {"name": "Reset", "days": (1, 10), "goal": "Fix sleep, cut sugary drinks, walk daily, block triggers.",
     "kcal_note": "Deficit about 400 kcal. Learn portions, log meals."},
    {"name": "Build", "days": (11, 20), "goal": "Add strength training, hit protein target, practise urge surfing.",
     "kcal_note": "Deficit about 500 kcal. Protein 1.6 g per kg of goal weight."},
    {"name": "Strengthen", "days": (21, 30), "goal": "Progressive overload, 9-10k steps, stress tools on autopilot.",
     "kcal_note": "Hold the deficit. One flexible meal per week, not a free day."},
    {"name": "Lock-in", "days": (31, 40), "goal": "Make it identity. Plan life after day 40.",
     "kcal_note": "Deficit about 400 kcal. Book a check-up and write your next 90-day plan."},
]
WORKOUTS = {
    1: ("Strength A", "Squat or leg press, push-ups, dumbbell row, plank: 3 sets each (30-40 min)."),
    2: ("Brisk walk + core", "45 min brisk walk, then dead bug and bird dog: 3 sets."),
    3: ("Strength B", "Romanian deadlift, overhead press, lat pulldown, farmer carry: 3 sets each."),
    4: ("Active recovery", "30-40 min easy walk or swim plus 10 min stretching."),
    5: ("Strength C", "Lunges, bench or floor press, seated row, glute bridge: 3 sets each."),
    6: ("Long walk / sport", "60 min walk, cycling or football. Keep it fun."),
    0: ("Rest + mobility", "Full rest day. 15 min mobility, early bedtime."),
}
MIND = [
    "Write your top 3 triggers (time, place, feeling).",
    "Do 5 min box breathing before bed.",
    "Phone charges outside the bedroom tonight.",
    "Urge surf once: rate the urge 1-10, watch it pass.",
    "Name the feeling: anxious, bored, lonely or tired?",
    "10 min outside in daylight, no phone.",
    "Message or call a friend or family member.",
    "Write 3 things your body did well today.",
    "Replace the trigger hour with a walk or a shower.",
    "Review your log: what worked this week?",
]
HABITS = ["10,000 steps (or phase target)", "Workout of the day", "2.5-3 L water",
          "Protein at every meal", "No sugary drinks", "7-9 h sleep, phone out of bed",
          "5 min breathing / calm", "Trigger-free evening (no late-night scrolling)"]
MEALS = [
    ("Breakfast", "2-3 eggs, foul or oats, a tomato-cucumber salad. Tea/coffee without sugar."),
    ("Lunch", "Grilled chicken or fish, a fist of rice or 1 small flatbread, big salad, vegetables."),
    ("Snack", "Laban or Greek yogurt, a fruit, or 3 dates with a handful of nuts."),
    ("Dinner", "Lean protein with vegetables or soup. Eat 3 h before sleep."),
]
def days():
    out = []
    for d in range(1, 41):
        ph = next(p for p in PHASES if p["days"][0] <= d <= p["days"][1])
        w = WORKOUTS[d % 7]
        out.append({"day": d, "phase": ph["name"], "workout": w[0], "detail": w[1],
                    "mind": MIND[(d - 1) % len(MIND)]})
    return out
