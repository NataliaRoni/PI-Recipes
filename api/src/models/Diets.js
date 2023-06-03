const { DataTypes } = require("sequelize");
// Se exporta una funcion que define el modelo
// Luego se le inyecta la conexión a sequelize.
module.exports = (sequelize) => {
  // Se define el modelo:
  sequelize.define(
    "diets",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
