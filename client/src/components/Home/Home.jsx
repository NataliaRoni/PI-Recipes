import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterByDiets,
  filterMyRecipes,
  orderByName,
  orderByHealthScore,
} from "../../actions/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import logo from "../../utils/images/logonatalia.png";
import Styles from "./Home.module.css";
import { TbLogout } from "react-icons/tb";
import noimage from "../../utils/images/noimage.png";

export default function Home() {
  // Es lo mismo que hacer mapdispatchtoprops para despachar:
  const dispatch = useDispatch();

  // Es lo mismo que hacer mapstatetoprops para traer las recetas:
  const allRecipes = useSelector((state) => state.recipes);

  // Estado para traer las dietas:
  const allDiets = useSelector((state) => state.diets);

  // Estado para setear el orden cuando se haga el filtro:
  const [order, setOrder] = useState("");

  // Estado para resetear los filtros:
  const [selectedValues, setSelectedValues] = useState({
    filterByDiets: "all",
    filterMyRecipes: "all",
    orderByHealthScore: "all",
    orderByName: "all",
  });

  //* PAGINADO

  //Crear estados locales:
  // Para setear la página actual:
  const [currentPage, setCurrentPage] = useState(1);

  //Para setear el número de recetas que aparecen por página:
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  //Índice de la última receta de la página:
  const indexLastRecipe = currentPage * recipesPerPage; // 9

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
    setSelectedValues((prevState) => ({
      ...prevState,
      filterByDiets: "all",
      filterMyRecipes: "all",
      orderByHealthScore: "all",
      orderByName: "all",
    }));
  }

  //* FILTROS

  function handleFilterByDiets(e) {
    //Despacha a la action el valor del payload dependiendo de cada option.
    dispatch(filterByDiets(e.target.value));
    setSelectedValues((prevState) => ({
      ...prevState,
      filterByDiets: e.target.value,
      filterMyRecipes: "all",
      orderByHealthScore: "all",
      orderByName: "all",
    }));
  }

  function handleFilterMyRecipes(e) {
    dispatch(filterMyRecipes(e.target.value));
    setSelectedValues((prevState) => ({
      ...prevState,
      filterMyRecipes: e.target.value,
      filterByDiets: "all",
      orderByHealthScore: "all",
      orderByName: "all",
    }));
  }

  function handleOrderByName(e) {
    dispatch(orderByName(e.target.value));
    //Cuando hago el ordenamiento que se setee en la página 1
    setCurrentPage(1);
    //Seteo el ordenamiento:
    setOrder(`Order ${e.target.value}`);
    setSelectedValues((prevState) => ({
      ...prevState,
      orderByName: e.target.value,
      filterByDiets: "all",
      filterMyRecipes: "all",
      orderByHealthScore: "all",
    }));
  }

  function handleOrderByHealth(e) {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    setOrder(`Order ${e.target.value}`);
    setSelectedValues((prevState) => ({
      ...prevState,
      orderByHealthScore: e.target.value,
      filterByDiets: "all",
      filterMyRecipes: "all",
      orderByName: "all",
    }));
  }

  //* RENDERIZADO

  return (
    <div>
      <div className={Styles.container}>
        <img className={Styles.img} src={logo} alt="logo"></img>
        <NavBar className={Styles.NavBar} />
        <Link to="/recipe">
          <button className={Styles.create}>Create recipe</button>
        </Link>
        <Link to="/">
          <button className={Styles.logout}>
            <TbLogout />
          </button>
        </Link>
      </div>
      <div className={Styles.filterContainer}>
        <button
          className={Styles.filterButton}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Clean filters
        </button>
        <select
          className={Styles.filterSelect}
          value={selectedValues.orderByHealthScore}
          onChange={(e) => handleOrderByHealth(e)}
        >
          <option value="all">HealthScore order</option>
          <option value="asc healthscore">Less HealthScore</option>
          <option value="desc healthscore">More HealthScore</option>
        </select>
        <select
          className={Styles.filterSelect}
          value={selectedValues.orderByName}
          onChange={(e) => handleOrderByName(e)}
        >
          <option value="all">Alphabetic order</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select
          className={Styles.filterSelect}
          value={selectedValues.filterByDiets}
          onChange={(e) => handleFilterByDiets(e)}
        >
          <option value="all">Filter by diets</option>
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
        </select>

        <select
          className={Styles.filterSelect}
          value={selectedValues.filterMyRecipes}
          onChange={(e) => handleFilterMyRecipes(e)}
        >
          <option value="all">Filter by recipes</option>
          <option value="api">API recipes</option>
          <option value="my recipes">My recipes</option>
        </select>
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className={Styles.containerCard}>
        {currentRecipes?.map((r) => {
          return (
            <div>
              <Card
                id={r.id}
                name={r.name}
                image={!r.image && r.createdInDb ? noimage : r.image}
                diets={
                  !r.createdInDb
                    ? r.diets.map((d) => d)
                    : r.diets.map((d) => d.name)
                }
                healthScore={r.healthScore}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
