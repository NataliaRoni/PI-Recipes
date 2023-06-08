import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    // Conexión entre el front y el back para traer las recetas:
    let json = await axios("http://localhost:3001/recipes");
    return dispatch({ type: "GET_RECIPES", payload: json.data });
  };
}

export function filterByDiets(payload) {
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}

export function filterMyRecipes(payload) {
  return {
    type: "FILTER_MY_RECIPES",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
