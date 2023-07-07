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
import { Link, useHistory, useLocation } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import logo from "../../utils/images/logonatalia.png";
import Styles from "./Home.module.css";
import noimage from "../../utils/images/noimage.png";
import loadingImg from "../../utils/images/loading.gif";
import iconLogout from "../../utils/images/salir.png";

export default function Home() {
  // Es lo mismo que hacer mapdispatchtoprops para despachar:
  const dispatch = useDispatch();

  // Es lo mismo que hacer mapstatetoprops para traer las recetas:
  // useSelector sirve para traer el estado global del reducer:
  const allRecipes = useSelector((state) => state.allRecipes);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //* DESPACHAR RECETAS

  useEffect(() => {
    if (!allRecipes || allRecipes.length === 0) {
      dispatch(getRecipes());
    }
  }, [dispatch, allRecipes]); //En [] se ponen las dependencias que se necesitan antes de hacer el useEffect

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
    setCurrentPage(1);
  }

  //* FILTROS

  // Estado para setear los filtros:
  const [selectedValues, setSelectedValues] = useState({
    filterByDiets: "all",
    filterMyRecipes: "all",
    orderByHealthScore: "all",
    orderByName: "all",
  });

  function handleFilterByDiets(e) {
    // Evita que se realice una acción de envío o recarga de la página cuando se selecciona una opción en el filtro:
    e.preventDefault();
    //Despacha a la action el valor del payload dependiendo de cada option.
    dispatch(filterByDiets(e.target.value));
    setSelectedValues({
      filterByDiets: e.target.value,
    });
    //Cuando hago el ordenamiento que se setee en la página 1
    setCurrentPage(1);
  }

  function handleFilterMyRecipes(e) {
    e.preventDefault();
    dispatch(filterMyRecipes(e.target.value));
    //Cuando hago el ordenamiento que se setee en la página 1
    setSelectedValues({ filterMyRecipes: e.target.value });
    setCurrentPage(1);
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    //Seteo el ordenamiento:
    setSelectedValues({
      orderByName: e.target.value,
    });
    //Cuando hago el ordenamiento que se setee en la página 1
    setCurrentPage(1);
  }

  function handleOrderByHealth(e) {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    //Cuando hago el ordenamiento que se setee en la página 1
    setCurrentPage(1);
    setSelectedValues({
      orderByHealthScore: e.target.value,
    });
  }

  //* RENDERIZADO

  return (
    <div>
      {!allRecipes || allRecipes.length === 0 ? (
        <div>
          <img className={Styles.imgLoading} src={loadingImg} alt="Loading" />
        </div>
      ) : (
        <div>
          <div className={Styles.container}>
            <img className={Styles.img} src={logo} alt="logo" />
            <NavBar
              className={Styles.NavBar}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <Link to="/recipe">
              <button className={Styles.create}>Create recipe</button>
            </Link>
            <Link to="/">
              <button className={Styles.logout}>
                <img src={iconLogout} alt="Logout" height="20" width="20" />
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
          </div>
          <div className={Styles.containerCard}>
            {currentRecipes?.map((r) => {
              return (
                <div key={r.id}>
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
                    createdInDb={r.createdInDb}
                  />
                </div>
              );
            })}
          </div>
          <Pagination
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}
