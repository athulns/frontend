import { Link } from "react-router-dom";
import React, { useState } from 'react';

const RecipeCard = ({ recipe, onDelete, onUnsave, onSave, isSaved }) => {
  const [message, setMessage] = useState('');
  return (
    <div className="card shadow-sm border-0" style={{ margin: '10px' }}>
      <img src={recipe.image} className="card-img-top" alt={recipe.title} />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text text-muted">{recipe.description ? recipe.description.substring(0, 100) : 'No description available'}...</p>
        <div className="d-flex justify-content-between mt-2">
          <Link to={`/recipe/${recipe.id}`} className="btn btn-primary mx-1">View Recipe</Link>
          <button className="btn btn-danger mx-1" onClick={() => { 
            onDelete(recipe.id); 
            setMessage('Recipe deleted successfully!'); 
          }}>Delete</button>
          {isSaved ? (
            <button className="btn btn-danger mx-1" onClick={() => { 
              onUnsave(recipe.id); 
              setMessage('Recipe unsaved successfully!'); 
            }}>Unsave</button>
          ) : (
            <button className="btn btn-success mx-1" onClick={() => { 
              onSave(recipe); 
              setMessage('Recipe saved successfully!'); 
            }}>Save</button>
          )}

        </div>
        {message && <div className="alert alert-info">{message}</div>}
      </div>
    </div>
  );
};

export default RecipeCard;
