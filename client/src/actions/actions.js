import axios from "axios";

//* TRAER INFORMACIÓN DEL BACK:

export function getRecipes() {
  return async function (dispatch) {
    try {
      // Conexión entre el front y el back para traer las recetas:
      let json = await axios("http://localhost:3001/recipes");
      return dispatch({ type: "GET_RECIPES", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      // Conexión entre el front y el back para traer las recetas por nombre:
      let json = await axios("http://localhost:3001/recipes?name=" + name);
      console.log(json.data);
      return dispatch({ type: "GET_RECIPES_BY_NAME", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesDetail(id) {
  return async function (dispatch) {
    try {
      // Conexión entre el front y el back para traer el detail de las recetas por id:
      let json = await axios("http://localhost:3001/recipes/" + id);
      return dispatch({ type: "GET_RECIPES_DETAIL", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    try {
      // Conexión entre el front y el back para postear la nueva receta:
      let response = await axios.post("http://localhost:3001/recipes", payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteRecipe(id) {
  return async function (dispatch) {
    try {
      await axios.delete("http://localhost:3001/recipes/" + id);
      return dispatch({
        type: "DELETE_RECIPE",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    try {
      // Conexión entre el front y el back para traer las dietas:
      let json = await axios("http://localhost:3001/diets");
      return dispatch({ type: "GET_DIETS", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

//* FILTROS Y ORDENAMIENTO:

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

export function orderByHealthScore(payload) {
  return {
    type: "ORDER_BY_HEALTHSCORE",
    payload,
  };
}
