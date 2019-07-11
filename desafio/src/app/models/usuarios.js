import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuarios extends Model{
    static init(sequelize){
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
        this.addHook('beforeSave', async Usuarios => {
            if (Usuarios.password) {
                Usuarios.password_hash  = await bcrypt.hash(Usuarios.password, 8);                
            }
        });
        return this;
    }
}
export default Usuarios;