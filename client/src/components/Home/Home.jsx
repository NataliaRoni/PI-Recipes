import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../actions/actions";
import { Link } from "react-router-dom";

export default function Home() {
  // Es lo mismo que hacer mapdispatchtoprops:
  const dispatch = useDispatch();

  //Es lo mismo que hacer mapstatetoprops:
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, []); //En [] se ponen las dependencias que se necesitan antes de hacer el useEffect
}

function handleClick(e) {
  e.preventDefault();
  dispatch(getRecipes());
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
    <select>
      <option value="A">Ascending Order</option>
      <option value="D">Descending Order</option>
    </select>
    <select>
      <option>All</option>
    </select>
  </div>
);
