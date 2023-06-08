import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterByDiets,
  filterMyRecipes,
  orderByName,
} from "../../actions/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  // Es lo mismo que hacer mapdispatchtoprops para despachar:
  const dispatch = useDispatch();

  //Es lo mismo que hacer mapstatetoprops para traer las recetas:
  const allRecipes = useSelector((state) => state.recipes);

  //Estado para traer las dietas:
  const allDiets = useSelector((state) => state.diets);

  //Estado para setear el orden cuando se haga el filtro:
  const [order, setOrder] = useState("");

  //* PAGINADO

  //Crear estados locales:
  // Para setear la página actual:
  const [currentPage, setCurrentPage] = useState(1);

  //Para setear el número de recetas que aparecen por página:
  const [recipesPerPage, setRecipesPerPage] = useState(8);

  //Índice de la última receta de la página:
  const indexLastRecipe = currentPage * recipesPerPage; // 8

  //índice de la primera receta de la página:
  const indexFirstRecipe = indexLastRecipe - recipesPerPage; // 0

  // Devuelve un arreglo desde la receta con índice 0 hasta la 8 en la página 1 y así sucesivamente:
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

  // Setear el número de la página actual en el número que yo le de click:
  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  //* DESPACHAR RECETAS Y DIETAS

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]); //En [] se ponen las dependencias que se necesitan antes de hacer el useEffect

  //* RECARGAR RECETAS

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  //* FILTROS

  function handleFilterByDiets(e) {
    //Despacha a la action el valor del payload dependiendo de cada option.
    dispatch(filterByDiets(e.target.value));
  }

  function handleFilterMyRecipes(e) {
    dispatch(filterMyRecipes(e.target.value));
  }

  function handleOrderByName(e) {
    dispatch(orderByName(e.target.value));
    //Cuando hago el ordenamiento que se setee en la página 1
    setCurrentPage(1);
    //Seteo el ordenamiento:
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/recipe">Crear receta</Link>
      <h1>Esta es la pagina principal</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todas las recetas
      </button>
      <select onChange={(e) => handleFilterByDiets(e)}>
        <option value="all diets">All diets</option>
        <option value="dairy free">Dairy free</option>
        <option value="gluten free">Gluten free</option>
        <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="pescatarian">Pescatarian</option>
        <option value="fodmap friendly">Fodmap friendly</option>
        <option value="whole 30">Whole 30</option>
        <option value="primal">Primal</option>
        <option value="paleolithic">Paleolithic</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="other">Other</option>
      </select>
      <select onChange={(e) => handleOrderByName(e)}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select onChange={(e) => handleFilterMyRecipes(e)}>
        <option value="all">All</option>
        <option value="api">API Recipes</option>
        <option value="my recipes">My Recipes</option>
      </select>
      {currentRecipes?.map((r) => {
        return (
          <div>
            <Link to={"/home/" + r.id} key={r.id}>
              <Card
                id={r.id}
                name={r.name}
                image={r.image}
                diets={r.diets.map((d) => d.name)}
                healthScore={r.healthScore}
              />
            </Link>
          </div>
        );
      })}
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginate={paginate}
      />
    </div>
  );
}
