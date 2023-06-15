import React from "react";
import { Link } from "react-router-dom";
import logo from "../../utils/images/logolanding.png";
import Styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <img className={Styles.img} src={logo}></img>
      <div class="container">
        <Link to="/home">
          <button className={Styles.button}>Let's cook!</button>
        </Link>
      </div>
    </div>
  );
}
