const { Recipe, Diets } = require("../db");
const axios = require("axios");

const DietsController = async (req, res) => {
  // Se trae el código de acceso a la API que exige Spoonacular:
  const { API_KEY } = process.env;

  // Se accede a la API de manera asíncrona:
  const URL_API = await axios.get(
    // end-point:
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&offset=100`,
    { headers: { "Accept-Encoding": "identity" } }
  );

  // Desde la API entra a la propiedad "results" y  trae todas las dietas:
  let dietApi = URL_API.data.results.map((e) => e.diets);

  // Se declara un array vacío para almacenar las dietas únicas:
  let finalDiets = [];

  // flat() se utiliza para "aplanar" un array. ej. [1, [2, 3], [4]] Resultado: [1, 2, 3, 4]
  // Se verifica si cada dieta ya existe en finalDiets. Si no, se agrega al array:
  dietApi.flat().forEach((el) => {
    if (!finalDiets.includes(el)) {
      finalDiets.push(el);
    }
  });

  // Recorre el array finalDiets para encontrar o crear un registro en la base de datos donde el name de la dieta sea el que llega por parámetro:
  finalDiets.forEach((d) => {
    Diets.findOrCreate({
      where: {
        name: d,
      },
    });
  });

  // Después de hacer todo lo anterior, trae todas las dietas:
  const allDiets = await Diets.findAll();
  res.send(allDiets);
};

module.exports = {
  DietsController,
};
