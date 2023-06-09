import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipes } from "../../actions/actions";

export default function RecipeCreate() {
  const dispatch = useDispatch();

  // Se usa para redirigirme a una ruta:
  const history = useHistory();

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

  //* HANDLERS:

  // Guarda lo que se escribe en el input y hace que ese value sea el name, o sea va llenando el estado input:
  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  }

  function handleCheck(e) {
    const selectedDiet = e.target.value;
    const updatedDiets = input.diets.includes(selectedDiet)
      ? input.diets.filter((diet) => diet !== selectedDiet)
      : [...input.diets, selectedDiet];
    setInput({ ...input, diets: updatedDiets });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postRecipes(input));
    alert("Recipe created successfully!");
    setInput({
      name: "",
      image: "",
      summary: "",
      healthScore: "",
      steps: "",
      diets: [],
    });
    history.push("/home");
  }

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create your recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>{" "}
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <label>Image: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          <label>Summary: </label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          <label>Health Score: </label>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
          <label>Steps: </label>
          <textarea
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handleChange(e)}
          />
          <label>Diets: </label>
          <label>
            <input
              type="checkbox"
              name="dairy free"
              value="dairy free"
              onChange={(e) => handleCheck(e)}
            />
            Dairy free
          </label>
          <label>
            <input
              type="checkbox"
              name="gluten free"
              value="gluten free"
              onChange={(e) => handleCheck(e)}
            />
            Gluten free
          </label>
          <label>
            <input
              type="checkbox"
              name="lacto ovo vegetarian"
              value="lacto ovo vegetarian"
              onChange={(e) => handleCheck(e)}
            />
            Lacto ovo vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              name="vegan"
              value="vegan"
              onChange={(e) => handleCheck(e)}
            />
            Vegan
          </label>
          <label>
            <input
              type="checkbox"
              name="pescatarian"
              value="pescatarian"
              onChange={(e) => handleCheck(e)}
            />
            Pescatarian
          </label>
          <label>
            <input
              type="checkbox"
              name="fodmap friendly"
              value="fodmap friendly"
              onChange={(e) => handleCheck(e)}
            />
            Fodmap friendly
          </label>
          <label>
            <input
              type="checkbox"
              name="whole 30"
              value="whole 30"
              onChange={(e) => handleCheck(e)}
            />
            Whole 30
          </label>
          <label>
            <input
              type="checkbox"
              name="primal"
              value="primal"
              onChange={(e) => handleCheck(e)}
            />
            Primal
          </label>
          <label>
            <input
              type="checkbox"
              name="paleolithic"
              value="paleolithic"
              onChange={(e) => handleCheck(e)}
            />
            Paleolithic
          </label>
          <label>
            <input
              type="checkbox"
              name="ketogenic"
              value="ketogenic"
              onChange={(e) => handleCheck(e)}
            />
            Ketogenic
          </label>
        </div>
        <button type="submit">Create my recipe</button>
      </form>
    </div>
  );
}
