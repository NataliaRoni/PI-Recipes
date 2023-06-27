import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipes } from "../../actions/actions";
import Styles from "./RecipeCreate.module.css";
import back from "../../utils/images/back.png";
import swal from "sweetalert";

function validation(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Add a name to your recipe";
  }
  if (!input.summary) {
    errors.summary = "Add a summary to your recipe";
  }
  if (!input.healthScore) {
    errors.healthScore = "Add a health score to your recipe";
  } else if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "Health score must be a number between 1 and 100";
  }
  if (!input.steps) {
    errors.steps = "Add steps to your recipe";
  }
  if (!input.diets.length) {
    errors.diets = "You must select at least one diet type";
  }
  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();

  // Se usa para redirigirme a una ruta:
  const history = useHistory();

  // Toma el estado global diets del reducer:
  const diets = useSelector((state) => state.diets);

  // Toma el estado global recipes del reducer:
  const recipes = useSelector((state) => state.recipes);

  // Se crea un estado que guarde lo que recibe en el input:
  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
  });

  // Se crea un estado para setear las validaciones:
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getDiets);
  }, []);

  //* HANDLERS:

  // Guarda lo que se escribe en el input y hace que ese value sea el name, o sea va llenando el estado input:
  // Además, setea el estado errors para las validaciones:
  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  // Hace updatedDiets guarde las dietas que se seleccionan con el checkbox dentro de un array y setea el estado errors:
  function handleCheck(e) {
    const selectedDiet = e.target.value;
    const updatedDiets = input.diets.includes(selectedDiet)
      ? input.diets.filter((diet) => diet !== selectedDiet)
      : [...input.diets, selectedDiet];
    setInput({ ...input, diets: updatedDiets });
    setErrors(validation({ ...input, diets: updatedDiets }));
  }

  // Postea la receta creada y nos devuelve a home:
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipes(input));
    swal({
      title: "Recipe created successfully!",
      icon: "success",
      button: "OK",
      className: Styles["swal"],
    });
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

  //* VALIDACIÓN
  // La variable disabled se establecerá en true si hay errores de validación presentes o si el campo name está vacío.
  const disabled = Object.keys(errors).length || !input.name;

  //* RENDERIZADO

  return (
    <div className={Styles.container}>
      <Link to="/home">
        <button className={Styles.backButton}>
          {" "}
          <img src={back} alt="Back" height="22" width="22" />
        </button>
      </Link>
      <h1 className={Styles.title}>Create your recipe!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={Styles.form}>
          <label>Name: </label>{" "}
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className={Styles.error}>{errors.name}</p>}
        </div>
        <div className={Styles.form}>
          <label>Image: </label>
          <input
            type="url"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={Styles.form}>
          <label>Summary: </label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          {errors.summary && <p className={Styles.error}>{errors.summary}</p>}
        </div>
        <div className={Styles.form}>
          <label>Health Score: </label>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
          {errors.healthScore && (
            <p className={Styles.error}>{errors.healthScore}</p>
          )}
        </div>
        <div className={Styles.form}>
          <label>Steps: </label>
          <textarea
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handleChange(e)}
          />
          {errors.steps && <p className={Styles.error}>{errors.steps}</p>}
        </div>
        <div className={Styles.checkbox}>
          <label className={Styles.labelCheck}>Diets: </label>
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
          {errors.diets && <p className={Styles.error1}>{errors.diets}</p>}
        </div>
        <button
          className={Styles.submitButton}
          disabled={disabled}
          type="submit"
        >
          Create recipe
        </button>
      </form>
    </div>
  );
}
