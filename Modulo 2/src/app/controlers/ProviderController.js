import User from '../model/User';
import File from '../model/file';

class ProviderController {
  async index(req, res){
    const provider = await User.findAll({
      where: {provider: true},
      attributes: ['id','nome','email','avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['nome','path','url'],
        },
      ],
    });
    return res.json(provider);
  }
}
export default new ProviderController();
