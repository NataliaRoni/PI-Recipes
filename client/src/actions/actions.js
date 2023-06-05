import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    // Conexión entre el front y el back para traer las recetas:
    let json = await axios.get("http://localhost:3001/recipes", {});
    return dispatch({ type: "GET_RECIPES", payload: json.data });
  };
}
