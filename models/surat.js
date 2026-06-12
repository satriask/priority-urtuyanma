"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Surat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Surat.hasOne(models.PenilaianSurat, {
        foreignKey: "SuratId",
        as: "PenilaianSurats",
      });
    }
  }
  Surat.init(
    {
      judulSurat: DataTypes.STRING,
      tanggalSurat: DataTypes.DATE,
      nomorSurat: DataTypes.STRING,
      statusSurat: DataTypes.STRING,
      fileSurat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Surat",
    },
  );
  return Surat;
};
