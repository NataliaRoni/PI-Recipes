import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Card.module.css";
import vegan from "../../utils/images/vegan.png";
import pescatarian from "../../utils/images/pescatarian.png";
import dairyfree from "../../utils/images/dairyfree.jpg";
import gluten from "../../utils/images/gluten.png";
import lactovo from "../../utils/images/lactovo.png";
import fodmap from "../../utils/images/fodmap.jpg";
import whole from "../../utils/images/whole.png";
import primal from "../../utils/images/primal.png";
import paleo from "../../utils/images/paleo.png";
import keto from "../../utils/images/keto.png";
import noimage from "../../utils/images/noimage.png";
import { deleteRecipe } from "../../actions/actions";
import { useDispatch } from "react-redux";
import close from "../../utils/images/equis.png";

export default function Card({
  id,
  name,
  diets,
  image,
  healthScore,
  createdInDb,
}) {
  const dispatch = useDispatch();

  const getIcon = (dietType) => {
    switch (dietType) {
      case "dairy free":
        return (
          <img
            src={dairyfree}
            alt="dairy free"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "gluten free":
        return (
          <img
            src={gluten}
            alt="gluten free"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "lacto ovo vegetarian":
        return (
          <img
            src={lactovo}
            alt="lacto ovo vegetarian"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "vegan":
        return (
          <img
            src={vegan}
            alt="vegan"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "pescatarian":
        return (
          <img
            src={pescatarian}
            alt="pescatarian"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "fodmap friendly":
        return (
          <img
            src={fodmap}
            alt="fodmap friendly"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "whole 30":
        return (
          <img
            src={whole}
            alt="whole 30"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "primal":
        return (
          <img
            src={primal}
            alt="primal"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "paleolithic":
        return (
          <img
            src={paleo}
            alt="paleolithic"
            style={{ width: "24px", height: "24px" }}
          />
        );
      case "ketogenic":
        return (
          <img
            src={keto}
            alt="ketogenic"
            style={{ width: "24px", height: "24px" }}
          />
        );
      default:
        return null;
    }
  };

  const handleDelete = (id) => {
    // Llama a la acción deleteRecipe pasando el id de la receta
    dispatch(deleteRecipe(id));
  };

  const deleteButton = () => {
    if (createdInDb) {
      return (
        <button
          className={Styles.buttonDelete}
          onClick={() => handleDelete(id)}
        ></button>
      );
    }
    return null;
  };

  return (
    <div className={Styles.container}>
      {deleteButton()}
      <Link to={`/recipes/${id}`} key={id} style={{ textDecoration: "none" }}>
        <img src={image} alt="not found" />
        <div>
          <h1>{name}</h1>
          <div className={Styles.containerDiets}>
            {" "}
            {diets.map((diet, index) => (
              <div key={index} className={Styles.diets}>
                {getIcon(diet)} {diet}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
