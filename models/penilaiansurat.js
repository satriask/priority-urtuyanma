"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PenilaianSurat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PenilaianSurat.belongsTo(models.Surat, {
        foreignKey: "SuratId",
        as: "Surat",
      });
    }
  }
  PenilaianSurat.init(
    {
      SuratId: DataTypes.INTEGER,
      C1: DataTypes.INTEGER,
      C2: DataTypes.INTEGER,
      C3: DataTypes.INTEGER,
      C4: DataTypes.INTEGER,
      C5: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PenilaianSurat",
    },
  );
  return PenilaianSurat;
};
