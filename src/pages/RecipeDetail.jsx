import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://backend-1-yaoz.onrender.com/api/recipes/${id}`);
        setRecipe(response.data);
        console.log('Fetched Recipe:', response.data); // Log the fetched recipe
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe details. Please try again later.');
      }
    };

    if (id) { // Ensure ID is defined before making the API call
      fetchRecipe();
    } else {
      setError("Recipe ID is undefined.");
    }
  }, [id]);

  // Function to navigate between recipes
  const handleNavigate = (direction) => {
    if (recipes.length === 0 || !recipe) return;

    const currentIndex = recipes.findIndex((r) => r.id === id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? recipes.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === recipes.length - 1 ? 0 : currentIndex + 1;
    }

    navigate(`/recipe/${recipes[newIndex].id}`);
  };

  const handleSave = () => {
    const updatedSavedRecipes = [...savedRecipes, recipe];
    setSavedRecipes(updatedSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes)); // Save to local storage
    alert("Recipe saved!");
  };

  const handleDelete = () => {
    alert("Recipe deleted!");
  };

    if (error) return <h2 className="text-center mt-5">{error}</h2>; // Display error message

  if (!recipe) return <h2 className="text-center mt-5">Loading recipe details...</h2>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid rounded shadow"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6">
          <h2>{recipe.title}</h2>
          <p className="text-muted">{recipe.description}</p>

          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li> // Use ingredient as a unique key
            ))}
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3 mb-3">
        <button className="btn btn-success me-3" onClick={handleSave}>
          Save Recipe
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Recipe
        </button>
      </div>

      <div className="d-flex justify-content-center mt-5 mb-3">
        <button className="btn btn-outline-secondary me-3" onClick={() => handleNavigate("prev")}>
          ← Previous Recipe
        </button>
        <button className="btn btn-outline-secondary" onClick={() => handleNavigate("next")}>
          Next Recipe →
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
