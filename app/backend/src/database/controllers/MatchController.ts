import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }
}

export default MatchController;
