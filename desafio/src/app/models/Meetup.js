import Sequelize, {Model} from 'sequelize';
import  { isBefore, subHours} from 'date-fns';

class Meetup extends Model {
  static init(sequelize){
    super.init(
        {
          titulo:Sequelize.STRING,
          descricao:Sequelize.STRING,
          localizacao:Sequelize.STRING,
          data_hora: Sequelize.DATE,
        },
        {
          sequelize,
        }
    );
    return this;
  }
  static associate (models){
      this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file'});
      this.belongsTo(models.Usuarios, {foreignKey: 'user_id', as: 'usuarios'});

  }
}
export default Meetup;
