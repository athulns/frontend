import React, { useState } from "react";
import axios from "axios";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.ingredients || !formData.instructions || !formData.imageUrl) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-1-yaoz.onrender.com/api/recipes",
        {
          title: formData.title,
          ingredients: formData.ingredients.split(",").map(ingredient => ingredient.trim()), // Convert to array
          instructions: formData.instructions,
          imageUrl: formData.imageUrl,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Recipe added successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add recipe.";
      setMessage(errorMessage);
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary">Add Recipe</button>
      </form>
      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default AddRecipe;
