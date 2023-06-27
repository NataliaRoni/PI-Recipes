import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions/actions";
import Styles from "./NavBar.module.css";
import search from "../../utils/images/lupa.png";
import swal from "sweetalert";

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
    if (name === "") {
      swal({
        title: "Enter a recipe name",
        icon: "error",
        button: "OK",
        className: Styles["swal"],
      });
    } else {
    }
    dispatch(getRecipesByName(name)).then((n) => {
      if (!n) {
        swal({
          title: "Recipe does not exist",
          icon: "error",
          button: "OK",
          className: Styles["swal"],
        });
      }
    });
    setTimeout(() => {
      setName("");
    }, 2000);
  }

  return (
    <div className={Styles.container}>
      <input
        className={Styles.input}
        type="text"
        placeholder="Search recipes"
        onChange={(e) => handleInputChange(e)}
        value={name}
      />
      <button
        className={Styles.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <img src={search} alt="Logout" height="20" width="20" />
      </button>
    </div>
  );
}
