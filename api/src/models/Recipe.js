const { DataTypes } = require("sequelize");
// Se exporta una función que define el modelo.
// Se le inyecta la conexión a sequelize.
module.exports = (sequelize) => {
  // Se define el modelo:
  sequelize.define(
    "recipe",
    {
      id: {
        // UUID (Universally Unique Identifier) es un identificador único universalmente.
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      steps: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      createdInDb: {
        // createinDb se utiliza para buscar por ID únicamente las recetas creadas desde nuestra base de datos.
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
