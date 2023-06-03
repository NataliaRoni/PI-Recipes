const { Router } = require("express");
const { RecipeController } = require("../controllers/RecipeController");
const { Recipe, Diets } = require("../db");
const { DietsController } = require("../controllers/DietsController");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes/:idRecipe", async (req, res) => {
  // Se trae el id de la receta por params:
  const { idRecipe } = req.params;

  // Se llama a la función RecipeController para obtener todas las recetas:
  let recipes = await RecipeController();
  try {
    // Se verifica si no se proporcionó ningún id. En ese caso, se envían todas las recetas:
    if (!idRecipe) {
      res.status(200).send(recipes);

      // Si se proporciona un id, se filtran las recetas para encontrar aquella cuyo id coincida con el id proporcionado:
    } else {
      let recipeById = recipes.filter(
        (r) => r.id.toString() === idRecipe.toString()
      );

      // Si el id proporcionado corresponde a alguna receta, se envía la receta:
      if (recipeById.length) {
        res.status(200).send(recipeById);

        // Si el id proporcionado NO corresponde a ninguna receta, se envía un error 404:
      } else {
        res.status(404).send("Recipe not found with that ID");
      }
    }

    // Si ocurre algún error durante el procesamiento, se envía un error 500:
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/recipes", async (req, res) => {
  // Se trae el name que le paso en la URL, por ejemplo ?name=algo:
  const { name } = req.query;

  // Se llama a la función RecipeController para obtener todas las recetas:
  let recipes = await RecipeController();
  try {
    // Si se proporciona un name, filtra las recetas para encontrar las que coincidan con el name:
    if (name) {
      let recipeName = recipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );

      // Si encuentra un name que coincida con alguna(s) receta(s), envía la info que encuentra:
      if (recipeName.length) {
        res.status(200).send(recipeName);

        // Si NO encuentra un name que coincida envía un error 404:
      } else {
        res.status(404).send("Recipe not found with that name");
      }

      // En caso de que NO se proporcione un name, envía todas las recetas:
    } else {
      res.status(200).send(recipes);
    }

    // Si ocurre algún error durante el procesamiento, se envía un error 500:
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/recipes", async (req, res) => {
  // Se recibe por body los campos con la info para crear una nueva receta:
  let { name, image, summary, healthScore, steps, createdInDB, diets } =
    req.body;

  try {
    // Se crea una nueva receta en la base de datos con la info que se trajo por body:
    const recipeCreated = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
      createdInDB,
    });

    // Se busca la dieta que coincida con la que recibimos por body
    const dietDb = await Diets.findAll({
      where: {
        name: diets,
      },
    });

    // Se usa el método addDiet creado por sequelize para asociar la dieta a la receta creada:
    await recipeCreated.addDiet(dietDb);

    //Se envía un mensaje confirmando que la dieta fue creada exitosamente:
    res.status(200).send("Recipe created successfully");

    // Si ocurre algún error durante el procesamiento, se envía un error 500:
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/diets", DietsController);

module.exports = router;
