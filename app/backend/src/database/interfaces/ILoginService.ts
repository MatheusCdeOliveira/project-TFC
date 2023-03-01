import User from '../models/UserModel';
import ILogin from './ILogin';

export type Ttoken = {
  token: string
};

export default interface ILoginService {
  login(data: ILogin): Promise<User | Ttoken>
}
