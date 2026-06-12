"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Surats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judulSurat: {
        type: Sequelize.STRING,
      },
      tanggalSurat: {
        type: Sequelize.DATE,
      },
      fileSurat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nomorSurat: {
        type: Sequelize.STRING,
      },
      statusSurat: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Surats");
  },
};
