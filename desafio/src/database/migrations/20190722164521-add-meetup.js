module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('meetups', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        titulo: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        descricao:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        localizacao:{
          type:Sequelize.STRING,
          allowNull: false,
        },
        data_hora:{
          type:Sequelize.DATE,
          allowNull:false,
        },        
        user_id:{
          type: Sequelize.INTEGER,
          references: {model: 'usuarios', key: 'id'},
          onUpdate:'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
        file_id :{
          type: Sequelize.INTEGER,
          references: {model: 'files', key: 'id'},
          onUpdate:'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },       
        canceled_at:{
          type: Sequelize.DATE,
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
    return queryInterface.dropTable('meetups');
  }
};
// yarn  sequelize db:migrate:undo ->  para a ultima :all para tudo