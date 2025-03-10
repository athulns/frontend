import axios from 'axios'; // Ensure axios is imported

const sampleRecipes = [
    {
      id: "1",
      title: "Spaghetti Carbonara",
      description: "A delicious Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
      ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Pancetta", "Black Pepper"],
    },
    {
      id: "2",
      title: "Chocolate Cake",
      description: "A rich and moist chocolate cake perfect for dessert lovers.",
      image: "https://images.pexels.com/photos/3740197/pexels-photo-3740197.jpeg",
      ingredients: ["Flour", "Cocoa Powder", "Sugar", "Eggs", "Butter", "Baking Powder"],
    },
    {
      id: "3",
      title: "Grilled Chicken",
      description: "Juicy grilled chicken marinated in herbs and spices, cooked to perfection.",
      image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg",
      ingredients: ["Chicken Breast", "Olive Oil", "Garlic", "Paprika", "Lemon Juice"],
    },
    {
      id: "4",
      title: "Avocado Toast",
      description: "A healthy and delicious avocado toast topped with cherry tomatoes and sesame seeds.",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
      ingredients: ["Bread", "Avocado", "Cherry Tomatoes", "Sesame Seeds", "Lemon Juice"],
    },
  ];
  
/**
 * Initialize sample recipes in localStorage if not already set
 */
const initializeRecipes = () => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"));
    if (!storedRecipes || storedRecipes.length === 0) {
      localStorage.setItem("recipes", JSON.stringify(sampleRecipes));
    }
};

/**
 * Retrieve recipes from localStorage
 * @returns {Array} - List of recipes
 */
export const getRecipes = () => {
    initializeRecipes(); // Ensure sample recipes exist
    return JSON.parse(localStorage.getItem("recipes")) || [];
};

/**
 * Get a recipe by ID
 * @param {string} id - Recipe ID
 * @returns {Object|null} - Recipe object or null if not found
 */
export const getRecipeById = (id) => {
    const recipes = getRecipes();
    return recipes.find((recipe) => recipe.id === id) || null;
};

/**
 * Save a new recipe to the API
 * @param {Object} recipe - Recipe object to save
 */
export const saveRecipe = async (recipe) => {
    console.log('Sending recipe data:', recipe); // Log the recipe data
    try {
        const response = await axios.post('https://backend-1-yaoz.onrender.com/api/recipes', recipe);
        console.log('Recipe saved successfully:', response.data);
        alert('Recipe added successfully!'); // Success message
    } catch (error) {
        console.error('Error saving recipe:', error);
        alert('Failed to save recipe. Please try again.');
        // Log additional error details
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
    }
};

// Initialize sample recipes when the file loads
initializeRecipes();
