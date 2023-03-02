import { Request, Response } from 'express';
import ILoginService from '../interfaces/ILoginService';

class LoginController {
  private _service: ILoginService;

  constructor(service: ILoginService) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const user = await this._service.login(req.body);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    return res.status(200).json(user);
  }
}

export default LoginController;
