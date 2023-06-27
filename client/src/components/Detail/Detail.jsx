import React from "react";
import { useEffect } from "react";
import { getRecipesDetail } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Styles from "./Detail.module.css";
import ReactDOM from "react-dom";
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
import { MdArrowBackIosNew } from "react-icons/md";
import noimage from "../../utils/images/noimage.png";
import loadingImg from "../../utils/images/loading.gif";
import { useState } from "react";

export default function Detail() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const detail = useSelector((state) => state.detail);

  const [loading, setLoading] = useState(null);

  useEffect(() => {
    dispatch(getRecipesDetail(id)).then((r) => {
      setLoading(r);
    });
  }, [dispatch, id]);

  const getIcon = (dietType) => {
    switch (dietType) {
      case "dairy free":
        return (
          <img
            src={dairyfree}
            alt="dairy free"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "gluten free":
        return (
          <img
            src={gluten}
            alt="gluten free"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "lacto ovo vegetarian":
        return (
          <img
            src={lactovo}
            alt="lacto ovo vegetarian"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "vegan":
        return (
          <img
            src={vegan}
            alt="vegan"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "pescatarian":
        return (
          <img
            src={pescatarian}
            alt="pescatarian"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "fodmap friendly":
        return (
          <img
            src={fodmap}
            alt="fodmap friendly"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "whole 30":
        return (
          <img
            src={whole}
            alt="whole 30"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "primal":
        return (
          <img
            src={primal}
            alt="primal"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "paleolithic":
        return (
          <img
            src={paleo}
            alt="paleolithic"
            style={{ width: "35px", height: "35px" }}
          />
        );
      case "ketogenic":
        return (
          <img
            src={keto}
            alt="ketogenic"
            style={{ width: "35px", height: "35px" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={Styles.container}>
      {loading === null ? (
        <div>
          <img className={Styles.imgLoading} src={loadingImg} alt="Loading" />
        </div>
      ) : (
        <div className={Styles.containerInfo}>
          <div className={Styles.buttonContainer}>
            <Link to="/home">
              <button className={Styles.button}>
                <MdArrowBackIosNew style={{ color: "#ffb703" }} />
              </button>
            </Link>
          </div>
          <div className={Styles.left}>
            <h1>{detail[0].name}</h1>
            <img
              className={Styles.imgDB}
              src={
                !detail[0].image && detail[0].createdInDb
                  ? noimage
                  : detail[0].image
              }
              alt="not found"
            />
            <h2>Health Score: {detail[0].healthScore}</h2>
            <ul>
              {!detail[0].createdInDb
                ? detail[0].diets.map((diet) => (
                    <div className={Styles.icon}>{getIcon(diet)}</div>
                  ))
                : detail[0].diets.map((d) => (
                    <div className={Styles.icon}> {getIcon(d)}</div>
                  ))}
            </ul>
          </div>
          <div className={Styles.right}>
            <p>
              <span dangerouslySetInnerHTML={{ __html: detail[0].summary }} />
            </p>
            <h2>Steps:</h2>
            <ol>
              {!detail[0].createdInDb
                ? detail[0].steps[0].map((step) => (
                    <li key={step.number}>{step.step}</li>
                  ))
                : detail[0].steps}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
