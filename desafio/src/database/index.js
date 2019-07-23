import Sequelize from 'sequelize';
import Usuario from '../app/models/usuarios';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import databaseConfig from '../config/database';
 const models = [Usuario, File, Meetup];

class Database{
  constructor(){
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));

  }
}
export default new Database();
