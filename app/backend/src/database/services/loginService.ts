import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import ILoginService, { Ttoken } from '../interfaces/ILoginService';
import User from '../models/UserModel';
import generateToken from '../utils/token';

export default class LoginService implements ILoginService {
  protected model: ModelStatic<User> = User;

  async login(data: ILogin): Promise<User | Ttoken> {
    const { email, password } = data;
    const user = await this.model.findOne({ where: { email } });
    if (user) {
      const hash = user.password;
      const isValid = await bcrypt.compare(password, hash);
      if (isValid) {
        const token = generateToken(email);
        return { token };
      }
    }
    return user as User;
  }
}
