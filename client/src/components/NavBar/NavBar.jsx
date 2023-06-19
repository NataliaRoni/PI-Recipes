import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions/actions";
import Styles from "./NavBar.module.css";
import { BsSearch } from "react-icons/bs";

export default function NavBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  // Guarda lo que se escriba en el input para buscar la receta:
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  // Despacha el estado local name a la action, lo que hace que lo que se escribe en el input le llegue al back:
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByName(name));
    setName("");
  }

  return (
    <div className={Styles.container}>
      <input
        className={Styles.input}
        type="text"
        placeholder="Search recipes"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={Styles.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <BsSearch className={Styles.icon} />
      </button>
    </div>
  );
}
