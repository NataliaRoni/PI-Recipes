import React from "react";

export default function Card({ name, diets, image, healthScore }) {
  return (
    <div>
      <h2>{name}</h2>
      <h4>{diets}</h4>
      <img src={image} alt="img not found" />
      <h3>{healthScore}</h3>
    </div>
  );
}
