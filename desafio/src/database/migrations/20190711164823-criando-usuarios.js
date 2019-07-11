'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('usuarios', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
         type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        provider:{
          type: Sequelize.BOOLEAN,
          defualtValue: false,
          allowNull:false,
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull:false,
        },
        updated_at:{
         type: Sequelize.DATE,
         allowNull:false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('usuarios');
    
  }
};
// yarn  sequelize db:migrate:undo ->  para a ultima :all para tudo