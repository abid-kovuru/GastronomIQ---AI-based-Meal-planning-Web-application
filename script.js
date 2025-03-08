document.getElementById('meal-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const diet = document.getElementById('diet').value; // Get diet preference
    const totalCalories = parseInt(document.getElementById('calories').value, 10); // Get calorie limit

    const mealResults = document.getElementById('meal-results');
    const mealList = document.getElementById('meal-list');
    const loadingIndicator = document.getElementById('loading'); // Loading spinner

    // Reset meal results and show loading indicator
    mealList.innerHTML = '';
    mealResults.classList.add('d-none');
    loadingIndicator.classList.remove('d-none'); // Show loading spinner

    setTimeout(() => {
        // Define meal options
        const mealOptions = {
            vegetarian: [
                { name: "Grilled Veggie Wrap", description: "A delightful wrap filled with grilled vegetables, hummus, and fresh greens for a healthy crunch." },
                { name: "Quinoa Salad", description: "A refreshing salad with quinoa, cherry tomatoes, cucumbers, and a zesty lemon dressing." },
                { name: "Vegetable Stir Fry", description: "A colorful mix of bell peppers, broccoli, and snap peas in a savory soy sauce glaze." },
                { name: "Stuffed Bell Peppers", description: "Bell peppers stuffed with quinoa, black beans, and topped with melted cheese." },
                { name: "Zucchini Noodles with Pesto", description: "Zucchini spirals tossed in a rich basil pesto sauce for a low-carb treat." }
            ],
            "non-vegetarian": [
                { name: "Grilled Chicken Salad", description: "Tender grilled chicken served over a bed of mixed greens with a light vinaigrette dressing." },
                { name: "Beef Stir Fry", description: "Savory beef slices stir-fried with onions and bell peppers in a flavorful garlic sauce." },
                { name: "Salmon with Veggies", description: "Perfectly baked salmon served with roasted asparagus and baby carrots." },
                { name: "Shrimp Tacos", description: "Spiced shrimp served in soft tortillas with a tangy slaw." },
                { name: "Chicken Alfredo Pasta", description: "Creamy Alfredo pasta topped with grilled chicken and Parmesan cheese." }
            ],
            vegan: [
                { name: "Vegan Buddha Bowl", description: "A hearty mix of quinoa, roasted chickpeas, avocado, and kale drizzled with tahini sauce." },
                { name: "Lentil Soup", description: "Warm and comforting, this soup is packed with lentils, carrots, celery, and spices." },
                { name: "Vegan Pasta", description: "A delightful pasta dish made with zucchini noodles and a rich tomato basil sauce." },
                { name: "Stuffed Sweet Potatoes", description: "Sweet potatoes stuffed with black beans, corn, and avocado lime dressing." },
                { name: "Chickpea Salad", description: "A protein-packed salad with chickpeas, cucumbers, tomatoes, and a lemon herb dressing." }
            ]
        };

        // Select appropriate meals and ensure calorie limit is not exceeded
        const selectedMeals = mealOptions[diet] || [];
        const calorieRange = [];
        let remainingCalories = totalCalories;

        selectedMeals.forEach((_, index) => {
            if (index === selectedMeals.length - 1) {
                calorieRange.push(remainingCalories); // Assign remaining calories to the last meal
            } else {
                const maxCalories = Math.min(remainingCalories, 1000);
                const mealCalories = Math.floor(Math.random() * maxCalories) + 1;
                calorieRange.push(mealCalories);
                remainingCalories -= mealCalories;
            }
        });

        // Populate meal results
        selectedMeals.forEach((meal, index) => {
            if (remainingCalories >= 0) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                    <h5>${meal.name}</h5>
                    <p><strong>Calories:</strong> ${calorieRange[index]} kcal</p>
                    <p>${meal.description}</p>
                `;
                mealList.appendChild(li);
            }
        });

        // Hide loading spinner and show meal results
        loadingIndicator.classList.add('d-none');
        mealResults.classList.remove('d-none');
        window.scrollTo({ top: mealResults.offsetTop, behavior: 'smooth' });
    }, 2000); // Simulate loading time (2 seconds)
});
