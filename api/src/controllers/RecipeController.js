const { Recipe, Diets } = require("../db");
const axios = require("axios");

const RecipeController = async () => {
  // Se trae el código de acceso a la API que exige Spoonacular:
  const { API_KEY } = process.env;

  // Se accede a la API de manera asíncrona:
  const URL_API = await axios.get(
    // end-point:
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&offset=100`,
    { headers: { "Accept-Encoding": "identity" } }
  );

  // Se trae la info del end-point, se accede a la data, luego a la propiedad "results" y se mapea para que traiga sólo al info que se necesita:
  const apiResults = URL_API.data.results.map((el) => ({
    id: el.id,
    name: el.title,
    image: el.image,
    summary: el.summary,
    healthScore: el.healthScore,
    diets: el.diets,
    // Se mapea la propiedad "analizedInstructions" para acceder a la propiedad "steps" para traer cada uno de los pasos enumerados:
    steps: el.analyzedInstructions.map((d) =>
      d.steps.map((e) => ({
        number: e.number,
        step: e.step,
      }))
    ),
  }));

  // Se hace una función asíncrona que trae todas las recetas sobre el modelo Recipe.
  const dbResults = await Recipe.findAll({
    // Se incluye el modelo Diets y se trae el atributo "name":
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  // La función apiResults me trae la info de la API y la función dbResults me trae la info de la base de datos.
  // Por lo tanto, con all se trae la info de la API y de la base de datos:
  const all = [...apiResults, ...dbResults];

  // Se devuelve toda la info:
  return all;
};

module.exports = {
  RecipeController,
};
