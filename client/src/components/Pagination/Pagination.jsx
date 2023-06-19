import React from "react";
import Styles from "./Pagination.module.css";

export default function Pagination({
  allRecipes,
  recipesPerPage,
  paginate,
  currentPage,
}) {
  const allPages = Math.ceil(allRecipes / recipesPerPage);
  const pageNum = [];

  //Recorro un arreglo hasta el número entero que resulta de dividir las recetas por las recetas por página que necesito y así obtengo el número de páginas:
  for (let i = 1; i <= allPages; i++) {
    pageNum.push(i);
  }
  return (
    <div className={Styles.container}>
      <button
        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <nav>
        <ul>
          {pageNum?.map((num) => (
            <li key={num}>
              <a
                className={num === currentPage ? Styles.active : ""}
                onClick={() => paginate(num)}
              >
                {num}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={() =>
          paginate(currentPage < allPages ? currentPage + 1 : allPages)
        }
        disabled={currentPage === allPages}
      >
        Next
      </button>
    </div>
  );
}
