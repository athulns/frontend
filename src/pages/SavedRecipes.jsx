import React, { useEffect, useState } from 'react';
import RecipeCard from "../components/RecipeCard"; // Import RecipeCard

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleUnsave = (id) => {
    const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
  };

  const handleSave = (recipe) => {
    const updatedRecipes = [...savedRecipes, recipe];
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
  };

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setSavedRecipes(recipes);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="text-center">No saved recipes found.</p>
      ) : (
        <div className="row">
          {savedRecipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe} onUnsave={handleUnsave} onSave={handleSave} isSaved={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
