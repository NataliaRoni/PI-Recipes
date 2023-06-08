import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipes } from "../../actions/actions";

export default function RecipeCreate() {
  const dispatch = useDispatch();

  // Toma el estado diets del reducer:
  const diets = useSelector((state) => state.diets);

  // Se crea un estado que guarde lo que recibe en el input:
  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets);
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create your recipe</h1>
      <form>
        <div>
          <label>Name: </label>{" "}
          <input type="text" value={input.name} name="name" />
          <label>Image: </label>
          <input type="text" value={input.image} name="image" />
          <label>Summary: </label>
          <input type="text" value={input.summary} name="summary" />
          <label>Health Score: </label>
          <input type="number" value={input.healthScore} name="healthScore" />
          <label>Steps: </label>
          <textarea type="text" value={input.steps} name="steps" />
          <label>Diets: </label>
          <label>
            <input type="checkbox" name="dairy free" value="dairy free" />
            Dairy free
          </label>
          <label>
            <input type="checkbox" name="gluten free" value="gluten free" />
            Gluten free
          </label>
          <label>
            <input
              type="checkbox"
              name="lacto ovo vegetarian"
              value="lacto ovo vegetarian"
            />
            Lacto ovo vegetarian
          </label>
          <label>
            <input type="checkbox" name="vegan" value="vegan" />
            Vegan
          </label>
          <label>
            <input type="checkbox" name="pescatarian" value="pescatarian" />
            Pescatarian
          </label>
          <label>
            <input
              type="checkbox"
              name="fodmap friendly"
              value="fodmap friendly"
            />
            Fodmap friendly
          </label>
          <label>
            <input type="checkbox" name="whole 30" value="whole 30" />
            Whole 30
          </label>
          <label>
            <input type="checkbox" name="primal" value="primal" />
            Primal
          </label>
          <label>
            <input type="checkbox" name="paleolithic" value="paleolithic" />
            Paleolithic
          </label>
          <label>
            <input type="checkbox" name="ketogenic" value="ketogenic" />
            Ketogenic
          </label>
        </div>
        <button type="submit">Create my recipe</button>
      </form>
    </div>
  );
}
