const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        // Guarda también todas las recetas acá para el filtro:
        allRecipes: action.payload,
      };
    case "GET_RECIPES_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_RECIPES_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "POST_RECIPES":
      return {
        ...state,
      };
    case "DELETE_RECIPE":
      const updatedRecipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
      return {
        ...state,
        recipes: updatedRecipes,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "FILTER_BY_DIETS":
      // La lógica del reducer siempre va antes del return
      // Se hace un filtro que traiga las recetas que contengan la dieta del filtro y se hace con allRecipes para que permita filtrar varias veces:
      const allRecipes = state.allRecipes;
      const dietsFilter =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((e) => e.diets.some((d) => d === action.payload));
      return {
        ...state,
        recipes: dietsFilter,
      };
    case "FILTER_MY_RECIPES":
      const allRecipes2 = state.allRecipes;
      const myRecipesFilter =
        action.payload === "my recipes"
          ? allRecipes2.filter((e) => e.createdInDb)
          : allRecipes2.filter((e) => !e.createdInDb);
      return {
        ...state,
        recipes: action.payload === "all" ? state.allRecipes : myRecipesFilter,
      };
    case "ORDER_BY_NAME":
      //Se crea un condicional que busque si se desea ordenar de la A a la Z, entonces haga un método sort:
      const order =
        action.payload === "A-Z"
          ? // El sort pregunta si "a" es una letra que va primero en el alfabeto que "b".
            // Si es así, la pone en la posición 1, si no la pone en la posición -1 y si ya está organizada la deja quieta en la posición 0.
            // Si queremos que se organice de la Z a la A se hace lo contrario.
            state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: order,
      };
    case "ORDER_BY_HEALTHSCORE":
      const healthOrder =
        action.payload === "asc healthscore"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: healthOrder,
      };
    default:
      return state;
  }
}
export default rootReducer;
