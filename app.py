from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/generate_meal', methods=['POST'])
def generate_meal():
    data = request.get_json()
    diet = data.get('diet')
    calories = int(data.get('calories'))

    # Actual meal generation logic
    meal_options = {
        "vegetarian": [
            "Grilled Veggie Wrap",
            "Quinoa Salad",
            "Vegetable Stir Fry"
        ],
        "non-vegetarian": [
            "Grilled Chicken Salad",
            "Beef Stir Fry",
            "Salmon with Veggies"
        ],
        "vegan": [
            "Vegan Buddha Bowl",
            "Lentil Soup",
            "Vegan Pasta"
        ]
    }

    selected_meals = meal_options.get(diet, [])
    meals = []

    for meal in selected_meals:
        meals.append(f"{meal} - Approx. {calories // len(selected_meals)} calories")

    return jsonify({'meals': meals})

if __name__ == '__main__':
    app.run(debug=True)