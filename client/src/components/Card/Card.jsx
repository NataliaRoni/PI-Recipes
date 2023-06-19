import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Card.module.css";
import { FaLeaf, FaFish } from "react-icons/fa";

export default function Card({ id, name, diets, image, healthScore }) {
  const getIcon = (dietType) => {
    switch (dietType) {
      case "vegan":
        return <FaLeaf />;
      case "pescatarian":
        return <FaFish />;
      default:
        return null;
    }
  };
  return (
    <div className={Styles.container}>
      <Link to={`/recipes/${id}`} key={id}>
        <img src={image} alt="img not found" />
        <h1>{name}</h1>
        <h2>
          {" "}
          {diets.map((diet, index) => (
            <React.Fragment key={index}>
              {getIcon(diet)} {diet}
            </React.Fragment>
          ))}
        </h2>
      </Link>
    </div>
  );
}
