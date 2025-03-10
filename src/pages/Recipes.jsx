import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

const Recipes = () => {
  const handleDelete = (id) => {
    console.log('handleDelete function called');
    setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
  };

  const handleSave = (recipe) => {
    console.log('handleSave function called');
    console.log('Saving recipe:', recipe);
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  };

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('https://backend-1-yaoz.onrender.com/api/recipes')
      .then(response => {
        setRecipes(response.data); // Set recipes from API response
      })
      .catch(error => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Recipes</h2>
      {recipes.length === 0 ? ( 
        <p className="text-center">Loading recipes...</p>
      ) : (
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe} onDelete={handleDelete} onSave={handleSave} />
              {console.log('onSave function passed to RecipeCard')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
