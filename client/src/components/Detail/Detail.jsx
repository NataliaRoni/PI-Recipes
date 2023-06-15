import React from "react";
import { useEffect } from "react";
import { getRecipesDetail } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getRecipesDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      {detail.length > 0 ? (
        <div>
          <h1>{detail[0].name}</h1>
          <img className="img_detail" src={detail[0].image} alt="not found" />
          <h3>Health Score: {detail[0].healthScore}</h3>
          <p>Summary: {detail[0].summary}</p>
          <h5>Steps:</h5>
          <ol>
            {!detail[0].createdInDb
              ? detail[0].steps[0].map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))
              : detail[0].steps}
          </ol>
          <h4>Diets:</h4>
          <ul>
            {!detail[0].createdInDb
              ? detail[0].diets.map((diet) => <p>{diet}</p>)
              : detail[0].diets.map((d) => <p>{d.name}</p>)}
          </ul>
        </div>
      ) : (
        <div>
          <h4>Loading...</h4>
        </div>
      )}
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  );
}
