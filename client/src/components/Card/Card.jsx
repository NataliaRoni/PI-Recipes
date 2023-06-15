import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, name, diets, image, healthScore }) {
  return (
    <div>
      <Link to={`/recipes/${id}`} key={id}>
        <h2>{name}</h2>
        <h4>{diets}</h4>
        <img src={image} alt="img not found" />
        <h3>{healthScore}</h3>
      </Link>
    </div>
  );
}
