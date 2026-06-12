"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PenilaianSurats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SuratId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Surats",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      C1: {
        type: Sequelize.INTEGER,
      },
      C2: {
        type: Sequelize.INTEGER,
      },
      C3: {
        type: Sequelize.INTEGER,
      },
      C4: {
        type: Sequelize.INTEGER,
      },
      C5: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PenilaianSurats");
  },
};
