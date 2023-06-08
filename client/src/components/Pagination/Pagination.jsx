import React from "react";

export default function Pagination({ allRecipes, recipesPerPage, paginate }) {
  const pageNum = [];

  //Recorro un arreglo hasta el número entero que resulta de dividir las recetas por las recetas por página que necesito y así obtengo el número de páginas:
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNum?.map((num) => (
          <li key={num}>
            <a onClick={() => paginate(num)}>{num}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
