/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const request = require("supertest");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Milanea a la napolitana",
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  xdescribe("GET /recipes", () => {
    it("should get 200", () => agent.get("/recipes").expect(200));
  });
});

describe("Testeo de rutas", () => {
  it("GET /recipes/:id", async () => {
    // Realiza una solicitud GET a la ruta "/recipes/999".
    const response = await request(app).get("/recipes/999");
    //Espera que el status sea error 404 ya que la 999 no es un id valido
    expect(response.status).to.equal(404);
    //Espera que responda con el mensaje "Recipe not found with that ID"
    expect(response.text).to.equal("Recipe not found with that ID");
  });
});
